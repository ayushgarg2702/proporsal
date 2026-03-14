# 💌 Ayush → Palak Date Proposal Website

A fun, romantic, corporate-themed website where Ayush asks Palak Jain on a first date.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## EmailJS Setup (Free Email Tracking)

Every YES / NO click sends you an email notification.

### Step 1 — Create free account
Go to https://www.emailjs.com and sign up.

### Step 2 — Add email service
- Dashboard → Email Services → Add New Service
- Choose Gmail (or your provider)
- Copy the **Service ID**

### Step 3 — Create email template
- Dashboard → Email Templates → Create New Template
- Subject: `Palak clicked {{button}} on the date proposal`
- Body:
  ```
  Button Clicked: {{button}}
  Time: {{time}}
  Browser: {{browser}}
  ```
- Copy the **Template ID**

### Step 4 — Get your Public Key
- Dashboard → Account → General → Public Key

### Step 5 — Create .env file
```bash
cp .env.example .env
```
Then fill in your values:
```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxx
```

> The site works without EmailJS — it just won't send emails. All animations and interactions work regardless.

---

## Deploy for Free on Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project directory)
vercel

# Follow the prompts — it auto-detects Vite
# Add your env variables in Vercel dashboard under Settings → Environment Variables
```

Your site will be live at something like:
```
https://ayush-palaks-date.vercel.app
```

### Alternative: Netlify

```bash
npm run build
# Drag the dist/ folder to https://app.netlify.com/drop
```

---

## Project Structure

```
src/
├── App.jsx                  # Page router (landing → contract → question → celebration)
├── App.css                  # Global styles, design tokens, animations
├── main.jsx                 # React entry point
├── components/
│   ├── LandingPage.jsx      # "Hi Palak 👋" intro screen
│   ├── LegalContract.jsx    # Fun fake legal agreement page
│   ├── QuestionPage.jsx     # YES / NO buttons + NO avoidance logic
│   ├── CelebrationPage.jsx  # Confetti explosion + meeting agenda
│   └── FloatingHearts.jsx   # Background floating hearts animation
└── utils/
    └── emailService.js      # EmailJS integration
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + React | Frontend framework |
| Framer Motion | Animations & transitions |
| canvas-confetti | Celebration confetti burst |
| @emailjs/browser | Free email notifications |
| Google Fonts | Playfair Display + Inter |

---

## Features

- **4-page flow**: Landing → Legal Contract → Question → Celebration
- **NO button avoidance**: Moves to random corners, cursor avoidance on hover
- **YES grows**: Gets bigger with each NO click (+5% per click, up to 1.6x)
- **Funny popups**: 10 rotating rejection messages
- **Warning banners**: After 5 and 10 NO clicks
- **Confetti explosion**: On YES click
- **Email tracking**: Every click notifies you via EmailJS
- **Fully responsive**: Works on mobile
- **Glass morphism**: Blurred card UI with pastel gradients
