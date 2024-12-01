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
    </div>
  );
};

export default FileUploader;