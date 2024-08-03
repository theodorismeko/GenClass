from app.schemas.genclass import GenClass
from fastapi import APIRouter, Body, Request, Depends, status, HTTPException
import subprocess

genclass_router = APIRouter(tags=["Execution of Genclass"])

@genclass_router.post("/run-genclass/")
async def run_genclass(params: GenClass):
   command = [
       "../bin/genclass",  # Adjust the path if necessary
       "-p", params.train_path,
       "-t", params.test_path,
       "-g", str(params.generations),
       "-o", params.output_format
   ]
   try:
       result = subprocess.run(command, capture_output=True, text=True)
       if result.returncode == 0:
           return {"output": result.stdout}
       else:
           return {"error": result.stderr}
   except Exception as e:
       return {"error": str(e)}