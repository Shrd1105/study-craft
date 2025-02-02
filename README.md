# Mind Mentor: AI-Powered Study Assistant 🧠

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Integration](#api-integration)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## Overview

Mind Mentor is an intelligent study companion that leverages AI to transform the learning experience. It combines personalized study planning, resource curation, and interactive assistance to help students achieve their academic goals efficiently.

## Features

### 1. Personalized Study Plans 📚
- Dynamic plan generation based on subject and exam date
- Weekly and daily task breakdown
- Progress tracking and adjustable schedules
- Smart recommendations based on learning patterns
- Visual calendar integration for session tracking

### 2. AI-Powered Resource Curation 🔍
- Intelligent filtering of educational resources
- Support for multiple content types:
  - Online courses
  - Video tutorials
  - Documentation
  - Interactive exercises
  - Academic papers
- Quality scoring and relevance ranking

### 3. Productivity Tools ⚡
- **Pomodoro Timer**
- **Smart Notes System**

### 4. User Experience 🎯
- Clean, intuitive interface
- Responsive design
- Progress visualization
- Resource bookmarking
- Cross-device synchronization

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Shadcn UI
- **State Management**: Zustand
- **Authentication**: NextAuth.js

### Backend
- **API Routes**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **AI Services**:
  - Google Generative AI (Gemini Pro)
  - Tavily API for resource curation
- **Authentication**: JWT with NextAuth.js


## Architecture

```
mind-mentor/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── (marketing)/    # Public marketing pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/               # Utility functions and configs
│   ├── models/            # MongoDB schemas
│   └── types/             # TypeScript type definitions
├── public/                # Static assets

```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/KartikLabhshetwar/mind-mentor
cd mind-mentor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Environment Setup

Create a `.env.local` file with the following variables:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Database
MONGODB_URI=your-mongodb-uri

# AI Services
GOOGLE_API_KEY=your-gemini-api-key
TAVILY_API_KEY=your-tavily-api-key

# Optional Services
GROQ_API_KEY=your-groq-api-key
```

## API Integration

### Google Generative AI (Gemini)
Used for:
- Study plan generation
- Resource description enhancement
- Learning path recommendations

### Tavily API
Used for:
- Educational resource curation
- Content relevance scoring
- Resource metadata extraction

## Usage Guide

### Study Plan Generation
1. Navigate to the study plan section
2. Enter your subject and exam date
3. Click "Generate Plan"
4. View and customize your personalized study schedule

### Pomodoro Timer
1. A 25 minute timer work/break duration
2. Start your study session
3. Follow the timer prompts for breaks
4. View your session history and statistics
5. Adjust intervals based on productivity patterns

### Notes Management
1. Create new notes with rich text formatting
2. Organize notes by subjects/topics
3. Use the search function to find specific content
4. Export notes in various formats
5. Access your notes across devices

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with 💡 by Kartik Labhshetwar
