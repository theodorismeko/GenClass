from app.schemas.genclass import GenClass
import os
import csv
from io import StringIO
import asyncio
from fastapi import APIRouter, HTTPException, Depends
import subprocess

genclass_router = APIRouter(tags=["Execution of Genclass"])


@genclass_router.post("/run-genclass/")
async def run_genclass(params: GenClass):
    command = [
        "../bin/genclass", 
        "-c", str(params.count),
        "-g", str(params.gens),
        "-d", str(params.threads),
        "-s", f"{params.srate:.2f}",
        "-m", f"{params.mrate:.2f}",
        "-l", str(params.size),
        "-p", str(params.train_file),
        "-t", str(params.test_file),
        "-o", params.output_method,
        "-i", params.grammar
    ]
    print("Executing command:", " ".join(command))
    try:
        process = await asyncio.create_subprocess_exec(
            *command,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE)
        stdout, stderr = await process.communicate()
        if process.returncode != 0:
            raise HTTPException(status_code=400, detail=f"Genclass execution failed: {stderr.decode()}")
        return {"output": stdout.decode()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@genclass_router.get("/genclass-help/")
async def genclass_help():
    help_options = ["-h", "--help", "-help", "/?"]
    for option in help_options:
        try:
            process = await asyncio.create_subprocess_exec(
                "../bin/genclass",
                option,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            if process.returncode == 0:
                return {"help": stdout.decode()}
        except Exception:
            continue

    # If no help option worked, provide a custom help message
    custom_help = """
    Usage: genclass [options]

    Options:
    -c count   : Number of chromosomes (default: 500)
    -f count   : Fold count for fold validation (default: 0, no folding)
    -g gens    : Maximum number of generations (default: 200)
    -d count   : Maximum number of threads for OpenMp (default: 16)
    -s srate   : Selection rate (default: 0.10)
    -m mrate   : Mutation rate (default: 0.05)
    -l size    : Size of every chromosome (default: 100)
    -p file    : File containing train data
    -t file    : File containing test data
    -o method  : Output method (simple, csv, or full)
    -r seed    : Seed for random number generator
    -i file    : Input grammar file in BNF format

    For more detailed information, please refer to the program's documentation.
    """
    return {"help": custom_help}

# @genclass_router.post("/run-genclass/")
# async def run_genclass(params: GenClass):
#     command = [
#         "../bin/genclass", 
#         "-c", str(params.count),
#         "-f", str(params.fold_count),
#         "-g", str(params.gens),
#         "-d", str(params.threads),
#         "-s", f"{params.srate:.2f}",
#         "-m", f"{params.mrate:.2f}",
#         "-l", str(params.size),
#         "-p", str(params.train_file),
#         "-t", str(params.test_file),
#         "-o", params.output_method
#     ]

#     if params.seed is not None:
#         command.extend(["-s", str(params.seed)])
        
#     try:
#         process = await asyncio.create_subprocess_exec(
#             *command,
#             stdout=asyncio.subprocess.PIPE,
#             stderr=asyncio.subprocess.PIPE)
#         stdout, stderr = await process.communicate()
#         if process.returncode != 0:
#             raise HTTPException(status_code=400, detail=f"Genclass execution failed: {stderr.decode()}")
#         return {"output": stdout.decode()}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# @genclass_router.get("/genclass-help/")
# async def genclass_help():
#     help_options = ["-h", "--help", "-help", "/?"]
#     for option in help_options:
#         try:
#             result = subprocess.run(["../bin/genclass", option], capture_output=True, text=True, check=True)
#             return {"help": result.stdout}
#         except subprocess.CalledProcessError:
#             continue

#     # If no help option worked, provide a custom help message
#     custom_help = """
#     Usage: genclass [options]

#     Options:
#     -c count   : Number of chromosomes (default: 500)
#     -f count   : Fold count for fold validation (default: 0, no folding)
#     -g gens    : Maximum number of generations (default: 200)
#     -d count   : Maximum number of threads for OpenMp (default: 16)
#     -s srate   : Selection rate (default: 0.10)
#     -m mrate   : Mutation rate (default: 0.05)
#     -l size    : Size of every chromosome (default: 100)
#     -p file    : File containing train data
#     -t file    : File containing test data
#     -o method  : Output method (simple, csv, or full)
#     -r seed    : Seed for random number generator
#     -i file    : Input grammar file in BNF format

#     For more detailed information, please refer to the program's documentation.
#     """
#     return {"help": custom_help}