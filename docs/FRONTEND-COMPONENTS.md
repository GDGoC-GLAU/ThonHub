
```markdown
# 🖥️ ThonHub Frontend Components

## Overview
The frontend of ThonHub is a **React + Tailwind CSS** application. It provides an interactive interface for students, developers, and organizations to explore and manage hackathons. Components are modular, reusable, and maintainable.

This documentation details the key **components**, their **props**, **methods**, and **usage examples**.

---

## Project Structure (Frontend)
```

frontend/
├── public/           # Static assets (images, favicon)
└── src/
├── components/   # Reusable UI components
├── pages/        # Application pages (routes)
├── hooks/        # Custom React hooks
├── services/     # API and utility services
└── App.jsx       # Main app component





## Components

### 1. `CalendarView.jsx`
**Purpose**: Displays upcoming hackathons in a calendar view.  

**Props**:  
| Prop | Type | Description |
|------|------|-------------|
| `events` | array | List of hackathon events with date and details |

**Methods**:
- `onEventClick(event)`: Opens hackathon details on event click.

**Usage**:
```jsx
<CalendarView events={hackathonEvents} />
````

---

### 2. `ChatBox.jsx`

**Purpose**: Provides a chat interface for AI assistance and user discussion.

**Props**:

| Prop     | Type   | Description              |
| -------- | ------ | ------------------------ |
| `userId` | string | ID of the logged-in user |

**Methods**:

* `sendMessage(msg)`: Sends message to chat backend.
* `receiveMessage()`: Handles incoming messages.

**Usage**:

```jsx
<ChatBox userId="12345" />
```

---

### 3. `HackathonCard.jsx`

**Purpose**: Displays basic hackathon information.

**Props**:

| Prop        | Type   | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| `hackathon` | object | Hackathon details including name, date, location |

**Usage**:

```jsx
<HackathonCard hackathon={hackathonData} />
```

---

### 4. `HackathonDetails.jsx`

**Purpose**: Displays detailed information about a specific hackathon.

**Props**:

| Prop          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `hackathonId` | string | ID of the hackathon to fetch details |

**Usage**:

```jsx
<HackathonDetails hackathonId="abc123" />
```

---

### 5. `NotificationPanel.jsx`

**Purpose**: Shows user notifications related to hackathons, messages, or invites.

**Props**:

| Prop            | Type  | Description           |
| --------------- | ----- | --------------------- |
| `notifications` | array | List of notifications |

**Usage**:

```jsx
<NotificationPanel notifications={userNotifications} />
```

---

### 6. `OrgDashboard.jsx`

**Purpose**: Dashboard for hackathon organizers to manage events.

**Props**:

| Prop    | Type   | Description    |
| ------- | ------ | -------------- |
| `orgId` | string | Organizer's ID |

**Usage**:

```jsx
<OrgDashboard orgId="org123" />
```

---

### 7. `ProfileCard.jsx`

**Purpose**: Shows user profile information and hackathon participation.

**Props**:

| Prop   | Type   | Description                                 |
| ------ | ------ | ------------------------------------------- |
| `user` | object | User details including name, avatar, badges |

**Usage**:

```jsx
<ProfileCard user={userData} />
```

---

### 8. `SearchBar.jsx`

**Purpose**: Provides search functionality for hackathons or teammates.

**Props**:

| Prop       | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| `onSearch` | function | Callback when user submits a search query |

**Usage**:

```jsx
<SearchBar onSearch={handleSearch} />
```

---

### 9. `TeammateFinder.jsx`

**Purpose**: Helps users find potential teammates for hackathons.

**Props**: None (fetches data via backend)

**Methods**:

* `searchTeammates(query)`: Filters users based on skills and experience.
* `sendInvite(userId)`: Sends invitation to teammate.

**Usage**:

```jsx
<TeammateFinder />
```

---

---

## Notes

* Components are styled using **Tailwind CSS** for a responsive and modern UI.
* API calls should be handled using **services** and **hooks**.
* Maintain consistent naming conventions when adding new components.
* Components can be reused across pages with proper props.

---

## Recommended Development Commands

```bash
# Install dependencies
npm install

# Start frontend server
npm start

# Run tests
npm test

# Build production version
npm run build
```

