import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Hackathon from './pages/Hackathon';
import OrgPanel from './pages/OrgPanel';
import ProjectNotes from './pages/ProjectNotes';
import Teammates from './pages/Teammates';
import Profile from './pages/Profile';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/org-panel" element={<OrgPanel />} />
            <Route path="/project-notes" element={<ProjectNotes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/teammates" element={<Teammates />} />
        </Routes>
    );
}