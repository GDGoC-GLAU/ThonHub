/**
 * Resume Upload Component
 * Author: Akshit
 */

import React, { useState } from 'react';
import resumeApi from '../utils/resumeApi';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    const response = await resumeApi.uploadResume(file, (prog) => {
      setProgress(prog);
    });
    
    if (response.success) {
      setAnalysis(response.data.analysis);
    }
    setUploading(false);
  };

  return (
    <div className="resume-upload">
      <h2>📤 Upload Resume</h2>
      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? `Uploading ${progress}%` : 'Upload & Analyze'}
      </button>
      
      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <p>Score: {analysis.score}/100</p>
          <p>Skills: {analysis.skills.join(', ')}</p>
          <p>Experience: {analysis.experience_level}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
