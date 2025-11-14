# Hebrew AI - AI-Powered Hebrew Learning Platform

A comprehensive Hebrew language learning platform powered by AI, featuring personalized lessons, RAG-based contextual learning, and interactive speech practice.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Beautiful component library
- **Clerk** - Authentication and user management

### Backend
- **FastAPI** - Modern Python API framework
- **OpenAI GPT-4** - AI tutor and content generation
- **OpenAI Embeddings** - Semantic search and RAG
- **Prisma** - Type-safe database ORM
- **Pinecone** - Vector database for RAG
- **Upstash Redis** - Caching and session management
- **NeonDB** - Serverless PostgreSQL

## 📋 Features

- ✅ **AI Hebrew Tutor** - Personalized conversations with GPT-4
- ✅ **RAG-based Learning** - Contextual responses using vector search
- ✅ **Structured Curriculum** - A1 to B1 CEFR-aligned lessons
- ✅ **Speech Practice** - Text-to-speech with Hebrew pronunciation
- ✅ **Progress Tracking** - XP points, streaks, and detailed analytics
- ✅ **Subscription Management** - $30/month premium access with Clerk + Stripe
- ✅ **Responsive Design** - Beautiful UI inspired by Babbel

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL (or NeonDB account)
- Pinecone account
- Upstash Redis account
- OpenAI API key
- Clerk account

### 1. Clone and Setup Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:
```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Stripe (via Clerk)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_MONTHLY_PLAN_PRICE_ID=price_xxxxx
```

Run development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

### 2. Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env`:
```env
# Database (NeonDB or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/hebrewai?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/hebrewai?schema=public"

# OpenAI
OPENAI_API_KEY=sk-xxxxx

# Pinecone
PINECONE_API_KEY=xxxxx
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX_NAME=hebrew-ai

# Upstash Redis
REDIS_URL=redis://default:xxxxx@xxxxx.upstash.io:6379

# Clerk
CLERK_SECRET_KEY=sk_test_xxxxx

# App Settings
API_PORT=8000
API_HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000
```

Initialize database with Prisma:
```bash
# Generate Prisma client
prisma generate

# Run migrations
prisma db push

# Optional: Seed initial data
python scripts/seed_lessons.py
```

Run development server:
```bash
python -m app.main
# Or with uvicorn directly:
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

### 3. Configure External Services

#### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Enable email/password authentication
3. Set up Stripe integration in Clerk for subscriptions
4. Create a $30/month subscription product
5. Copy API keys to `.env.local`

#### NeonDB Setup
1. Create a database at [neon.tech](https://neon.tech)
2. Copy connection string to `.env`

#### Pinecone Setup
1. Create an index at [pinecone.io](https://pinecone.io)
2. Name: `hebrew-ai`
3. Dimensions: `1536` (for text-embedding-3-small)
4. Metric: `cosine`
5. Copy API key and environment to `.env`

#### Upstash Redis Setup
1. Create a database at [upstash.com](https://upstash.com)
2. Copy connection URL to `.env`

#### OpenAI Setup
1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Add to `.env` in backend

## 📁 Project Structure

```
hebrew-ai-app/
├── frontend/
│   ├── app/
│   │   ├── dashboard/          # Student dashboard
│   │   ├── lesson/[id]/        # Interactive lessons
│   │   ├── pricing/            # Subscription page
│   │   ├── layout.tsx          # Root layout with Clerk
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   └── ui/                 # Shadcn components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── api/                # API endpoints
    │   │   ├── chat.py         # AI tutor chat
    │   │   ├── lessons.py      # Lesson management
    │   │   ├── users.py        # User management
    │   │   └── tts.py          # Text-to-speech
    │   ├── core/               # Core configuration
    │   │   ├── config.py       # Settings
    │   │   └── database.py     # Prisma client
    │   ├── services/           # Business logic
    │   │   ├── openai_service.py
    │   │   ├── pinecone_service.py
    │   │   └── redis_service.py
    │   └── main.py             # FastAPI app
    ├── prisma/
    │   └── schema.prisma       # Database schema
    └── requirements.txt
```

## 🎯 Key Features Implementation

### 1. AI Tutor with RAG
The AI tutor uses OpenAI GPT-4 combined with Pinecone vector search to provide contextual responses:
- User queries are embedded using OpenAI embeddings
- Relevant lesson content is retrieved from Pinecone
- Context is injected into GPT-4 prompts for accurate, curriculum-aligned responses

### 2. Progressive Curriculum
Lessons are organized by CEFR levels:
- **A1**: Complete beginner (alphabet, basic greetings, numbers)
- **A2**: Elementary (everyday conversations, basic grammar)
- **B1**: Intermediate (complex sentences, authentic content)

### 3. Speech Practice
- **Text-to-Speech**: OpenAI TTS API generates Hebrew audio
- **Speech-to-Text**: OpenAI Whisper API transcribes Hebrew speech (framework included)
- Real-time pronunciation feedback

### 4. Subscription Management
- Integration with Clerk + Stripe
- $30/month for premium access
- Free trial for first 3 lessons
- Automatic billing and subscription management

## 🔧 API Endpoints

### Chat
- `POST /api/chat` - Send message to AI tutor
- `GET /api/chat/conversation/{id}` - Get conversation history

### Lessons
- `GET /api/lessons` - List all lessons
- `GET /api/lessons/{id}` - Get lesson details
- `POST /api/lessons/{id}/progress` - Update lesson progress
- `POST /api/lessons/generate` - Generate new lesson with AI

### Users
- `POST /api/users` - Create user
- `GET /api/users/{clerk_id}` - Get user info
- `GET /api/users/{clerk_id}/progress` - Get detailed progress
- `POST /api/users/{clerk_id}/subscription` - Update subscription

### Text-to-Speech
- `POST /api/tts` - Generate Hebrew speech
- `POST /api/tts/transcribe` - Transcribe Hebrew audio
- `GET /api/tts/voices` - List available voices

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with auto-scaling

### Database (NeonDB)
- Already serverless, no deployment needed
- Use production connection string

## 🧪 Testing

### Frontend
```bash
npm run lint
npm run build  # Test production build
```

### Backend
```bash
pytest  # After adding tests
```

## 📊 Future Enhancements

- [ ] Spaced repetition system for vocabulary
- [ ] Gamification with achievements and leaderboards
- [ ] Mobile apps (React Native)
- [ ] Live video lessons with tutors
- [ ] Community features (forums, study groups)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (teach other languages)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## 📧 Support

For support, email support@hebrewai.com or join our Discord community.

---

Built with ❤️ using AI technology to make Hebrew learning accessible to everyone.
