
<h1 align="center">🤖 AI Mock Interview Platform</h1>
<p align="center">
  <strong>Practice job interviews with a real-time Voice AI agent — get instant, structured feedback powered by Google Gemini.</strong>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Firebase-11-orange?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Vapi-Voice_AI-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Pro-4285F4?style=for-the-badge&logo=google" />
</p>

📌 About The Project

**AI Mock Interview** is a full-stack web application that lets users practice job interviews with a real-time **Voice AI agent**. Instead of practicing alone or paying for mock interview services, users can have a natural voice conversation with an AI interviewer that asks relevant questions based on their target role and tech stack.
After every interview, the full conversation transcript is analyzed by **Google Gemini 2.5 Pro**, which generates detailed, structured feedback — scoring the candidate across 5 professional categories.
> **The problem it solves:** Most people don't have access to a real interviewer to practice with before their actual job interview. This platform bridges that gap with AI.
>

## ✨ Features
- 🎙️ **Real-time Voice Interview** — Talk to an AI interviewer just like a real interview
- 🧠 **GPT-4 Powered Brain** — The AI asks intelligent follow-up questions and listens actively
- 🔊 **Human-like Voice** — ElevenLabs TTS makes the AI sound natural and professional
- 👂 **Live Transcription** — Deepgram Nova-2 converts your speech to text in real time
- 📊 **AI Feedback** — Google Gemini 2.5 Pro scores you across 5 categories after every session
- 👥 **Community Interviews** — Take interviews created by other users on the platform
- 🔐 **Secure Auth** — Firebase session-cookie authentication (httpOnly, secure)
- ⚡ **Fast Dashboard** — Server-side parallel data fetching with `Promise.all()`
- 📱 **Responsive Design** — Works seamlessly on all screen sizes
---
## 🛠️ Tech Stack
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>⚡ <strong>Framework</strong></td><td>Next.js 15 (App Router + Turbopack)</td></tr>
    <tr><td>🔷 <strong>Language</strong></td><td>TypeScript 5</td></tr>
    <tr><td>🎨 <strong>Styling</strong></td><td>Tailwind CSS v4 + shadcn/ui</td></tr>
    <tr><td>🔐 <strong>Authentication</strong></td><td>Firebase Auth + Admin SDK (Session Cookies)</td></tr>
    <tr><td>🗄️ <strong>Database</strong></td><td>Firebase Firestore (NoSQL)</td></tr>
    <tr><td>🎙️ <strong>Voice AI</strong></td><td>Vapi AI</td></tr>
    <tr><td>👂 <strong>Speech-to-Text</strong></td><td>Deepgram Nova-2</td></tr>
    <tr><td>🔊 <strong>Text-to-Speech</strong></td><td>ElevenLabs</td></tr>
    <tr><td>🧠 <strong>LLM — Interviewer</strong></td><td>OpenAI GPT-4 (via Vapi)</td></tr>
    <tr><td>📊 <strong>LLM — Feedback</strong></td><td>Google Gemini 2.5 Pro</td></tr>
    <tr><td>🤖 <strong>AI SDK</strong></td><td>Vercel AI SDK (<code>generateObject</code>)</td></tr>
    <tr><td>✅ <strong>Schema Validation</strong></td><td>Zod</td></tr>
    <tr><td>📝 <strong>Forms</strong></td><td>React Hook Form</td></tr>
    <tr><td>🔔 <strong>Notifications</strong></td><td>Sonner</td></tr>
  </tbody>
</table>

---
## 🏗️ Architecture Overview
```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│         React Client Components + Vapi SDK               │
└─────────────────────┬───────────────────────────────────┘
                      │ Server Actions / HTTP
┌─────────────────────▼───────────────────────────────────┐
│                 NEXT.JS SERVER                           │
│     Server Components + Server Actions + API Routes      │
└──────────┬──────────────────────────┬────────────────────┘
           │                          │
┌──────────▼──────────┐   ┌───────────▼──────────────────┐
│     FIREBASE         │   │      EXTERNAL AI SERVICES     │
│  Auth + Firestore    │   │  Vapi · Gemini · ElevenLabs   │
└─────────────────────┘   └──────────────────────────────┘
```
### How It Works — End to End:
1. **Auth** → User signs up/in via Firebase. An `httpOnly` session cookie is created server-side using the Firebase Admin SDK
2. **Dashboard** → Server Component fetches user's past interviews + community interviews from Firestore in parallel using `Promise.all()`
3. **Start Interview** → Vapi initializes the voice call with GPT-4 as the brain, ElevenLabs as the voice, and Deepgram for transcription
4. **During Interview** → Real-time events (`speech-start`, `message`, `call-end`) are captured via Vapi SDK event listeners in the Agent Client Component
5. **After Interview** → Full transcript is sent to a Server Action → Google Gemini 2.5 Pro analyzes it using `generateObject` with a strict Zod schema → Feedback is saved to Firestore
6. **Feedback Page** → User is redirected to view their scores, strengths, and areas for improvement
---
## 📂 Project Structure
```
ai_mock_interview/
├── app/
│   ├── (auth)/               # Sign-in & Sign-up pages
│   │   ├── sign-In/
│   │   └── sign-Up/
│   ├── (root)/               # Main app (protected)
│   │   ├── page.tsx          # Dashboard
│   │   └── interview/
│   │       ├── page.tsx      # Start interview
│   │       └── [id]/
│   │           ├── page.tsx  # Interview session
│   │           └── feedback/ # Feedback page
│   ├── api/
│   │   └── vapi/             # Vapi webhook endpoint
│   └── globals.css
├── components/
│   ├── Agent.tsx             # Voice interview UI (Client Component)
│   ├── InterviewCard.tsx     # Interview card component
│   ├── authForm.tsx          # Auth form component
│   ├── FormField.tsx         # Reusable form field
│   ├── DisplayTechIcons.tsx  # Tech stack icons
│   └── ui/                  # shadcn/ui components
├── firebase/
│   ├── client.ts             # Firebase Client SDK
│   └── admin.ts              # Firebase Admin SDK
├── lib/
│   ├── actions/
│   │   ├── auth.action.ts    # Auth Server Actions
│   │   └── general.actions.ts # Interview & Feedback Server Actions
│   ├── utils.ts              # Utility functions
│   └── vapi.sdk.ts           # Vapi SDK initialization
├── constants/
│   └── index.ts              # Interviewer config, schemas, mappings
└── types/
    └── index.d.ts            # Global TypeScript types
```
---
## 🚀 Getting Started
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Firebase](https://firebase.google.com/) project
- A [Vapi](https://vapi.ai/) account
- A [Google AI Studio](https://aistudio.google.com/) API key
### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai_mock_interview.git
   cd ai_mock_interview
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Client
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   # Firebase Admin (Server)
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY=your_private_key
   # Vapi
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
   # Google Gemini
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```
4. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Authentication** (Email/Password provider)
   - Create a **Firestore Database**
   - Generate a **Service Account Key** for the Admin SDK
5. **Set up Vapi**
   - Create an account at [vapi.ai](https://vapi.ai)
   - Create a workflow for interview question generation
   - Copy your Web Token and Workflow ID
6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
---
## 📊 AI Feedback CategoriesAfter each interview, **Google Gemini 2.5 Pro** analyzes the full transcript and scores you on:
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>What's Evaluated</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🗣️ <strong>Communication Skills</strong></td>
      <td>Clarity, articulation, and structured responses</td>
    </tr>
    <tr>
      <td>💡 <strong>Technical Knowledge</strong></td>
      <td>Understanding of key concepts relevant to the role</td>
    </tr>
    <tr>
      <td>🧩 <strong>Problem Solving</strong></td>
      <td>Ability to analyze problems and propose solutions</td>
    </tr>
    <tr>
      <td>🤝 <strong>Cultural &amp; Role Fit</strong></td>
      <td>Alignment with company values and job expectations</td>
    </tr>
    <tr>
      <td>💪 <strong>Confidence &amp; Clarity</strong></td>
      <td>Confidence in responses, engagement, and delivery</td>
    </tr>
  </tbody>
</table>

> Each category gets a **score out of 100**, along with specific comments, identified strengths, and actionable areas for improvement.

---
## 🔐 Security Highlights
- **httpOnly Session Cookies** — JWT tokens are never stored in `localStorage`. Session cookies are inaccessible to JavaScript, protecting against XSS attacks.
- **Firebase Admin SDK on Server Only** — All privileged Firebase operations run exclusively in Server Actions, never exposed to the client.
- **Secure Cookie Flags** — `secure: true` in production (HTTPS only), `sameSite: 'lax'` for CSRF protection.
- **Environment Variables** — All API keys are stored server-side and never shipped to the browser.
---
## 🌐 Key Pages & Routes
<table>
  <thead>
    <tr>
      <th>Route</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>/</code></td><td>🏠 Dashboard — your past interviews + community interviews</td></tr>
    <tr><td><code>/sign-in</code></td><td>🔑 Sign in page</td></tr>
    <tr><td><code>/sign-up</code></td><td>📝 Sign up / Register page</td></tr>
    <tr><td><code>/interview</code></td><td>🚀 Start a new AI interview</td></tr>
    <tr><td><code>/interview/[id]</code></td><td>🎙️ Live interview session with the voice AI agent</td></tr>
    <tr><td><code>/interview/[id]/feedback</code></td><td>📊 View AI-generated scores and detailed feedback</td></tr>
  </tbody>
</table>

---
## 🤝 Contributing
Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---
## 📄 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
---
## 👤 Author
Built with ❤️ by **[Himanshu Tiwari](https://github.com/himanshu-tiwari123)**
---
<p align="center">
  ⭐ If you found this project helpful, please give it a star!
</p>
