# CloudBoard ☁️

CloudBoard is a session-based whiteboard application that allows users to create and join interactive drawing boards. It provides a simple and intuitive interface for users to draw and manage boards.

---

## 🚀 Features

* 🖊 Create and join whiteboard sessions
* 🎨 Interactive drawing tools
* 👤 User authentication (Login / Signup)
* 📊 Dashboard to manage boards
* ⚡ Smooth and responsive UI

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## 📂 Project Structure

```
cloudboard/
│── BACKEND/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
│── FRONTEND/
│   ├── src/
│   ├── components/
│   └── App.js
│
│── package.json
│── .gitignore
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Snehaa-jain/cloudboard.git
```

---

### 2️⃣ Install dependencies

#### Backend

```
cd BACKEND
npm install
```

#### Frontend

```
cd FRONTEND
npm install
```

---

### 3️⃣ Run the project

#### Start Backend

```
cd BACKEND
node index.js
```

#### Start Frontend

```
cd FRONTEND
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the BACKEND folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📌 Future Improvements

* Add real-time collaboration using WebSockets
* Implement undo/redo functionality
* Save and export whiteboards
* Deploy application (Vercel + Render)

---

## 👩‍💻 Author

Sneha Jain
