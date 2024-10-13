import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use environment variable with a fallback
MONGO_URL = os.getenv("MONGODB_URL", "mongodb://admin:admin@mongodb:27017/genclass")
DB_NAME = "genclass"

logger.info(f"Connecting to MongoDB: {MONGO_URL}")

try:
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {str(e)}")
    raise

def get_db():
    return db

def init_db(app: FastAPI):
    app.mongodb_client = AsyncIOMotorClient(MONGO_URL)
    app.mongodb = app.mongodb_client[DB_NAME]
    logger.info("MongoDB client initialized for FastAPI app")

def close_db(app: FastAPI):
    app.mongodb_client.close()
    logger.info("MongoDB connection closed")

# Function to check database connection
async def check_db_connection():
    try:
        await client.admin.command('ismaster')
        logger.info("Database connection is valid")
        return True
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")
        return False