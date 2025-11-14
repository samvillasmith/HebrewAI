from pinecone import Pinecone, ServerlessSpec
from typing import List, Dict, Optional
import time

from app.core.config import settings


class PineconeService:
    def __init__(self):
        self.pc = Pinecone(api_key=settings.PINECONE_API_KEY)
        self.index_name = settings.PINECONE_INDEX_NAME
        self.dimension = 1536  # text-embedding-3-small dimension

        # Initialize or get existing index
        self._init_index()

    def _init_index(self):
        """Initialize Pinecone index if it doesn't exist"""
        existing_indexes = [index.name for index in self.pc.list_indexes()]

        if self.index_name not in existing_indexes:
            self.pc.create_index(
                name=self.index_name,
                dimension=self.dimension,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws", region=settings.PINECONE_ENVIRONMENT
                ),
            )
            # Wait for index to be ready
            while not self.pc.describe_index(self.index_name).status["ready"]:
                time.sleep(1)

        self.index = self.pc.Index(self.index_name)

    def upsert_vectors(
        self, vectors: List[Dict[str, any]], namespace: str = ""
    ) -> Dict:
        """
        Upsert vectors to Pinecone
        
        vectors format: [
            {
                "id": "unique_id",
                "values": [0.1, 0.2, ...],  # embedding
                "metadata": {"text": "...", "lesson_id": "...", "type": "..."}
            }
        ]
        """
        return self.index.upsert(vectors=vectors, namespace=namespace)

    def query(
        self,
        query_vector: List[float],
        top_k: int = 5,
        filter: Optional[Dict] = None,
        namespace: str = "",
        include_metadata: bool = True,
    ) -> Dict:
        """Query Pinecone index for similar vectors"""
        return self.index.query(
            vector=query_vector,
            top_k=top_k,
            filter=filter,
            namespace=namespace,
            include_metadata=include_metadata,
        )

    def delete(
        self,
        ids: Optional[List[str]] = None,
        delete_all: bool = False,
        namespace: str = "",
        filter: Optional[Dict] = None,
    ):
        """Delete vectors from Pinecone"""
        if delete_all:
            self.index.delete(delete_all=True, namespace=namespace)
        elif ids:
            self.index.delete(ids=ids, namespace=namespace)
        elif filter:
            self.index.delete(filter=filter, namespace=namespace)

    async def index_lesson_content(
        self, lesson_id: str, content: Dict, embedding_function
    ):
        """Index lesson content in Pinecone"""
        vectors = []

        # Index different parts of the lesson
        sections = [
            ("title", content.get("title", "")),
            ("description", content.get("description", "")),
        ]

        # Index vocabulary
        if "vocabulary" in content:
            for idx, vocab in enumerate(content["vocabulary"]):
                text = f"{vocab['hebrew']} - {vocab['english']}"
                if vocab.get("example"):
                    text += f" Example: {vocab['example']}"

                embedding = await embedding_function(text)
                vectors.append(
                    {
                        "id": f"{lesson_id}_vocab_{idx}",
                        "values": embedding,
                        "metadata": {
                            "lesson_id": lesson_id,
                            "type": "vocabulary",
                            "text": text,
                            "hebrew": vocab["hebrew"],
                            "english": vocab["english"],
                        },
                    }
                )

        # Index grammar points
        if "grammar" in content:
            for idx, grammar in enumerate(content["grammar"]):
                text = f"{grammar['rule']} Example: {grammar.get('example', '')}"
                embedding = await embedding_function(text)
                vectors.append(
                    {
                        "id": f"{lesson_id}_grammar_{idx}",
                        "values": embedding,
                        "metadata": {
                            "lesson_id": lesson_id,
                            "type": "grammar",
                            "text": text,
                        },
                    }
                )

        # Index main sections
        for section_type, text in sections:
            if text:
                embedding = await embedding_function(text)
                vectors.append(
                    {
                        "id": f"{lesson_id}_{section_type}",
                        "values": embedding,
                        "metadata": {
                            "lesson_id": lesson_id,
                            "type": section_type,
                            "text": text,
                        },
                    }
                )

        # Upsert all vectors
        if vectors:
            self.upsert_vectors(vectors)
            return len(vectors)
        return 0


# Singleton instance
pinecone_service = PineconeService()
