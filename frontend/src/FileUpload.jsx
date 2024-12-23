import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const removeFile = (fileToRemove) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCreateDataset = async () => {
    if (files.length === 0) {
      alert("No files selected!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", files[0]); // Sending the first file as an example
  
    try {
      const response = await fetch("https://576e-34-125-104-111.ngrok-free.app/process_pdf", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }
  
      const result = await response.json();
      console.log(result); // Log the dataset or handle it as needed
      alert("Dataset created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the dataset.");
    }
  };
  

  return (
    <div 
      className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center">
        <Upload size={48} className="text-gray-500 mb-4" />
        <p className="mb-4 text-gray-600">
          Drag and drop files here or 
          <button 
            onClick={triggerFileInput}
            className="ml-2 text-blue-600 hover:underline"
          >
            Browse
          </button>
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <div className="flex items-center">
                  <File size={24} className="mr-2 text-blue-500" />
                  <span>{file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(file)}
                  className="text-red-500 hover:bg-red-100 rounded-full p-1"
                >
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6">
          <button 
            onClick={handleCreateDataset}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={files.length === 0}
          >
            Create Dataset
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;