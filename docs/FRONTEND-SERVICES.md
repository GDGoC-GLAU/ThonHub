
### **1️⃣ `SERVICES.md`**


# 🛡️ Auth Service (`auth.js`)

## Overview
The `auth.js` service handles all **authentication-related operations** for the frontend.  
It communicates with the backend API to **register, login, logout, and fetch the current user**.



## Functions

### 1. `registerUser(userData)`
**Description**: Registers a new user.  
**Params**:  
- `userData` (object): `{ name, email, password }`  
**Returns**: Registered user data.  
**Example**:
```javascript
import { registerUser } from '../services/auth';

const userData = { name: 'John', email: 'john@example.com', password: '123456' };
registerUser(userData)
  .then(user => console.log(user))
  .catch(err => console.error(err));
````

---

### 2. `loginUser(credentials)`

**Description**: Logs in a user and stores JWT token in `localStorage`.
**Params**:

* `credentials` (object): `{ email, password }`
  **Returns**: User data with token.
  **Example**:

```javascript
import { loginUser } from '../services/auth';

const credentials = { email: 'john@example.com', password: '123456' };
loginUser(credentials).then(data => console.log(data));
```

---

### 3. `logoutUser()`

**Description**: Logs out the user by removing token from `localStorage`.
**Params**: None
**Returns**: None
**Example**:

```javascript
import { logoutUser } from '../services/auth';

logoutUser();
```

---

### 4. `getCurrentUser()`

**Description**: Fetches current logged-in user using the token from `localStorage`.
**Params**: None
**Returns**: User data or `null` if not logged in.
**Example**:

```javascript
import { getCurrentUser } from '../services/auth';

getCurrentUser().then(user => console.log(user));
```

---

## Notes

* API URL is taken from `REACT_APP_API_URL` environment variable.
* JWT token is stored in `localStorage` and automatically used for authenticated requests.





### **2️⃣ `API.md`**

# 🌐 API Service (`api.js`)

## Overview
The `api.js` service handles **all frontend API calls**.  
It uses Axios to make requests to the backend and automatically attaches the JWT token from `localStorage`.

---

## Functions

### 1. `fetchHackathons()`
**Description**: Fetches all hackathons from backend.  
**Params**: None  
**Returns**: Array of hackathon objects.  
**Example**:
```javascript
import { fetchHackathons } from '../services/api';

fetchHackathons().then(hackathons => console.log(hackathons));
````

---

### 2. `fetchHackathonDetails(hackathonId)`

**Description**: Fetches detailed info of a hackathon by ID.
**Params**:

* `hackathonId` (string)
  **Returns**: Hackathon object
  **Example**:

```javascript
import { fetchHackathonDetails } from '../services/api';

fetchHackathonDetails('abc123').then(details => console.log(details));
```

---

### 3. `createTeam(teamData)`

**Description**: Creates a new team for a hackathon.
**Params**:

* `teamData` (object) `{ hackathonId, members }`
  **Returns**: Created team object
  **Example**:

```javascript
import { createTeam } from '../services/api';

createTeam({ hackathonId: 'abc123', members: ['user1', 'user2'] });
```

---

### 4. `searchUsers(query)`

**Description**: Searches for users or teammates.
**Params**:

* `query` (string) search term
  **Returns**: Array of users matching query
  **Example**:

```javascript
import { searchUsers } from '../services/api';

searchUsers('John').then(users => console.log(users));
```

---

## Notes

* All requests automatically include **JWT token** if present.
* API base URL is taken from `REACT_APP_API_URL` environment variable.
* Use these functions in components for clean separation of API logic.



