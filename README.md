# 🚀 ThonHub - ML Simulator Platform

<div align="center">

![ThonHub Banner](https://via.placeholder.com/1200x300/667eea/ffffff?text=ThonHub+ML+Simulator)

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=for-the-badge&logo=hacktoberfest)](https://hacktoberfest.com)
[![GitHub issues](https://img.shields.io/github/issues/GDGoC-GLAU/ThonHub?style=for-the-badge)](https://github.com/GDGoC-GLAU/ThonHub/issues)
[![GitHub stars](https://img.shields.io/github/stars/GDGoC-GLAU/ThonHub?style=for-the-badge)](https://github.com/GDGoC-GLAU/ThonHub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/GDGoC-GLAU/ThonHub?style=for-the-badge)](https://github.com/GDGoC-GLAU/ThonHub/network)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

**An interactive machine learning simulator for education and experimentation**

[🎯 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Getting Started](#-getting-started) • [📚 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [API Documentation](#-api-documentation)
- [Model Documentation](#-model-documentation)
- [Usage Examples](#-usage-examples)
- [Contributing](#-contributing)
- [Code of Conduct](#code-of-conduct)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributors](#-contributors)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Support](#-support)

---

## 🎯 Overview

**ThonHub** is a comprehensive, open-source machine learning simulator platform designed to democratize ML education. Built for students, educators, and ML enthusiasts, ThonHub provides an intuitive interface to learn, experiment, and master various machine learning algorithms without writing complex code.

### 🌟 Why ThonHub?

- 🎓 **Learn by Doing**: Interactive hands-on experience with real ML algorithms
- 🔧 **Zero Setup Required**: Web-based platform, no local installations needed
- 📊 **Visual Learning**: Real-time charts, plots, and performance metrics
- 🤖 **AI-Powered Insights**: Resume analysis and intelligent recommendations
- 📱 **Cross-Platform**: Works on desktop, tablet, and mobile devices
- 🌍 **Open Source**: Free forever, community-driven development

### 🎯 Perfect For

- 📚 Students learning machine learning concepts
- 👨‍🏫 Educators teaching data science courses
- 🔬 Researchers experimenting with algorithms
- 💼 Professionals upskilling in ML
- 🚀 Anyone curious about artificial intelligence

---

## ✨ Features

### 🤖 Machine Learning Models

<table>
  <tr>
    <th>Algorithm</th>
    <th>Type</th>
    <th>Use Cases</th>
    <th>Difficulty</th>
  </tr>
  <tr>
    <td><b>Logistic Regression</b></td>
    <td>Classification</td>
    <td>Disease prediction, spam detection, customer churn</td>
    <td>🟢 Beginner</td>
  </tr>
  <tr>
    <td><b>Linear Regression</b></td>
    <td>Regression</td>
    <td>Price prediction, sales forecasting, trend analysis</td>
    <td>🟢 Beginner</td>
  </tr>
  <tr>
    <td><b>Decision Tree</b></td>
    <td>Both</td>
    <td>Credit approval, medical diagnosis, rule extraction</td>
    <td>🟡 Intermediate</td>
  </tr>
  <tr>
    <td><b>Random Forest</b></td>
    <td>Ensemble</td>
    <td>Complex classification, feature importance</td>
    <td>🟡 Intermediate</td>
  </tr>
  <tr>
    <td><b>K-Nearest Neighbors</b></td>
    <td>Both</td>
    <td>Recommendation systems, pattern recognition</td>
    <td>🟢 Beginner</td>
  </tr>
  <tr>
    <td><b>Support Vector Machine</b></td>
    <td>Classification</td>
    <td>Text classification, image recognition</td>
    <td>🔴 Advanced</td>
  </tr>
</table>

### 🎨 Platform Features

#### 📊 Data Management
- ✅ **CSV Upload**: Upload your own datasets
- ✅ **Sample Datasets**: Pre-loaded datasets for quick start
- ✅ **Data Preview**: View and explore your data before training
- ✅ **Missing Value Handling**: Automatic data cleaning
- ✅ **Feature Selection**: Choose relevant features for training

#### 🧠 Model Training
- ✅ **Interactive Parameters**: Adjust hyperparameters in real-time
- ✅ **Train/Test Split**: Configurable data splitting
- ✅ **Progress Tracking**: Real-time training status
- ✅ **Model Comparison**: Compare multiple models side-by-side
- ✅ **Save Models**: Export trained models for later use

#### 📈 Visualizations
- ✅ **Confusion Matrix**: Interactive heatmap for classification
- ✅ **ROC Curve**: AUC-ROC analysis with interpretation
- ✅ **Feature Importance**: Identify key predictive features
- ✅ **Prediction Distribution**: Probability histograms
- ✅ **Residual Plots**: For regression analysis
- ✅ **Learning Curves**: Model performance over time

#### 📊 Performance Metrics
- ✅ **Accuracy Score**: Overall prediction accuracy
- ✅ **Precision & Recall**: Class-specific metrics
- ✅ **F1-Score**: Harmonic mean of precision and recall
- ✅ **AUC-ROC**: Area under the curve analysis
- ✅ **R² Score**: Regression model fit (for regression)
- ✅ **MSE/RMSE/MAE**: Error metrics (for regression)

#### 🤖 AI Features
- ✅ **Resume Upload & Analysis**: AI-powered resume scoring
- ✅ **Skill Detection**: Automatic skill extraction
- ✅ **Career Recommendations**: Job role suggestions
- ✅ **Strength Analysis**: Identify resume strengths
- ✅ **Improvement Suggestions**: Actionable feedback

#### 📥 Export & Sharing
- ✅ **Download Reports**: Export analysis as JSON/CSV
- ✅ **Share Results**: Generate shareable links
- ✅ **Model Export**: Save trained models
- ✅ **Screenshot Capture**: Save visualizations

---

## 🛠️ Tech Stack

### Frontend Technologies

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.0-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.0-CA4245?style=flat-square&logo=react-router&logoColor=white)

**Libraries:**
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing
- **Chart.js / Plotly** - Interactive visualizations
- **Bootstrap / Tailwind** - UI components and styling

### Backend Technologies

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=flat-square&logo=flask&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.3.0-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-2.0.0-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-1.24.0-013243?style=flat-square&logo=numpy&logoColor=white)

**Libraries:**
- **Flask** - Web framework for REST API
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Scikit-learn** - Machine learning algorithms
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **PyPDF2** - PDF text extraction
- **python-docx** - DOCX file processing

### Visualization & Analysis

![Plotly](https://img.shields.io/badge/Plotly-5.17.0-3F4F75?style=flat-square&logo=plotly&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-3.7.0-11557c?style=flat-square)
![Seaborn](https://img.shields.io/badge/Seaborn-0.12.0-3776AB?style=flat-square)

**Libraries:**
- **Plotly** - Interactive plots and charts
- **Matplotlib** - Static visualizations
- **Seaborn** - Statistical data visualization

### Development & DevOps

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)

**Tools:**
- **Git** - Version control
- **GitHub** - Code hosting and collaboration
- **VS Code** - Code editor
- **npm** - Package management
- **Postman** - API testing

---

## 📁 Project Structure

ThonHub/
│
├── 📂 .github/ # GitHub configuration
│ ├── ISSUE_TEMPLATE/ # Issue templates
│ ├── PULL_REQUEST_TEMPLATE.md # PR template
│ └── workflows/ # GitHub Actions (CI/CD)
│
├── 📂 backend/ # Backend API (Python/Flask)
init.py
│ ├── 📄 app.py # Main Flask application
│ ├── 📄 config.py # Configuration settings
│ │
│ ├── 📂 routes/ # API route handlers
init.py
│ │ ├── 📄 ml_routes.py # ML model training routes
│ │ ├── 📄 resume_routes.py # Resume upload/analysis routes
│ │ ├── 📄 auth_routes.py # Authentication routes
│ │ └── 📄 data_routes.py # Dataset management routes
│ │
│ ├── 📂 services/ # Business logic layer
init.py
│ │ ├── 📄 ml_trainer.py # ML model training service
│ │ ├── 📄 resume_analyzer.py # Resume analysis service
│ │ ├── 📄 data_processor.py # Data preprocessing
│ │ └── 📄 visualization.py # Chart generation
│ │
│ ├── 📂 models/ # Database models (SQLAlchemy)
init.py
│ │ ├── 📄 user.py # User model
│ │ ├── 📄 resume.py # Resume model
│ │ └── 📄 ml_model.py # ML model metadata
│ │
│ ├── 📂 utils/ # Utility functions
init.py
│ │ ├── 📄 validators.py # Input validation
│ │ ├── 📄 helpers.py # Helper functions
│ │ └── 📄 decorators.py # Custom decorators
│ │
│ ├── 📂 uploads/ # File upload storage
│ │ ├── 📂 datasets/ # Uploaded datasets
│ │ ├── 📂 resumes/ # Uploaded resumes
│ │ └── 📄 .gitkeep
│ │
│ └── 📂 tests/ # Backend unit tests
│ ├── 📄 test_ml.py
│ ├── 📄 test_resume.py
│ └── 📄 test_api.py
│
├── 📂 frontend/ # Frontend application (React)
│ ├── 📂 public/ # Static assets
│ │ ├── 📄 index.html
│ │ ├── 📄 favicon.ico
│ │ ├── 📄 manifest.json
│ │ └── 📂 images/
│ │
│ ├── 📂 src/ # Source code
│ │ ├── 📄 App.js # Main app component
│ │ ├── 📄 index.js # Entry point
│ │ ├── 📄 App.css # Global styles
│ │ │
│ │ ├── 📂 components/ # Reusable components
│ │ │ ├── 📄 Navbar.jsx
│ │ │ ├── 📄 Footer.jsx
│ │ │ ├── 📄 ModelCard.jsx
│ │ │ ├── 📄 DataUpload.jsx
│ │ │ ├── 📄 ResumeUpload.jsx
│ │ │ ├── 📄 ConfusionMatrix.jsx
│ │ │ ├── 📄 ROCCurve.jsx
│ │ │ └── 📄 MetricsCard.jsx
│ │ │
│ │ ├── 📂 pages/ # Page components
│ │ │ ├── 📄 HomePage.jsx
│ │ │ ├── 📄 ProfilePage.jsx
│ │ │ ├── 📄 LogisticRegressionPage.jsx
│ │ │ ├── 📄 LinearRegressionPage.jsx
│ │ │ ├── 📄 DecisionTreePage.jsx
│ │ │ ├── 📄 RandomForestPage.jsx
│ │ │ ├── 📄 KNNPage.jsx
│ │ │ └── 📄 SVMPage.jsx
│ │ │
│ │ ├── 📂 utils/ # Utility functions
│ │ │ ├── 📄 api.js # Base Axios configuration
│ │ │ ├── 📄 mlApi.js # ML-specific API calls
│ │ │ ├── 📄 resumeApi.js # Resume API calls
│ │ │ ├── 📄 authApi.js # Authentication API
│ │ │ └── 📄 helpers.js # Helper functions
│ │ │
│ │ ├── 📂 hooks/ # Custom React hooks
│ │ │ ├── 📄 useAuth.js
│ │ │ ├── 📄 useModel.js
│ │ │ └── 📄 useUpload.js
│ │ │
│ │ ├── 📂 context/ # React Context
│ │ │ ├── 📄 AuthContext.js
│ │ │ └── 📄 ModelContext.js
│ │ │
│ │ └── 📂 styles/ # Component styles
│ │ ├── 📄 components.css
│ │ └── 📄 pages.css
│ │
│ ├── 📄 package.json # Frontend dependencies
│ ├── 📄 package-lock.json
│ └── 📄 .env.example # Environment variables template
│
├── 📂 docs/ # Comprehensive documentation
│ ├── 📄 README.md # Documentation overview
│ ├── 📄 logistic_regression.md # Logistic Regression guide
│ ├── 📄 linear_regression.md # Linear Regression guide
│ ├── 📄 decision_tree.md # Decision Tree guide
│ ├── 📄 random_forest.md # Random Forest guide
│ ├── 📄 knn.md # KNN guide
│ ├── 📄 svm.md # SVM guide
│ └── 📂 assets/ # Documentation images
│ ├── 📂 logistic_regression/
│ ├── 📂 linear_regression/
│ └── ...
│
├── 📄 .gitignore # Git ignore rules
├── 📄 LICENSE # MIT License
├── 📄 README.md # This file
├── 📄 CONTRIBUTING.md # Contribution guidelines
├── 📄 CODE_OF_CONDUCT.md # Code of conduct
├── 📄 requirements.txt # Python dependencies



---

## 🚀 Getting Started

### Prerequisites

Before setting up ThonHub, ensure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | ≥ 16.0.0 | [nodejs.org](https://nodejs.org/) |
| **Python** | ≥ 3.9.0 | [python.org](https://www.python.org/) |
| **npm** | ≥ 8.0.0 | Comes with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **pip** | Latest | Comes with Python |

**Optional but Recommended:**
- **VS Code** - [Download](https://code.visualstudio.com/)
- **Postman** - [Download](https://www.postman.com/)
- **Python venv** - For virtual environments

### Installation

#### Step 1: Clone the Repository

Clone via HTTPS
git clone https://github.com/GDGoC-GLAU/ThonHub.git

OR clone via SSH
git clone git@github.com:GDGoC-GLAU/ThonHub.git

Navigate to project directory
cd ThonHub

text

#### Step 2: Backend Setup

Navigate to backend directory
cd backend

Create a virtual environment (recommended)
python -m venv venv

Activate virtual environment
On Windows:
venv\Scripts\activate

On macOS/Linux:
source venv/bin/activate

Upgrade pip
python -m pip install --upgrade pip

Install Python dependencies
pip install -r requirements.txt

Create uploads directories
mkdir -p uploads/datasets uploads/resumes

Create environment file
cp .env.example .env

Edit .env file with your configuration
Set SECRET_KEY, DATABASE_URL, etc.
text

**Backend `.env` Configuration:**
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///thonhub.db
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216 # 16MB
http://localhost:3000

text

#### Step 3: Frontend Setup

Navigate to frontend directory (from root)
cd frontend

Install Node.js dependencies
npm install

Create environment file
cp .env.example .env

Edit .env with your API configuration
text

**Frontend `.env` Configuration:**
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_TIMEOUT=30000
text

### Running Locally

#### 🔹 Start Backend Server

From backend directory
cd backend

Activate virtual environment (if not already active)
Windows:
venv\Scripts\activate

macOS/Linux:
source venv/bin/activate

Run Flask application
python app.py

Or use Flask CLI
flask run

Backend server will start on: http://localhost:5000
text

**Expected Output:**
Running on http://127.0.0.1:5000

Debugger is active!

Debugger PIN: xxx-xxx-xxx

text

#### 🔹 Start Frontend Development Server

From frontend directory (open new terminal)
cd frontend

Start React development server
npm start

Frontend will automatically open at: http://localhost:3000
text

**Expected Output:**
Compiled successfully!

You can now view thonhub in the browser.

Local: http://localhost:3000
On Your Networkhttp://192.168.1.x:3000

text

#### 🎉 Access the Application

- **Frontend (User Interface)**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:5000](http://localhost:5000)
- **API Documentation**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 📡 API Documentation

### Base URL

http://localhost:5000/api

text

### Authentication

Most endpoints require JWT authentication. Include the token in the header:

Authorization: Bearer <your-jwt-token>

text

### Machine Learning Endpoints

#### Train Model

POST /api/models/{model_type}/train
Content-Type: appli

{
"features": ["feature1", "feature2"
, "target": "target_colu
n", "test_size"
0.2, "parame
ers": { "max
i
text

**Response:**
{
"success": tru
, "data
: { "accuracy
: 0.95, "confusion_matrix": [, ],
1][2][3][4]
roc_auc": 0.
2, "metrics":
"precisi
n": 0.94,
r
c
text

#### Predict

POST /api/models/{model_type}/predict
{
"features": [value1, value2, value
text

### Resume Endpoints

#### Upload Resume

POST /api/resume/upload
Content-T

file: [binary-resume-file]

text

**Response:**
{
"success": tru
, "filename": "resume.p
f", "analys
s": { "s
ore": 85, "skills": ["Python", "React", "Machi
e Learning"], "experience_l
v
text

### Data Endpoints

#### Upload Dataset

POST /api/data/upload
Content-Typ

file: [binary-csv-file]

text

#### Get Sample Dataset

GET /api/data/sample/{dataset_name}

text

---

## 📚 Model Documentation

Comprehensive documentation for each ML model:

### Quick Access

| Model | Documentation | Complexity | Best For |
|-------|---------------|------------|----------|
| **Logistic Regression** | [📖 View Docs](docs/logistic_regression.md) | 🟢 Beginner | Binary classification |
| **Linear Regression** | [📖 View Docs](docs/linear_regression.md) | 🟢 Beginner | Continuous prediction |
| **Decision Tree** | [📖 View Docs](docs/decision_tree.md) | 🟡 Intermediate | Interpretable models |
| **Random Forest** | [📖 View Docs](docs/random_forest.md) | 🟡 Intermediate | Robust classification |
| **K-Nearest Neighbors** | [📖 View Docs](docs/knn.md) | 🟢 Beginner | Pattern recognition |
| **Support Vector Machine** | [📖 View Docs](docs/svm.md) | 🔴 Advanced | Complex boundaries |

### Documentation Includes

Each model documentation provides:

✅ **Overview** - What the model does and when to use it  
✅ **How to Run** - Step-by-step usage instructions  
✅ **Parameters** - Detailed explanation of all parameters  
✅ **Visualizations** - How to interpret each plot  
✅ **Metrics** - Understanding performance indicators  
✅ **Best Practices** - Tips for optimal results  
✅ **Troubleshooting** - Common issues and solutions  
✅ **Examples** - Real-world use cases

---

## 💡 Usage Examples

### Example 1: Train Logistic Regression Model

// Frontend Code
import mlApi from

const trainModel = async () => {
const trainingData =
{ features: ['age', 'income', 'credit_sc
re'], target: 'loan_
pproved', t
st_size: 0.2,
parameters:
{

const response = await mlApi.trainLogisticRegression(trainingData);

if (response.success) {
console.log('Accuracy:', response.data.accura
y); console.log('AUC Score:', response.data.r
c
text

### Example 2: Upload and Analyze Resume

// Frontend Code
import resumeApi from './

const analyzeResume = async (file) => {
const response = await resumeApi.uploadResume(file, (progress) =>
Upload progress: ${progress}%);
if (response.success) {
console.log('Score:', response.data.analysis.sco
e); console.log('Skills:', response.data.analysis.
k
text

### Example 3: Using the Python Backend

Backend Code
from services.ml_trainer import MLTrainer
Load data
df = pd.read_csv('data.csv')

Initialize trainer
trainer = MLTrainer(model_type='logistic_regression')

Train model
results = trainer.train(
X=df[['feature1', 'feature2
]], y=df['t
rget'], t
print(f"Accuracy: {results['accuracy']}")
print(f"AUC: {results['roc_a

text

---

## 🤝 Contributing

We ❤️ contributions! ThonHub is an open-source project and welcomes contributions from developers of all skill levels.

### How to Contribute

#### 1️⃣ Fork the Repository

Click the "Fork" button at the top-right of this page.

#### 2️⃣ Clone Your Fork

git clone https://github.com/YOUR-USERNAME/ThonHub.git
cd ThonHu

text

#### 3️⃣ Create a Branch

Create a new branch for your feature
git checkout -b feature/your-feature-name

Or for bug fixes
git checkout -b fix/bug-description

text

#### 4️⃣ Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments where necessary
- Update documentation if needed

#### 5️⃣ Test Your Changes

Backend tests
cd backend
python -m py

Frontend tests
cd frontend
text

#### 6️⃣ Commit Your Changes

git add .
git commit -m "Add: Brief description of you

text

**Commit Message Guidelines:**
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Docs:` for documentation changes
- `Refactor:` for code refactoring
- `Test:` for adding tests

#### 7️⃣ Push to Your Fork

git push origin feature/your-feature-name

text

#### 8️⃣ Create a Pull Request

1. Go to the original ThonHub repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template with:
   - Description of changes
   - Issue number (if applicable)
   - Screenshots (if UI changes)
   - Testing done

### Contribution Guidelines

📖 **Read** [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines

✅ **Code Quality**
- Follow PEP 8 for Python code
- Use ES6+ standards for JavaScript
- Write meaningful variable and function names
- Add comments for complex logic

✅ **Testing**
- Write unit tests for new features
- Ensure all existing tests pass
- Test on multiple browsers (Chrome, Firefox, Safari)

✅ **Documentation**
- Update README if you add features
- Add docstrings to functions
- Update API documentation for new endpoints

✅ **Pull Request**
- Link related issues
- Provide clear description
- Include screenshots for UI changes
- Be responsive to feedback

### Good First Issues

Looking for a place to start? Check out issues labeled:
- [`good first issue`](https://github.com/GDGoC-GLAU/ThonHub/labels/good%20first%20issue)
- [`beginner-friendly`](https://github.com/GDGoC-GLAU/ThonHub/labels/beginner-friendly)
- [`documentation`](https://github.com/GDGoC-GLAU/ThonHub/labels/documentation)

### Hacktoberfest

ThonHub participates in Hacktoberfest! 🎃

- Look for issues tagged [`hacktoberfest`](https://github.com/GDGoC-GLAU/ThonHub/labels/hacktoberfest)
- Valid PRs count toward your Hacktoberfest goal
- Follow quality guidelines for PR acceptance

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

**Our Standards:**
- ✅ Be respectful and inclusive
- ✅ Welcome newcomers
- ✅ Accept constructive criticism
- ✅ Focus on what's best for the community
- ❌ No harassment or discrimination
- ❌ No trolling or insulting comments

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Issue: `ModuleNotFoundError: No module named 'flask'`**

Solution: Install dependencies
pip install -r requirements.txt

text

**Issue: Port 5000 already in use**

Solution: Change port in app.py or kill the process
Windows:
netstat -ano | findstr :5000
tas<PID> /F

macOS/Linux:
lsof -ti:5000 | xargs kill -9

text

**Issue: CORS errors**

Solution: Ensure Flask-CORS is installed and configured
pip install flask-cors

In app.py:
from flask_cors import CORS
text

#### Frontend Issues

**Issue: `npm install` fails**

Solution: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
text

**Issue: API connection refused**

Solution: Ensure backend is running
Check .env file has correct API_BASE_URL
REACT_APP_API_BASE_URL=http://localhost:5000/api

text

**Issue: React app won't start**

Solution: Check if port 3000 is free
Kill process on port 3000
Windows:
netstat -ano | findstr :3000
<PID> /F

macOS/Linux:
lsof -ti:3000 | xargs kill -9

text

### Getting Help

- 📝 [Open an issue](https://github.com/GDGoC-GLAU/ThonHub/issues/new)
- 💬 Join our [Discord community](#)
- 📧 Email: support@thonhub.com
- 📚 Check [documentation](docs/)

---

## 🗺️ Roadmap

### Version 1.1 (Q1 2026)
- [ ] User authentication and profiles
- [ ] Model comparison dashboard
- [ ] Export trained models (pickle/joblib)
- [ ] API rate limiting
- [ ] Enhanced resume parser (work experience, education)

### Version 1.2 (Q2 2026)
- [ ] Neural Networks support
- [ ] Deep Learning models (CNN, RNN)
- [ ] Real-time collaboration
- [ ] Model deployment to cloud
- [ ] Mobile app (React Native)

### Version 2.0 (Q3 2026)
- [ ] AutoML capabilities
- [ ] Hyperparameter tuning automation
- [ ] Model explainability (SHAP, LIME)
- [ ] Time series analysis
- [ ] Natural Language Processing models

### Future Ideas
- [ ] Jupyter Notebook integration
- [ ] Video tutorials
- [ ] Certification courses
- [ ] Community datasets library
- [ ] Model marketplace

**Want to see a feature?** [Suggest it here](https://github.com/GDGoC-GLAU/ThonHub/issues/new?labels=enhancement)

---

## 👥 Contributors

Thanks to all our amazing contributors! 🎉

<a href="https://github.com/GDGoC-GLAU/ThonHub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GDGoC-GLAU/ThonHub" />
</a>

### How to Become a Contributor

1. Fork the repository
2. Make meaningful contributions
3. Submit quality pull requests
4. Get your PR merged
5. You'll be automatically added to contributors!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
