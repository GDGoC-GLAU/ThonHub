# 🚀 ThonHub

ThonHub is a GenAI-powered **Hackathon Collaboration Hub** that connects **students, developers, and organizations**.  
It makes hackathons easier to explore, join, and manage — with teammate matching, AI-powered assistance, project tracking, and organizational tools for universities/companies.

---

## ✨ Features

### 👩‍💻 For Students & Developers
- 🔍 **Search & Filter Hackathons** – with reminders + calendar integration
- 👥 **Teammate Finder** – smart ranking based on GitHub, LinkedIn, and skills
- 💬 **Chat + AI Copilot** – discuss ideas, resolve queries, and get AI suggestions
- 🏆 **Profiles & Badges** – showcase hackathon history, badges, and AI-analyzed resumes
- 📅 **Personal Hackathon Page** – manage team, project details, and custom notes

### 🏢 For Organizations
- 🛠️ **Launch & Manage Hackathons** – create and organize events
- 📊 **Participation Analytics** – track hackathon stats (via Streamlit dashboard)
- 🎓 **Talent Discovery** – access student developer records for placements/internships
- 📢 **Announcements & Reminders** – send updates to participants

---

## 🏗️ Tech Stack

- **Frontend:** React + Tailwind CSS  
- **Backend:** Flask (REST APIs)  
- **Database:** MongoDB  
- **Async Tasks & Notifications:** Redis + Celery  
- **AI Copilot:** OpenAI / LangChain (pluggable module)  
- **Analytics Dashboard:** Streamlit  

---

## 📂 Project Structure (Initial Setup)

ThonHub/
│── backend/ # Flask backend
│ ├── app.py
│ ├── routes/
│ ├── models/
│ ├── services/
│ └── utils/
│
│── frontend/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── App.js
│
│── analytics/ # Streamlit dashboards
│ └── dashboard.py
│
│── CONTRIBUTING.md
│── README.md
│── requirements.txt
│── package.json

---

## 🚀 Getting Started

### Backend (Flask)
cd backend
venv\Scripts\activate
pip install -r requirements.txt
python wsgi.py

### Frontend (React)
cd frontend
npm install
npm start

### Analytics (Streamlit)
cd analytics
pip install -r requirements.txt
streamlit run dashboard.py



.
