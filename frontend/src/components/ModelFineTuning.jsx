import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Update this with your ngrok URL
const API_URL = 'https://9a48-35-194-211-71.ngrok-free.app';

const baseModels = [
  'mistralai/Mistral-7B-v0.1',
  'meta-llama/Llama-2-7b-hf',
  'microsoft/phi-2'
];

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'ngrok-skip-browser-warning': 'true',
          ...options.headers
        }
      });

      const text = await response.text();
      console.log(`Raw response (${url}):`, text);

      try {
        return JSON.parse(text);
      } catch (e) {
        if (i === retries - 1) throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export default function FineTuningDashboard() {
  const [modelName, setModelName] = useState('');
  const [baseModel, setBaseModel] = useState('');
  const [trainingFile, setTrainingFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [models, setModels] = useState([]);
  const [activeTraining, setActiveTraining] = useState(null);
  const [trainingProgress, setTrainingProgress] = useState(null);

  useEffect(() => {
    fetchModels();
    const interval = setInterval(fetchModels, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let progressInterval;
    if (activeTraining) {
      progressInterval = setInterval(() => {
        fetchProgress(activeTraining);
      }, 2000);
    }
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [activeTraining]);

  const fetchModels = async () => {
    try {
      const data = await fetchWithRetry(`${API_URL}/api/models`);
      if (data.status === 'success') {
        setModels(Object.entries(data.models).map(([name, info]) => ({
          name,
          ...info
        })));
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchProgress = async (modelName) => {
    if (!modelName) return;

    try {
      const data = await fetchWithRetry(`${API_URL}/api/progress/${modelName}`);
      setTrainingProgress(data);

      if (data.status === 'completed' || data.status === 'failed') {
        setActiveTraining(null);
        if (data.status === 'completed') {
          setSuccess('Training completed successfully!');
        } else {
          setError(data.message || 'Training failed');
        }
        fetchModels();
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!trainingFile) {
        throw new Error('Please select a training file');
      }

      const formData = new FormData();
      formData.append('file', trainingFile);
      formData.append('model_name', modelName);
      formData.append('base_model', baseModel);

      const response = await fetch(`${API_URL}/api/finetune`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Training response:', data);

      if (response.ok && data.status === 'success') {
        setActiveTraining(modelName);
        setSuccess('Training started successfully!');
      } else {
        throw new Error(data.message || 'Failed to start training');
      }
    } catch (err) {
      setError(err.message);
      console.error('Training error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      {/* Training Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Fine-tune Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Model Name</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="Enter model name"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Base Model</label>
                <select
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                >
                  <option value="">Select base model...</option>
                  {baseModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Training Data</label>
                <input
                  type="file"
                  accept=".json,.pdf,.txt"
                  onChange={(e) => setTrainingFile(e.target.files[0])}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: JSON, PDF, TXT
                </p>
              </div>

              {trainingFile && (
                <div className="p-2 bg-gray-50 rounded text-sm">
                  <p>Selected file: {trainingFile.name}</p>
                  <p>Size: {(trainingFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white rounded-lg transition-colors ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Starting Training...
              </div>
            ) : (
              'Start Fine-tuning'
            )}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}
      </div>

      {/* Training Progress */}
      {trainingProgress && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Training Progress</h2>
          
          <div className="space-y-6">
            {/* Status Badge */}
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                trainingProgress.status === 'completed' ? 'bg-green-100 text-green-800' :
                trainingProgress.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {trainingProgress.status}
              </span>
              {trainingProgress.message && (
                <span className="ml-2 text-sm text-gray-600">
                  {trainingProgress.message}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {trainingProgress.total_progress !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span>{Math.round(trainingProgress.total_progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${trainingProgress.total_progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Training Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Current Epoch</p>
                <p className="text-lg font-semibold">
                  {trainingProgress.epoch !== undefined ? 
                    `${trainingProgress.epoch + 1}/${trainingProgress.total_epochs}` : 
                    'N/A'
                  }
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Elapsed Time</p>
                <p className="text-lg font-semibold">
                  {trainingProgress.elapsed_time || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Models List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Available Models</h2>
        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{model.name}</h3>
                  <p className="text-sm text-gray-600">Base: {model.base_model}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(model.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Path: {model.path}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  model.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {model.status}
                </span>
              </div>
            </div>
          ))}

          {models.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No models available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}