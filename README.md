LimitLoop – Reclaim Your Time

**LimitLoop** is a lightweight, privacy-first Progressive Web App (PWA) built to help you track, manage, and reduce time spent on addictive social media platforms. It encourages mindful digital habits to support greater focus, self-control, and well-being.

---

✨ Features at a Glance

* 📊 **Track Usage Across Platforms**
  Monitor time spent on Instagram, YouTube, TikTok, Facebook, Twitter, and Snapchat.

* ⏱️ **Live Session Tracking**
  See real-time usage with automatic time logs and session details.

* 🎯 **Set Daily Goals**
  Define personal limits and track your progress throughout the day.

* 📈 **Insightful Reports**
  Get clear summaries, trends, and usage breakdowns to reflect on your habits.

* 🌐 **Offline-First Experience**
  Fully functional without internet — your data stays private and local.

* 📦 **Installable Anywhere**
  Works like a native app on Android, iOS, and desktop via PWA installation.

---

## 🚀 Get Started

### 🔧 Requirements

* Any modern browser with PWA support (Chrome, Edge, Safari, Brave, Firefox).
* *(Optional)* A local or hosted web server for advanced features.

---

### ⚙️ Run Locally

#### Method 1: No Hosting Needed

1. Rename the file: `limitloop(beta).pwa` → `index.html`
2. Double-click or open it via a browser that supports file access.

#### Method 2: Serve Locally with Python

```bash
python -m http.server 8080
```

Then visit: `http://localhost:8080` in your browser.

---

### 🌍 Host the App (Optional)

1. Upload the following files to your hosting service:

```
/limitloop/
├── index.html
├── manifest.json
├── sw.js
├── icons/
│   ├── icon-16.png
│   ├── icon-192.png
│   └── icon-512.png
```

2. Open the app via your hosted URL and optionally install it to your home screen.

---

## 💡 How It Works

1. **Pick a Platform** to track.
2. Tap **“Start Session”** to begin.
3. View **live tracking** of how long you've been active.
4. Check **analytics and breakdowns** in the dashboard.
5. Use **goal-setting** to define daily limits.

---

## 🛠 Tech Overview

* **Frontend:** React (via CDN), TailwindCSS
* **Storage:** LocalStorage (secure and offline)
* **PWA:** Manifest + Service Worker for installability & offline support

---

## 📁 Project Structure

```
limitloop/
├── index.html          # Main app entry point
├── manifest.json       # PWA configuration
├── sw.js               # Offline service worker
├── icons/              # App icons in multiple sizes
└── README.md           # Project documentation
```

---

## 🤝 Contributing

We welcome thoughtful contributions!

1. Fork this repository.
2. Create a new feature/fix branch.
3. Submit a Pull Request with your proposed changes.

---

## 🔐 Privacy First

* **Local-Only Data:** No internet syncing. All activity is stored on your device.
* **Zero Tracking:** We do not collect or send data to any server.

---

## 📜 License

Licensed under the **MIT License**. Feel free to use, modify, and distribute.

---

## 🙏 Acknowledgements

Built with the intention of helping individuals break free from digital loops and take back control of their attention. Thanks to the open-source community and everyone building a better digital future.
