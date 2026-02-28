/**
 * Profile Page with Resume Upload
 * Author: Akshit
 */

import React from 'react';
import ResumeUpload from '../components/ResumeUpload';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>👤 User Profile</h1>
      <ResumeUpload />
    </div>
  );
};

export default ProfilePage;
