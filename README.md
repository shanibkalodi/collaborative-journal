# Collaborative Journal

A **full-stack blogging application** built with **Django (REST API)** and **React (SPA frontend)**.  
Users can **read posts publicly**, **register/login**, **create, edit, and delete their own posts**, and **comment on posts**.  

This project was developed as a technical assessment for a **Full-Stack Developer Internship**.

---

## 🌟 Features

### Public Access
- View all blog posts without logging in.
- Click on a post to read its full content and comments.

### User Authentication
- Sign up for a new account.
- Log in and log out.

### Content Creation & Management
- Logged-in users can create new posts (title + content).
- Users can **edit or delete only their own posts**.
- Edit/Delete buttons appear only for posts authored by the user.

### Engagement
- Logged-in users can add comments to any post.
- View comments from other users.

---

## 💻 Technology Stack

### Backend
- **Django** (Python)
- **Django REST Framework (DRF)** for API endpoints
- **SQLite** database
- **django-cors-headers** for handling CORS

### Frontend
- **React.js** (Single Page Application)
- **Axios** for API requests
- **Bootstrap 5** for responsive design
- **React Hooks** (`useState`, `useEffect`) for state management

---

## 📁 Project Structure

collaborative-journal/
│
├─ backend/ # Django project
│ ├─ backend/ # Django settings
│ ├─ blog/ # Blog app (models, serializers, views)
│ └─ manage.py
│
├─ frontend/ # React frontend
│ ├─ src/ # Components, API calls, styles
│ ├─ public/ # HTML and static assets
│ └─ package.json
│
├─ venv/ # Python virtual environment (ignored in Git)
└─ README.md

---

## ⚙️ Setup Instructions

### Backend (Django)
1. Navigate to backend folder:

```bash
cd backend
Create and activate a virtual environment:
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
Install dependencies:
pip install -r requirements.txt
Apply migrations:
python manage.py migrate
Run the server:
python manage.py runserver
The backend will run at: http://127.0.0.1:8000/

Frontend (React)
Navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Start the React development server:

npm start
The frontend will run at: http://localhost:3000/

Make sure the backend server is running to fetch API data.

🔗 API Endpoints (via DRF)
POST /api/auth/register/ → Register a new user

POST /api/auth/login/ → Log in (returns token)

GET /api/posts/ → List all posts

POST /api/posts/ → Create a new post (authenticated)

PUT /api/posts/<id>/ → Edit a post (author only)

DELETE /api/posts/<id>/ → Delete a post (author only)

POST /api/comments/ → Add a comment (authenticated)

🛠 Production Setup (Optional)
To run the site without starting the React dev server:

Build the React app:

cd frontend
npm run build
Serve the build using Django (optional: configure STATICFILES_DIRS and collectstatic)

Now, the app runs as a single Django-hosted site.



✅ Notes
Only authenticated users can create posts or comment.

Users see Edit/Delete buttons only on their own posts.

Public users can view posts and comments.

CORS is handled via django-cors-headers to allow React frontend to connect.

---

?
