# 🌍 Disaster Management System

A full-stack **Disaster Management System** designed to help users monitor disaster-related information, access essential resources, receive alerts, and report emergencies through a centralized web application.

The system focuses on providing useful information during situations such as **floods, landslides, cloudbursts, avalanches, and other natural disasters**.

## 🚀 Features

* 🌦️ **Weather Information** – Displays weather updates using a weather API.
* 🚨 **Disaster Alerts** – Provides alerts and emergency notifications.
* 📍 **Disaster Reporting** – Allows users to report disaster-related incidents.
* 🗺️ **Satellite Map** – Provides map-based visualization for disaster monitoring.
* 🆘 **Emergency Resources** – Displays important resources and assistance information.
* 📋 **Resource Management** – Backend APIs for managing disaster-related resources.
* 🔊 **Alert Siren** – Audio notification for important alerts.
* 📱 **Responsive UI** – Designed to work across desktop and mobile screen sizes.
* 🔗 **REST APIs** – Frontend communicates with the backend through RESTful APIs.

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Vite
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs

### APIs & Services

* Weather API
* Map / Satellite Map services

### Tools

* Git
* GitHub
* VS Code
* Postman

## 📁 Project Structure

```text
disaster-management/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── AlertSiren.jsx
│       │   ├── Navbar.jsx
│       │   ├── ResourceList.jsx
│       │   ├── SatelliteMap.jsx
│       │   └── WeatherWidget.jsx
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── Report.jsx
│       │   └── ResourcePage.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd disaster-management
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
WEATHER_API_KEY=your_weather_api_key
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔐 Environment Variables

Do not commit your `.env` file or API keys to GitHub.

Example:

```env
MONGO_URI=your_mongodb_connection_string
WEATHER_API_KEY=your_weather_api_key
```

Make sure `.env` is included in `.gitignore`:

```gitignore
node_modules/
.env
*.env
dist/
```

## 🔄 How It Works

```text
                ┌──────────────────┐
                │     User         │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ React Frontend   │
                │   + Tailwind     │
                └────────┬─────────┘
                         │
                    REST APIs
                         │
                         ▼
                ┌──────────────────┐
                │ Node + Express   │
                │     Backend      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     MongoDB      │
                └──────────────────┘

External Services:
   ├── Weather API
   └── Map / Satellite Services
```

## 🎯 Use Cases

The application can be useful for:

* Monitoring weather conditions.
* Viewing disaster-related information.
* Reporting incidents.
* Finding emergency resources.
* Accessing disaster assistance information.
* Visualizing locations through maps.
* Receiving important alerts and notifications.

## 🔮 Future Improvements

* 🤖 AI-powered disaster prediction and risk analysis.
* 📡 Real-time disaster data integration.
* 🛰️ Advanced satellite imagery analysis.
* 📱 Progressive Web App / mobile support.
* 🌐 Multi-language support including regional languages.
* 📍 Location-based emergency notifications.
* 👨‍🚒 Integration with emergency response organizations.
* 📊 Disaster analytics and visualization dashboard.

## 👨‍💻 Author

**Mahesh Singh Pawar**

B.Tech Computer Science Engineering
Shivalik College of Engineering, Dehradun

---

⭐ If you find this project useful, consider giving it a star!
