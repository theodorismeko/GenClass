from app.schemas.genclass import GenClass
from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db.database import get_db
import asyncio
import tempfile
import os
import logging

logging.basicConfig(level=logging.INFO)

genclass_router = APIRouter(tags=["Execution of Genclass"])

@genclass_router.post("/run-genclass/")
async def run_genclass(params: GenClass, db: AsyncIOMotorDatabase = Depends(get_db)):
    try:
        train_file = None
        if params.train_file:
            train_file = await db.train_files.find_one({"filename": params.train_file})
            if not train_file:
                raise HTTPException(status_code=404, detail=f"Train file not found in database: {params.train_file}")
            
        test_file = None
        if params.train_file:
            test_file = await db.test_files.find_one({"filename": params.test_file})
            if not train_file:
                raise HTTPException(status_code=404, detail=f"Test file not found in database: {params.test_file}")

        grammar_file = None
        if params.grammar:
            grammar_file = await db.grammar_files.find_one({"filename": params.grammar})
            if not grammar_file:
                raise HTTPException(status_code=404, detail=f"Grammar file not found in database: {params.grammar}")

        with tempfile.TemporaryDirectory() as temp_dir:
            # Write files to temporary directory
            train_path = os.path.join(temp_dir, params.train_file)
            test_path = os.path.join(temp_dir, params.test_file)
            
            with open(train_path, 'wb') as f:
                f.write(train_file['content'])
            with open(test_path, 'wb') as f:
                f.write(test_file['content'])

            # Prepare command
            command = [
                "./bin/genclass", 
                "-c", str(params.count),
                "-f", str(params.fold_count),
                "-g", str(params.gens),
                "-d", str(params.threads),
                "-s", f"{params.srate:.2f}",
                "-m", f"{params.mrate:.2f}",
                "-l", str(params.size),
                "-p", train_path,
                "-t", test_path,
                "-o", params.output_method
            ]
            
            # Add fold count if provided
            if params.fold_count > 0:
                command.extend(["-f", str(params.fold_count)])

            # Add grammar file to command if provided
            if grammar_file:
                grammar_path = os.path.join(temp_dir, params.grammar)
                with open(grammar_path, 'wb') as f:
                    f.write(grammar_file['content'])
                command.extend(["-i", grammar_path])

            # Execute command
            process = await asyncio.create_subprocess_exec(
                *command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE)
            stdout, stderr = await process.communicate()

            if process.returncode != 0:
                raise HTTPException(status_code=400, detail=f"Genclass execution failed: {stderr.decode()}")
            
            logging.info("Genclass execution completed successfully")
            return {"output": stdout.decode()}

    except HTTPException as he:
        logging.error(f"HTTP Error: {he.detail}")
        raise he
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
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