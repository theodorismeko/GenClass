from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter, Depends
from fastapi.responses import JSONResponse
import logging
from typing import List, Optional
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.database import get_db

logging.basicConfig(level=logging.INFO)

utils_router = APIRouter(tags=["Utilities"])

async def upload_file(file: UploadFile, db: AsyncIOMotorDatabase, collection_name: str):
    try:
        # Check if file already exists
        existing_file = await db[collection_name].find_one({"filename": file.filename})
        if existing_file:
            raise HTTPException(status_code=400, detail=f"File '{file.filename}' already exists in {collection_name}")

        content = await file.read()
        document = {
            "filename": file.filename,
            "content": content
        }
        result = await db[collection_name].insert_one(document)
        logging.info(f"{collection_name} file uploaded successfully. Document ID: {result.inserted_id}")
        return {"message": f"{collection_name} file uploaded successfully", "document_id": str(result.inserted_id)}
    except HTTPException as he:
        logging.error(f"HTTP Error: {he.detail}")
        raise he
    except Exception as e:
        logging.error(f"Error uploading {collection_name} file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading {collection_name} file: {str(e)}")

@utils_router.post("/upload/train")
async def upload_train_file(train_file: UploadFile = File(...), db: AsyncIOMotorDatabase = Depends(get_db)):
    return await upload_file(train_file, db, "train_files")

@utils_router.post("/upload/test")
async def upload_test_file(test_file: UploadFile = File(...), db: AsyncIOMotorDatabase = Depends(get_db)):
    return await upload_file(test_file, db, "test_files")

@utils_router.post("/upload/grammar")
async def upload_grammar_file(grammar: UploadFile = File(...), db: AsyncIOMotorDatabase = Depends(get_db)):
    return await upload_file(grammar, db, "grammar_files")

@utils_router.get("/files/", response_model=List[dict])
async def list_files(db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        train_files = await db.train_files.find().to_list(length=None)
        test_files = await db.test_files.find().to_list(length=None)
        grammar_files = await db.grammar_files.find().to_list(length=None)

        files = []
        for file_list in [train_files, test_files, grammar_files]:
            files.extend([{
                "id": str(file["_id"]),
                "filename": file["filename"],
                "type": "train" if file in train_files else "test" if file in test_files else "grammar"
            } for file in file_list])

        return files
    except Exception as e:
        logging.error(f"Error listing files: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error listing files: {str(e)}")

@utils_router.delete("/files/{file_type}/{file_id}")
async def delete_file(file_type: str, file_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        if file_type not in ["train", "test", "grammar"]:
            raise HTTPException(status_code=400, detail="Invalid file type")

        collection_name = f"{file_type}_files"
        result = await db[collection_name].delete_one({"_id": ObjectId(file_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail=f"{file_type.capitalize()} file with id '{file_id}' not found.")
        
        logging.info(f"{file_type.capitalize()} file with id {file_id} deleted successfully.")
        return {"message": f"{file_type.capitalize()} file with id '{file_id}' deleted successfully."}
    except Exception as e:
        logging.error(f"Error deleting file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")