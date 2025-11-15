from openai import AsyncOpenAI
from typing import List, Dict, Optional
import json

from app.core.config import settings
from app.services.pinecone_service import PineconeService
from app.services.redis_service import RedisService


class OpenAIService:
    def __init__(self):
        try:
            self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        except Exception as e:
            print(f"Warning: Failed to initialize OpenAI client: {e}")
            self.client = None
        self.pinecone = PineconeService()
        self.redis = RedisService()
        self.model = settings.OPENAI_MODEL
        self.embedding_model = settings.EMBEDDING_MODEL

    async def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for text using OpenAI"""
        response = await self.client.embeddings.create(
            model=self.embedding_model, input=text
        )
        return response.data[0].embedding

    async def get_relevant_context(
        self, query: str, lesson_id: Optional[str] = None, top_k: int = 5
    ) -> str:
        """Retrieve relevant context from Pinecone using RAG"""
        # Generate embedding for the query
        query_embedding = await self.generate_embedding(query)

        # Search Pinecone for relevant content
        filter_dict = {"lesson_id": lesson_id} if lesson_id else None
        results = self.pinecone.query(
            query_embedding, top_k=top_k, filter=filter_dict
        )

        # Format context from results
        context_pieces = []
        for match in results.get("matches", []):
            metadata = match.get("metadata", {})
            context_pieces.append(
                f"[{metadata.get('type', 'content')}] {metadata.get('text', '')}"
            )

        return "\n\n".join(context_pieces)

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 1000,
    ) -> Dict[str, str]:
        """Generate chat completion with OpenAI"""
        # Build messages array
        chat_messages = []

        if system_prompt:
            chat_messages.append({"role": "system", "content": system_prompt})

        chat_messages.extend(messages)

        # Call OpenAI
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=chat_messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )

        return {
            "response": response.choices[0].message.content,
            "model": response.model,
            "usage": {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            },
        }

    async def hebrew_tutor_response(
        self,
        user_message: str,
        conversation_history: List[Dict[str, str]],
        user_level: str = "A1",
        lesson_id: Optional[str] = None,
    ) -> Dict[str, str]:
        """Generate Hebrew tutor response with RAG context"""
        # Get relevant context from RAG
        context = await self.get_relevant_context(user_message, lesson_id)

        # Build system prompt for Hebrew tutor
        system_prompt = f"""You are an expert Hebrew language tutor. The student is currently at {user_level} level.

Your role is to:
1. Teach Hebrew in an engaging, patient, and encouraging way
2. Adapt your responses to the student's level
3. Use Hebrew in your responses, but also provide English translations
4. Correct mistakes gently and explain why
5. Use relevant examples and cultural context
6. Keep responses concise and focused

Relevant lesson context:
{context}

Guidelines:
- For beginners (A1): Use simple vocabulary, focus on basics, provide lots of support
- For elementary (A2): Introduce more complex structures, encourage more Hebrew usage
- For intermediate (B1): Challenge with authentic content, expect more fluency
- Always be encouraging and celebrate progress
- Provide pronunciation tips when relevant
- Use real-world examples

Format your responses in Hebrew first, then provide an English translation if needed."""

        # Add user message to history
        messages = conversation_history + [
            {"role": "user", "content": user_message}
        ]

        # Get completion
        result = await self.chat_completion(
            messages=messages,
            system_prompt=system_prompt,
            temperature=0.7,
        )

        # Try to extract translation if present
        response_text = result["response"]
        translation = None

        # Simple heuristic: if response contains both Hebrew and Latin characters
        # try to separate them (this is a simple approach, could be improved)
        if any(ord(c) >= 0x0590 and ord(c) <= 0x05FF for c in response_text):
            parts = response_text.split("\n\n")
            if len(parts) >= 2:
                # Assume first part is Hebrew, second is translation
                response_text = parts[0]
                translation = parts[1]

        return {
            "response": response_text,
            "translation": translation,
            "model": result["model"],
            "usage": result["usage"],
        }

    async def generate_lesson_content(
        self, level: str, topic: str, objectives: List[str]
    ) -> Dict:
        """Generate structured lesson content using AI"""
        system_prompt = """You are an expert Hebrew curriculum designer. Generate comprehensive lesson content."""

        user_prompt = f"""Create a structured Hebrew lesson for {level} level students.

Topic: {topic}
Objectives: {', '.join(objectives)}

Generate:
1. Introduction (in both Hebrew and English)
2. Vocabulary list (10-15 words with Hebrew, English, and transliteration)
3. Grammar points (if applicable)
4. Example sentences (5-7 with translations)
5. Practice exercises (3-5 exercises)
6. Cultural notes

Format as JSON."""

        response = await self.chat_completion(
            messages=[{"role": "user", "content": user_prompt}],
            system_prompt=system_prompt,
            temperature=0.7,
            max_tokens=2000,
        )

        try:
            # Try to parse as JSON
            content = json.loads(response["response"])
        except json.JSONDecodeError:
            # Fallback to structured text
            content = {"raw_content": response["response"]}

        return content


# Singleton instance
openai_service = OpenAIService()
