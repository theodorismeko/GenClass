import os
from app.db.database import init_db, close_db
from fastapi import FastAPI, HTTPException, Body 
from app.routers.genclassgenerations import genclass_router
from app.routers.utils import utils_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GenClass Backend Service")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(genclass_router)
app.include_router(utils_router)

@app.on_event("startup")
async def startup_db_client():
    init_db(app)

@app.on_event("shutdown")
async def shutdown_db_client():
    close_db(app)

@app.get("/")
async def root():
    return {"message": "Hello World"}

