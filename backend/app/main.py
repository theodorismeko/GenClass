import os
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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/examples/")
async def get_example_files():
    examples_dir = "examples"  # Adjust this path if needed
    if not os.path.exists(examples_dir):
        return {"error": "Examples directory not found"}
    files = [f for f in os.listdir(examples_dir) if os.path.isfile(os.path.join(examples_dir, f))]
    return {"files": files}

