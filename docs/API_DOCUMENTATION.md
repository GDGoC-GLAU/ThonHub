# 🚀 ThonHub API Documentation

Welcome to the ThonHub API documentation! This comprehensive guide covers all Flask REST API endpoints for the hackathon collaboration platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Base URL & Configuration](#base-url--configuration)
- [Authentication](#authentication)
- [Current Endpoints](#current-endpoints)
- [Planned API Endpoints](#planned-api-endpoints)
  - [Health & System](#health--system)
  - [Authentication & Users](#authentication--users)
  - [Hackathons](#hackathons)
  - [Teams & Teammates](#teams--teammates)
  - [Chat & AI Copilot](#chat--ai-copilot)
  - [Organizations](#organizations)
  - [Notifications & Reminders](#notifications--reminders)
  - [Resume & Profiles](#resume--profiles)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Overview

ThonHub API is a Flask-based REST API that powers a hackathon collaboration platform. It provides endpoints for hackathon discovery, team formation, AI-powered assistance, and organizational management.

**Tech Stack:**
- Flask 2.3.3
- MongoDB (via pymongo 4.5.0)
- Flask-CORS 4.0.0
- Redis + Celery (for async tasks)

---

## Base URL & Configuration

```
Development: http://localhost:5000
Production: [To be configured]
```

**Default Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**CORS Configuration:**
- Allowed Origins: `http://localhost:3000` (configurable via environment)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

---

## Authentication

ThonHub uses JWT-based authentication for protected endpoints.

**Authentication Header:**
```
Authorization: Bearer <your-jwt-token>
```

**Protected Endpoints:** Most endpoints except health check and public hackathon listings require authentication.

---

## Current Endpoints

### Health Check

#### `GET /health`

**Description:** Check API health status

**Request:**
```http
GET /health HTTP/1.1
Host: localhost:5000
```

**Response:**
```json
{
  "status": "healthy",
  "message": "ThonHub API is running"
}
```

**Status Codes:**
- `200` - Service is healthy

**Example Usage:**
```bash
curl -X GET http://localhost:5000/health
```

---

## Planned API Endpoints

*Note: The following endpoints are designed based on the dataflow documentation and will be implemented in the respective route files.*

### Health & System

#### `GET /api/status`

**Description:** Get detailed system status including database connectivity

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected",
  "version": "1.0.0",
  "timestamp": "2024-03-10T14:44:46Z"
}
```

---

### Authentication & Users

#### `POST /api/auth/register`

**Description:** Register a new user (student/developer)

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "user_type": "student",
  "university": "MIT",
  "skills": ["Python", "React", "Machine Learning"],
  "github_username": "johndoe",
  "linkedin_url": "https://linkedin.com/in/johndoe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user_id": "64f5a8b7c1234567890abcde",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Invalid input data
- `409` - Email already exists

---

#### `POST /api/auth/login`

**Description:** User authentication

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a8b7c1234567890abcde",
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "user_type": "student",
    "profile_complete": true
  }
}
```

**Status Codes:**
- `200` - Login successful
- `401` - Invalid credentials
- `404` - User not found

---

#### `POST /api/auth/logout`

**Description:** Logout user (invalidate token)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

---

#### `GET /api/users/{user_id}`

**Description:** Get user profile details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "64f5a8b7c1234567890abcde",
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "user_type": "student",
    "university": "MIT",
    "skills": ["Python", "React", "Machine Learning"],
    "github_username": "johndoe",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "badges": [
      {
        "name": "First Hackathon",
        "description": "Participated in first hackathon",
        "earned_date": "2024-01-15T00:00:00Z"
      }
    ],
    "hackathon_history": [
      {
        "hackathon_id": "64f5a8b7c1234567890abcdf",
        "name": "AI for Good Hackathon",
        "position": "Winner",
        "date": "2024-02-15T00:00:00Z"
      }
    ],
    "profile_stats": {
      "hackathons_participated": 5,
      "teams_joined": 3,
      "projects_completed": 4
    }
  }
}
```

---

#### `PUT /api/users/{user_id}`

**Description:** Update user profile

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "John Doe Jr.",
  "skills": ["Python", "React", "Machine Learning", "Docker"],
  "bio": "Passionate full-stack developer interested in AI/ML",
  "github_username": "johndoejr"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "64f5a8b7c1234567890abcde",
    "full_name": "John Doe Jr.",
    "skills": ["Python", "React", "Machine Learning", "Docker"],
    "bio": "Passionate full-stack developer interested in AI/ML",
    "updated_at": "2024-03-10T14:44:46Z"
  }
}
```

---

### Hackathons

#### `GET /api/hackathons`

**Description:** Search and filter hackathons

**Query Parameters:**
- `search` (string): Search term for hackathon name/description
- `category` (string): Filter by category (AI, Web, Mobile, etc.)
- `status` (string): upcoming, ongoing, completed
- `location` (string): Filter by location
- `date_from` (ISO date): Filter hackathons from date
- `date_to` (ISO date): Filter hackathons until date
- `page` (int): Page number (default: 1)
- `limit` (int): Results per page (default: 10, max: 50)

**Example Request:**
```http
GET /api/hackathons?search=AI&status=upcoming&page=1&limit=10 HTTP/1.1
```

**Response:**
```json
{
  "hackathons": [
    {
      "id": "64f5a8b7c1234567890abcdf",
      "name": "AI for Good Hackathon 2024",
      "description": "Build AI solutions for social good",
      "organization": "TechForGood Foundation",
      "category": "AI/ML",
      "status": "upcoming",
      "start_date": "2024-04-15T09:00:00Z",
      "end_date": "2024-04-17T18:00:00Z",
      "location": "San Francisco, CA",
      "is_virtual": false,
      "max_team_size": 4,
      "registration_deadline": "2024-04-10T23:59:59Z",
      "prizes": [
        {
          "position": "1st",
          "amount": 10000,
          "currency": "USD"
        }
      ],
      "tags": ["AI", "Social Impact", "Machine Learning"],
      "participants_count": 150,
      "max_participants": 200
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 47,
    "has_next": true,
    "has_prev": false
  }
}
```

---

#### `GET /api/hackathons/{hackathon_id}`

**Description:** Get detailed hackathon information

**Response:**
```json
{
  "hackathon": {
    "id": "64f5a8b7c1234567890abcdf",
    "name": "AI for Good Hackathon 2024",
    "description": "Build AI solutions for social good...",
    "long_description": "Detailed description with markdown support...",
    "organization": {
      "id": "64f5a8b7c1234567890abce0",
      "name": "TechForGood Foundation",
      "logo_url": "https://example.com/logo.png"
    },
    "category": "AI/ML",
    "status": "upcoming",
    "start_date": "2024-04-15T09:00:00Z",
    "end_date": "2024-04-17T18:00:00Z",
    "location": "San Francisco, CA",
    "venue_details": "Convention Center, Hall A",
    "is_virtual": false,
    "virtual_platform": null,
    "max_team_size": 4,
    "min_team_size": 2,
    "registration_deadline": "2024-04-10T23:59:59Z",
    "prizes": [
      {
        "position": "1st",
        "title": "Grand Prize",
        "amount": 10000,
        "currency": "USD",
        "description": "Cash prize + mentorship"
      }
    ],
    "sponsors": [
      {
        "name": "Google",
        "logo_url": "https://example.com/google-logo.png",
        "tier": "Platinum"
      }
    ],
    "rules": ["Teams of 2-4 members", "Original code only", "..."],
    "themes": ["Healthcare", "Education", "Environment"],
    "technologies": ["Python", "TensorFlow", "React"],
    "schedule": [
      {
        "time": "2024-04-15T09:00:00Z",
        "event": "Opening Ceremony",
        "description": "Welcome and theme introduction"
      }
    ],
    "judges": [
      {
        "name": "Dr. Sarah Johnson",
        "title": "AI Research Director",
        "company": "Google AI",
        "bio": "Leading AI researcher..."
      }
    ],
    "participants_count": 150,
    "max_participants": 200,
    "is_registration_open": true,
    "created_at": "2024-02-01T10:00:00Z",
    "updated_at": "2024-03-01T15:30:00Z"
  }
}
```

---

#### `POST /api/hackathons/{hackathon_id}/register`

**Description:** Register for a hackathon

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "team_name": "AI Innovators",
  "team_description": "We build AI solutions for social impact",
  "looking_for_teammates": true,
  "preferred_skills": ["Python", "Machine Learning"],
  "contact_preferences": {
    "email": true,
    "whatsapp": false
  }
}
```

**Response:**
```json
{
  "message": "Successfully registered for hackathon",
  "registration": {
    "id": "64f5a8b7c1234567890abce1",
    "hackathon_id": "64f5a8b7c1234567890abcdf",
    "user_id": "64f5a8b7c1234567890abcde",
    "team_name": "AI Innovators",
    "status": "confirmed",
    "registered_at": "2024-03-10T14:44:46Z"
  }
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Registration deadline passed or hackathon full
- `409` - User already registered

---

### Teams & Teammates

#### `GET /api/teammates`

**Description:** Find potential teammates with smart ranking

**Query Parameters:**
- `hackathon_id` (string, required): Hackathon to find teammates for
- `skills` (string): Comma-separated list of required skills
- `location` (string): Preferred location
- `experience_level` (string): beginner, intermediate, advanced
- `limit` (int): Maximum results (default: 20)

**Headers:**
```
Authorization: Bearer <token>
```

**Example Request:**
```http
GET /api/teammates?hackathon_id=64f5a8b7c1234567890abcdf&skills=python,ml&limit=10 HTTP/1.1
```

**Response:**
```json
{
  "teammates": [
    {
      "user": {
        "id": "64f5a8b7c1234567890abce2",
        "full_name": "Alice Smith",
        "skills": ["Python", "Machine Learning", "TensorFlow"],
        "experience_level": "intermediate",
        "university": "Stanford University",
        "location": "San Francisco, CA",
        "github_username": "alicesmith",
        "profile_image": "https://example.com/alice.jpg",
        "bio": "ML enthusiast passionate about social impact"
      },
      "compatibility_score": 95,
      "skill_match": {
        "matching_skills": ["Python", "Machine Learning"],
        "missing_skills": [],
        "complementary_skills": ["TensorFlow", "Data Science"]
      },
      "hackathon_history": {
        "total_hackathons": 8,
        "wins": 2,
        "avg_rating": 4.7
      },
      "github_stats": {
        "public_repos": 25,
        "followers": 150,
        "contribution_score": 85
      },
      "availability": {
        "looking_for_team": true,
        "preferred_role": "ML Engineer",
        "time_zone": "PST"
      }
    }
  ],
  "total_count": 45,
  "filters_applied": {
    "hackathon_id": "64f5a8b7c1234567890abcdf",
    "skills": ["python", "ml"],
    "available_only": true
  }
}
```

---

#### `POST /api/invites`

**Description:** Send team invitation to another user

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "hackathon_id": "64f5a8b7c1234567890abcdf",
  "invitee_id": "64f5a8b7c1234567890abce2",
  "team_name": "AI Innovators",
  "message": "Hi Alice! Would you like to join our team for the AI hackathon?",
  "role_offered": "ML Engineer"
}
```

**Response:**
```json
{
  "message": "Invitation sent successfully",
  "invite": {
    "id": "64f5a8b7c1234567890abce3",
    "hackathon_id": "64f5a8b7c1234567890abcdf",
    "sender_id": "64f5a8b7c1234567890abcde",
    "invitee_id": "64f5a8b7c1234567890abce2",
    "status": "pending",
    "sent_at": "2024-03-10T14:44:46Z",
    "expires_at": "2024-03-17T14:44:46Z"
  }
}
```

---

#### `GET /api/invites`

**Description:** Get user's invitations (sent and received)

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `type` (string): sent, received, all (default: all)
- `status` (string): pending, accepted, declined (default: all)

**Response:**
```json
{
  "invitations": {
    "received": [
      {
        "id": "64f5a8b7c1234567890abce3",
        "hackathon": {
          "id": "64f5a8b7c1234567890abcdf",
          "name": "AI for Good Hackathon 2024"
        },
        "sender": {
          "id": "64f5a8b7c1234567890abcde",
          "full_name": "John Doe",
          "profile_image": "https://example.com/john.jpg"
        },
        "team_name": "AI Innovators",
        "message": "Hi Alice! Would you like to join our team?",
        "role_offered": "ML Engineer",
        "status": "pending",
        "sent_at": "2024-03-10T14:44:46Z",
        "expires_at": "2024-03-17T14:44:46Z"
      }
    ],
    "sent": []
  }
}
```

---

#### `PUT /api/invites/{invite_id}/respond`

**Description:** Respond to team invitation

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "response": "accepted",
  "message": "Excited to work with your team!"
}
```

**Response:**
```json
{
  "message": "Invitation response recorded",
  "invite": {
    "id": "64f5a8b7c1234567890abce3",
    "status": "accepted",
    "response_message": "Excited to work with your team!",
    "responded_at": "2024-03-10T15:00:00Z"
  },
  "team": {
    "id": "64f5a8b7c1234567890abce4",
    "name": "AI Innovators",
    "members_count": 2
  }
}
```

---

#### `GET /api/teams/{team_id}`

**Description:** Get team details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "team": {
    "id": "64f5a8b7c1234567890abce4",
    "name": "AI Innovators",
    "description": "Building AI solutions for social impact",
    "hackathon": {
      "id": "64f5a8b7c1234567890abcdf",
      "name": "AI for Good Hackathon 2024"
    },
    "members": [
      {
        "user_id": "64f5a8b7c1234567890abcde",
        "full_name": "John Doe",
        "role": "Team Lead",
        "skills": ["Python", "React"],
        "joined_at": "2024-03-10T14:44:46Z"
      },
      {
        "user_id": "64f5a8b7c1234567890abce2",
        "full_name": "Alice Smith",
        "role": "ML Engineer",
        "skills": ["Python", "Machine Learning", "TensorFlow"],
        "joined_at": "2024-03-10T15:00:00Z"
      }
    ],
    "project": {
      "name": "EcoTracker AI",
      "description": "AI-powered carbon footprint tracker",
      "github_repo": "https://github.com/ai-innovators/ecotracker",
      "demo_url": "https://ecotracker-demo.com",
      "tech_stack": ["Python", "React", "TensorFlow", "MongoDB"]
    },
    "status": "active",
    "created_at": "2024-03-10T14:44:46Z",
    "last_active": "2024-03-10T16:30:00Z"
  }
}
```

---

### Chat & AI Copilot

#### `GET /api/chat/{team_id}`

**Description:** Get chat history for a team

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `limit` (int): Messages per page (default: 50)
- `since` (ISO timestamp): Get messages since timestamp

**Response:**
```json
{
  "messages": [
    {
      "id": "64f5a8b7c1234567890abce5",
      "team_id": "64f5a8b7c1234567890abce4",
      "sender": {
        "id": "64f5a8b7c1234567890abcde",
        "full_name": "John Doe",
        "type": "user"
      },
      "content": "Hey team! Let's discuss our project idea.",
      "message_type": "text",
      "timestamp": "2024-03-10T16:30:00Z",
      "edited": false,
      "reactions": [
        {
          "emoji": "👍",
          "count": 2,
          "users": ["64f5a8b7c1234567890abce2"]
        }
      ]
    },
    {
      "id": "64f5a8b7c1234567890abce6",
      "team_id": "64f5a8b7c1234567890abce4",
      "sender": {
        "id": "ai_copilot",
        "full_name": "AI Copilot",
        "type": "ai"
      },
      "content": "I can help you brainstorm project ideas! Based on your team's skills in AI/ML, here are some suggestions:\n\n1. **Healthcare AI**: Diagnostic assistance tool\n2. **Environmental Impact**: Carbon footprint tracker\n3. **Education Tech**: Personalized learning assistant\n\nWhich domain interests your team most?",
      "message_type": "ai_response",
      "timestamp": "2024-03-10T16:31:00Z",
      "ai_context": {
        "prompt_type": "project_suggestions",
        "team_skills": ["Python", "React", "Machine Learning"]
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_messages": 127,
    "has_more": true
  }
}
```

---

#### `POST /api/chat/{team_id}`

**Description:** Send a message to team chat

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "I think we should go with the environmental impact idea!",
  "message_type": "text",
  "reply_to": "64f5a8b7c1234567890abce6"
}
```

**Response:**
```json
{
  "message": {
    "id": "64f5a8b7c1234567890abce7",
    "team_id": "64f5a8b7c1234567890abce4",
    "sender": {
      "id": "64f5a8b7c1234567890abce2",
      "full_name": "Alice Smith",
      "type": "user"
    },
    "content": "I think we should go with the environmental impact idea!",
    "message_type": "text",
    "reply_to": "64f5a8b7c1234567890abce6",
    "timestamp": "2024-03-10T16:35:00Z"
  }
}
```

---

#### `POST /api/chat/{team_id}/ai-copilot`

**Description:** Send query to AI copilot

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "query": "Help us create a project plan for our carbon footprint tracker app",
  "context_type": "project_planning",
  "include_chat_history": true
}
```

**Response:**
```json
{
  "ai_response": {
    "id": "64f5a8b7c1234567890abce8",
    "content": "Great choice! Here's a structured project plan for your carbon footprint tracker:\n\n## Project Plan: EcoTracker AI\n\n### Phase 1: Setup & Research (Day 1)\n- [ ] Set up development environment\n- [ ] Research carbon footprint calculation methods\n- [ ] Design database schema\n\n### Phase 2: Backend Development (Day 1-2)\n- [ ] Implement user authentication\n- [ ] Create carbon calculation APIs\n- [ ] Set up ML model for predictions\n\n### Phase 3: Frontend Development (Day 2)\n- [ ] Build React dashboard\n- [ ] Implement data visualization\n- [ ] Create input forms\n\n### Phase 4: Integration & Testing (Day 3)\n- [ ] Connect frontend to backend\n- [ ] Test all features\n- [ ] Prepare presentation\n\n**Tech Stack Recommendations:**\n- Backend: Flask + MongoDB\n- Frontend: React + Chart.js\n- ML: scikit-learn or TensorFlow\n- Deployment: Heroku or Vercel\n\nWould you like me to elaborate on any specific phase?",
    "response_type": "project_plan",
    "confidence": 0.95,
    "sources": ["hackathon_best_practices", "environmental_apis"],
    "timestamp": "2024-03-10T16:40:00Z"
  }
}
```

---

### Organizations

#### `POST /api/org/register`

**Description:** Register a new organization

**Request Body:**
```json
{
  "organization_name": "TechForGood Foundation",
  "contact_email": "contact@techforgood.org",
  "contact_person": "Sarah Johnson",
  "organization_type": "non_profit",
  "website": "https://techforgood.org",
  "description": "We organize hackathons for social impact",
  "address": {
    "street": "123 Tech Street",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "zip_code": "94105"
  }
}
```

**Response:**
```json
{
  "message": "Organization registered successfully",
  "organization": {
    "id": "64f5a8b7c1234567890abce9",
    "name": "TechForGood Foundation",
    "status": "pending_verification",
    "verification_token": "verify_abc123xyz"
  }
}
```

---

#### `POST /api/org/hackathons`

**Description:** Create a new hackathon (organization only)

**Headers:**
```
Authorization: Bearer <org-token>
```

**Request Body:**
```json
{
  "name": "AI for Good Hackathon 2024",
  "description": "Build AI solutions for social good",
  "long_description": "Detailed hackathon description with markdown...",
  "category": "AI/ML",
  "start_date": "2024-04-15T09:00:00Z",
  "end_date": "2024-04-17T18:00:00Z",
  "registration_deadline": "2024-04-10T23:59:59Z",
  "location": "San Francisco, CA",
  "venue_details": "Convention Center, Hall A",
  "is_virtual": false,
  "virtual_platform": null,
  "max_participants": 200,
  "max_team_size": 4,
  "min_team_size": 2,
  "prizes": [
    {
      "position": "1st",
      "title": "Grand Prize",
      "amount": 10000,
      "currency": "USD",
      "description": "Cash prize + mentorship"
    }
  ],
  "themes": ["Healthcare", "Education", "Environment"],
  "rules": ["Teams of 2-4 members", "Original code only"],
  "schedule": [
    {
      "time": "2024-04-15T09:00:00Z",
      "event": "Opening Ceremony",
      "description": "Welcome and theme introduction"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Hackathon created successfully",
  "hackathon": {
    "id": "64f5a8b7c1234567890abcea",
    "name": "AI for Good Hackathon 2024",
    "status": "draft",
    "created_at": "2024-03-10T16:45:00Z",
    "registration_url": "https://thonhub.com/hackathons/64f5a8b7c1234567890abcea/register"
  }
}
```

---

#### `GET /api/org/hackathons/{hackathon_id}/participants`

**Description:** Get hackathon participants (organization only)

**Headers:**
```
Authorization: Bearer <org-token>
```

**Query Parameters:**
- `status` (string): registered, checked_in, all
- `export_format` (string): json, csv

**Response:**
```json
{
  "participants": [
    {
      "user": {
        "id": "64f5a8b7c1234567890abcde",
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "university": "MIT",
        "skills": ["Python", "React"]
      },
      "registration": {
        "id": "64f5a8b7c1234567890abce1",
        "status": "confirmed",
        "registered_at": "2024-03-10T14:44:46Z",
        "team_name": "AI Innovators",
        "checked_in": false
      }
    }
  ],
  "statistics": {
    "total_registered": 150,
    "checked_in": 0,
    "teams_formed": 35,
    "skill_distribution": {
      "Python": 89,
      "JavaScript": 67,
      "React": 45
    },
    "university_distribution": {
      "MIT": 25,
      "Stanford": 22,
      "UC Berkeley": 18
    }
  }
}
```

---

### Notifications & Reminders

#### `POST /api/reminders`

**Description:** Set reminder for hackathon

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "hackathon_id": "64f5a8b7c1234567890abcdf",
  "reminder_type": "registration_deadline",
  "notify_via": ["email", "whatsapp"],
  "custom_message": "Don't forget to register!",
  "remind_before": {
    "days": 3,
    "hours": 0
  }
}
```

**Response:**
```json
{
  "message": "Reminder set successfully",
  "reminder": {
    "id": "64f5a8b7c1234567890abceb",
    "hackathon_id": "64f5a8b7c1234567890abcdf",
    "user_id": "64f5a8b7c1234567890abcde",
    "reminder_type": "registration_deadline",
    "scheduled_for": "2024-04-07T23:59:59Z",
    "status": "scheduled",
    "notify_via": ["email", "whatsapp"]
  }
}
```

---

#### `GET /api/notifications`

**Description:** Get user notifications

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `unread_only` (boolean): Filter unread notifications
- `type` (string): Filter by notification type
- `limit` (int): Number of notifications (default: 20)

**Response:**
```json
{
  "notifications": [
    {
      "id": "64f5a8b7c1234567890abcec",
      "type": "team_invite",
      "title": "New Team Invitation",
      "message": "John Doe invited you to join 'AI Innovators' team",
      "data": {
        "invite_id": "64f5a8b7c1234567890abce3",
        "hackathon_name": "AI for Good Hackathon 2024",
        "sender_name": "John Doe"
      },
      "is_read": false,
      "created_at": "2024-03-10T14:44:46Z"
    },
    {
      "id": "64f5a8b7c1234567890abced",
      "type": "hackathon_reminder",
      "title": "Registration Deadline Approaching",
      "message": "AI for Good Hackathon registration closes in 3 days",
      "data": {
        "hackathon_id": "64f5a8b7c1234567890abcdf",
        "deadline": "2024-04-10T23:59:59Z"
      },
      "is_read": true,
      "created_at": "2024-03-07T10:00:00Z"
    }
  ],
  "unread_count": 1,
  "total_count": 25
}
```

---

#### `PUT /api/notifications/{notification_id}/read`

**Description:** Mark notification as read

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Notification marked as read"
}
```

---

### Resume & Profiles

#### `POST /api/resume/upload`

**Description:** Upload and analyze resume

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `resume_file`: PDF file
- `analysis_level`: basic, detailed, comprehensive

**Response:**
```json
{
  "message": "Resume uploaded successfully",
  "resume": {
    "id": "64f5a8b7c1234567890abcee",
    "filename": "john_doe_resume.pdf",
    "file_url": "https://storage.example.com/resumes/64f5a8b7c1234567890abcee.pdf",
    "analysis_status": "processing",
    "uploaded_at": "2024-03-10T16:50:00Z"
  }
}
```

---

#### `GET /api/resume/{resume_id}/analysis`

**Description:** Get AI resume analysis results

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "analysis": {
    "id": "64f5a8b7c1234567890abcef",
    "resume_id": "64f5a8b7c1234567890abcee",
    "status": "completed",
    "extracted_data": {
      "personal_info": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-0123"
      },
      "skills": {
        "technical": ["Python", "React", "Machine Learning", "Docker"],
        "soft": ["Leadership", "Communication", "Problem Solving"],
        "confidence_scores": {
          "Python": 0.95,
          "React": 0.85,
          "Machine Learning": 0.78
        }
      },
      "experience": [
        {
          "company": "Tech Startup Inc.",
          "position": "Software Engineer Intern",
          "duration": "Jun 2023 - Aug 2023",
          "description": "Developed web applications using React and Node.js"
        }
      ],
      "education": [
        {
          "institution": "MIT",
          "degree": "Bachelor of Science in Computer Science",
          "duration": "2021 - 2025",
          "gpa": "3.8/4.0"
        }
      ],
      "projects": [
        {
          "name": "AI Chatbot",
          "description": "Built a customer service chatbot using NLP",
          "technologies": ["Python", "TensorFlow", "Flask"]
        }
      ]
    },
    "insights": {
      "strengths": [
        "Strong technical foundation in AI/ML",
        "Full-stack development experience",
        "Academic excellence"
      ],
      "recommendations": [
        "Consider adding cloud platform experience (AWS, GCP)",
        "Highlight leadership experiences",
        "Include quantifiable achievements"
      ],
      "hackathon_suitability": {
        "score": 85,
        "preferred_roles": ["Full-stack Developer", "ML Engineer"],
        "suitable_themes": ["AI/ML", "Web Development", "Data Science"]
      }
    },
    "processed_at": "2024-03-10T16:55:00Z"
  }
}
```

---

## Error Handling

All API endpoints follow consistent error response format:

**Error Response Structure:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "timestamp": "2024-03-10T16:00:00Z",
    "request_id": "req_64f5a8b7c1234567890abcf0"
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (business logic errors)
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error

**Error Codes:**
- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `DUPLICATE_RESOURCE` - Resource already exists
- `BUSINESS_LOGIC_ERROR` - Business rule violation
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `EXTERNAL_SERVICE_ERROR` - External API failure
- `DATABASE_ERROR` - Database operation failed

---

## Rate Limiting

API endpoints are rate limited to ensure fair usage:

**Rate Limits:**
- **Authenticated users**: 1000 requests/hour
- **Anonymous users**: 100 requests/hour
- **File uploads**: 10 requests/hour
- **AI copilot**: 50 requests/hour

**Rate Limit Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1710086686
```

**Rate Limit Exceeded Response:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retry_after": 3600,
    "timestamp": "2024-03-10T16:00:00Z"
  }
}
```

---

## Example Usage

**Authentication Flow:**
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "full_name": "John Doe",
    "user_type": "student",
    "skills": ["Python", "React"]
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'

# Use token for authenticated requests
curl -X GET http://localhost:5000/api/hackathons \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Complete Hackathon Participation Flow:**
```bash
# 1. Search hackathons
curl -X GET "http://localhost:5000/api/hackathons?search=AI&status=upcoming"

# 2. Get hackathon details
curl -X GET http://localhost:5000/api/hackathons/64f5a8b7c1234567890abcdf

# 3. Register for hackathon
curl -X POST http://localhost:5000/api/hackathons/64f5a8b7c1234567890abcdf/register \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"team_name": "AI Innovators", "looking_for_teammates": true}'

# 4. Find teammates
curl -X GET "http://localhost:5000/api/teammates?hackathon_id=64f5a8b7c1234567890abcdf&skills=python,ml" \
  -H "Authorization: Bearer <token>"

# 5. Send team invitation
curl -X POST http://localhost:5000/api/invites \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "hackathon_id": "64f5a8b7c1234567890abcdf",
    "invitee_id": "64f5a8b7c1234567890abce2",
    "team_name": "AI Innovators",
    "message": "Join our team!"
  }'
```

---

## WebSocket Events (Future Implementation)

For real-time features like chat and notifications:

**Connection:**
```javascript
const socket = io('ws://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});
```

**Chat Events:**
```javascript
// Join team room
socket.emit('join_team', { team_id: '64f5a8b7c1234567890abce4' });

// Send message
socket.emit('send_message', {
  team_id: '64f5a8b7c1234567890abce4',
  content: 'Hello team!'
});

// Receive messages
socket.on('new_message', (data) => {
  console.log('New message:', data);
});
