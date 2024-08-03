from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter
from fastapi.responses import JSONResponse
import shutil, logging, os
from typing import List

logging.basicConfig(level=logging.INFO)

utils_router = APIRouter(tags=["Utilities"])

@utils_router.post("/upload/")
async def upload_files(train_file: UploadFile = File(...), test_file: UploadFile = File(...)):
   try:
       train_dir = "../examples"
       if not os.path.exists(train_dir):
           os.makedirs(train_dir)
       
       train_path = os.path.join(train_dir, train_file.filename)
       test_path = os.path.join(train_dir, test_file.filename)

       # Check if the train file already exists
       if os.path.exists(train_path):
           raise HTTPException(status_code=400, detail=f"Train file '{train_file.filename}' already exists.")
       
       # Check if the test file already exists
       if os.path.exists(test_path):
           raise HTTPException(status_code=400, detail=f"Test file '{test_file.filename}' already exists.")
       
       # Save train file
       with open(train_path, "wb") as buffer:
           shutil.copyfileobj(train_file.file, buffer)
       
       # Save test file
       with open(test_path, "wb") as buffer:
           shutil.copyfileobj(test_file.file, buffer)

       logging.info(f"Files {train_file.filename} and {test_file.filename} uploaded successfully.")
       return {"message": "Files uploaded successfully"}
   except HTTPException as he:
       logging.error(f"HTTP Error: {he.detail}")
       raise he
   except Exception as e:
       logging.error(f"Error uploading files: {str(e)}")
       raise HTTPException(status_code=500, detail=f"Error uploading files: {str(e)}")
   

   ###### Make an endpoint to get all the files in the examples folder and then enother one to delete a file that is no longer needed
   
@utils_router.get("/files/", response_model=List[str])
async def list_files():
    try:
        file_dir = "../examples"
        if not os.path.exists(file_dir):
            return []
        
        files = [f for f in os.listdir(file_dir) if f.endswith(('.train', '.test'))]
        return files
    except Exception as e:
        logging.error(f"Error listing files: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error listing files: {str(e)}")
    
    
@utils_router.delete("/files/{filename}")
async def delete_file(filename: str):
   try:
       file_path = os.path.join("../examples", filename)
       if not os.path.exists(file_path):
           raise HTTPException(status_code=404, detail=f"File '{filename}' not found.")
       
       os.remove(file_path)
       logging.info(f"File {filename} deleted successfully.")
       return {"message": f"File '{filename}' deleted successfully."}
   except HTTPException as he:
       logging.error(f"HTTP Error: {he.detail}")
       raise he
   except Exception as e:
       logging.error(f"Error deleting file: {str(e)}")
       raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")
   