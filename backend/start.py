import os
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))

    print(f"Starting server on {host}:{port}")
    print(f"CORS Origins: {os.getenv('CORS_ORIGINS')}")

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=True,
    )
