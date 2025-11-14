# Hebrew AI - Quick Start Guide

Get your Hebrew AI learning platform up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Get API Keys

You'll need accounts and API keys from these services:

1. **OpenAI** (https://platform.openai.com)
   - Create account → API Keys → Create new key
   - Needed for: AI tutor, embeddings, TTS

2. **Clerk** (https://clerk.com)
   - Create application → Choose "Email & Password"
   - Copy: Publishable Key and Secret Key
   - Needed for: Authentication

3. **NeonDB** (https://neon.tech) OR use local PostgreSQL
   - Create project → Copy connection string
   - Needed for: User data, lessons, progress

4. **Pinecone** (https://pinecone.io)
   - Create index: Name: `hebrew-ai`, Dimensions: `1536`, Metric: `cosine`
   - Copy: API Key and Environment
   - Needed for: RAG (contextual learning)

5. **Upstash Redis** (https://upstash.com) OR use local Redis
   - Create database → Copy Redis URL
   - Needed for: Caching, sessions

### Step 2: Clone and Setup

```bash
# Clone the project
cd hebrew-ai-app

# Setup Frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Clerk keys

# Setup Backend
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with all your API keys
```

### Step 3: Initialize Database

```bash
# In backend directory with venv activated
prisma generate
prisma db push

# Optional: Seed with sample lessons
python scripts/seed_lessons.py
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m app.main
# Backend will run on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:3000
```

### Step 5: Test It Out!

1. Go to http://localhost:3000
2. Click "Get Started" to create an account
3. Complete sign-up with Clerk
4. Start your first Hebrew lesson!

## 🐳 Docker Setup (Alternative)

If you prefer Docker:

```bash
# Create .env file in root with all API keys
cp .env.example .env
# Edit .env with your keys

# Start all services
docker-compose up -d

# Initialize database
docker-compose exec backend prisma db push
docker-compose exec backend python scripts/seed_lessons.py

# Frontend (run separately for hot reload)
cd frontend
npm run dev
```

## 🔧 Configuration Checklist

Before running, make sure you have:

### Frontend (.env.local)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_API_URL` (http://localhost:8000)

### Backend (.env)
- [ ] `DATABASE_URL` (NeonDB or local PostgreSQL)
- [ ] `OPENAI_API_KEY`
- [ ] `PINECONE_API_KEY`
- [ ] `PINECONE_ENVIRONMENT`
- [ ] `PINECONE_INDEX_NAME`
- [ ] `REDIS_URL` (Upstash or local Redis)
- [ ] `CLERK_SECRET_KEY`

## 📝 Minimal Configuration (For Testing)

If you just want to test the app quickly:

1. **Required Services:**
   - OpenAI API (for AI features)
   - Clerk (for auth)
   - Local PostgreSQL (easier than NeonDB for testing)
   - Local Redis (easier than Upstash for testing)

2. **Optional Services (can skip for initial testing):**
   - Pinecone (RAG will be disabled, but AI tutor still works)
   - Upstash Redis (use local Redis instead)

## 🎯 Next Steps

Once your app is running:

1. **Create Lessons:** Use the lesson generation API or add them manually
2. **Setup Stripe:** Configure in Clerk for subscription payments
3. **Test AI Tutor:** Start a conversation in any lesson
4. **Configure Speech:** Test Hebrew text-to-speech
5. **Track Progress:** Complete lessons to earn XP and track streaks

## 🆘 Common Issues

### "Cannot connect to database"
- Check your DATABASE_URL is correct
- Ensure PostgreSQL is running (if local)
- Run `prisma db push` to create tables

### "OpenAI API error"
- Verify your API key is correct
- Check you have credits in your OpenAI account
- Ensure no extra spaces in .env file

### "Clerk authentication failing"
- Verify both publishable and secret keys are correct
- Check keys are in the right environment files
- Ensure Clerk application is set to "Development" mode

### "Pinecone index not found"
- Create index with exact name: `hebrew-ai`
- Dimensions must be: `1536`
- Metric must be: `cosine`

### "CORS errors"
- Check CORS_ORIGINS in backend .env includes frontend URL
- Ensure frontend is using correct API_URL

## 📚 Resources

- [Full Documentation](README.md)
- [API Documentation](http://localhost:8000/docs) (when backend is running)
- [Clerk Documentation](https://clerk.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Prisma Documentation](https://prisma.io/docs)

## 💡 Tips

- Start with local PostgreSQL and Redis for easier development
- Use Docker Compose for consistent development environment
- Check backend logs for detailed error messages: http://localhost:8000/docs
- Frontend errors appear in browser console (F12)

---

Need help? Open an issue on GitHub or check the full README for detailed documentation.
