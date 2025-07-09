# 🚀 Affordmed URL Shortener

A responsive, client-side URL Shortener web app built with **React** and **Material UI**. Built for the Affordmed Campus Hiring Evaluation, this app allows users to shorten multiple URLs with optional validity and custom shortcodes, and provides session-based click analytics.

---

## 📸 Screenshot

> Add a real screenshot of your working homepage here  
Example placeholder:

![Homepage Screenshot](https://via.placeholder.com/800x400?text=Affordmed+URL+Shortener+Homepage)

---

## 📋 Features

- 🔗 Shorten up to **5 URLs** concurrently
- ✏️ Support for **custom shortcodes** and **validity periods**
- ⏳ Default validity set to **30 minutes** if not specified
- 🔄 Real-time **redirect handling** from client-side routing
- 📊 **Click analytics**: timestamp, source, and location (dummy)
- 💾 Persistent session storage using `localStorage`
- 🧩 **Custom logging middleware** (no `console.log`)
- 🎨 Fully styled using **Material UI**

---

## 🧰 Tech Stack

- React 19
- Material UI 7
- React Router 7
- UUID for logging keys
- Browser `localStorage`
- Custom middleware for activity logging

---

## 🗂️ Project Structure

affordmed-url-shortener/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── HomePage.jsx
│ │ ├── StatsPage.jsx
│ │ └── RedirectPage.jsx
│ ├── utils/
│ │ ├── logger.js
│ │ └── helpers.js
│ ├── App.jsx
│ ├── index.js
│ └── styles.css
├── package.json
└── README.md


## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/affordmed-url-shortener.git
   cd affordmed-url-shortener