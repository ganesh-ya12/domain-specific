import os
import json
from flask import jsonify
from datasets import Dataset, DatasetDict
from unsloth import FastLanguageModel
from trl import SFTTrainer
from transformers import TrainingArguments
from unsloth import is_bfloat16_supported

class FineTune:
    def __init__(self, max_seq_length=2048, dtype=None, load_in_4bit=True, token=None):
        self.max_seq_length = max_seq_length
        self.dtype = dtype
        self.load_in_4bit = load_in_4bit
        self.token = token

    def save_file(self, file):
        file_path = os.path.join("/tmp", file.filename)
        file.save(file_path)
        return file_path

    def load_dataset(self, file_path):
        with open(file_path, 'r') as f:
            data = json.load(f)
        dataset = Dataset.from_list(data)
        train_test_split = dataset.train_test_split(test_size=0.1)
        return DatasetDict({
            'train': train_test_split['train'],
            'validation': train_test_split['test']
        })

    def format_prompts(self, dataset_dict):
        alpaca_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
{}

### Input:
{}

### Response:
{}"""
        EOS_TOKEN = "<|endoftext|>"

        def formatting_prompts_func(examples):
            instructions = examples["instruction"]
            inputs = examples["input"]
            outputs = examples["output"]
            texts = []
            for instruction, input, output in zip(instructions, inputs, outputs):
                text = alpaca_prompt.format(instruction, input, output) + EOS_TOKEN
                texts.append(text)
            return {"text": texts}

        return dataset_dict.map(formatting_prompts_func, batched=True)

    def initialize_model(self, model_name):
        model, tokenizer = FastLanguageModel.from_pretrained(
            model_name=model_name,
            max_seq_length=self.max_seq_length,
            dtype=self.dtype,
            load_in_4bit=self.load_in_4bit,
            token=self.token
        )
        return model, tokenizer

    def apply_peft(self, model):
        return FastLanguageModel.get_peft_model(
            model,
            r=16,
            target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
            lora_alpha=16,
            lora_dropout=0,
            bias="none",
            use_gradient_checkpointing="unsloth",
            random_state=3407,
            use_rslora=False,
            loftq_config=None
        )

    def fine_tune_model(self, model, tokenizer, dataset_dict):
        trainer = SFTTrainer(
            model=model,
            tokenizer=tokenizer,
            train_dataset=dataset_dict['train'],
            dataset_text_field="text",
            max_seq_length=self.max_seq_length,
            dataset_num_proc=2,
            packing=False,
            args=TrainingArguments(
                per_device_train_batch_size=2,
                gradient_accumulation_steps=4,
                warmup_steps=5,
                max_steps=100,
                learning_rate=2e-4,
                fp16=not is_bfloat16_supported(),
                bf16=is_bfloat16_supported(),
                logging_steps=1,
                optim="adamw_8bit",
                weight_decay=0.01,
                lr_scheduler_type="linear",
                seed=3407,
                output_dir="outputs",
                report_to="none"
            )
        )
        trainer_stats = trainer.train()
        return trainer_stats

    def push_to_hub(self, model, tokenizer, user_id):
        hub_name = f"John-Nicholas/{user_id}_lora_model"
        model.push_to_hub(hub_name, token=self.token)
        tokenizer.push_to_hub(hub_name, token=self.token)

    def cleanup(self, file_path):
        os.remove(file_path)

    def fine_tune(self, file, user_id):
        try:
            file_path = self.save_file(file)
            dataset_dict = self.load_dataset(file_path)
            dataset_dict = self.format_prompts(dataset_dict)

            model, tokenizer = self.initialize_model("unsloth/Meta-Llama-3.1-8B")
            model = self.apply_peft(model)

            trainer_stats = self.fine_tune_model(model, tokenizer, dataset_dict)

            self.push_to_hub(model, tokenizer, user_id)

            self.cleanup(file_path)

            return jsonify({"message": "Fine-tuning completed successfully", "trainer_stats": str(trainer_stats)}), 200
        except Exception as e:
            self.cleanup(file_path)
            return jsonify({"error": str(e)}), 500
