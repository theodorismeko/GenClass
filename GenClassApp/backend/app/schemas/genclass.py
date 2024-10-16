from fastapi import FastAPI, HTTPException, Body

from pydantic import BaseModel, Field, ConfigDict

class GenClass(BaseModel):
    count: int = Field(default=500, description="Number of chromosomes")
    fold_count: int = Field(default=0, description="Fold count for fold validation")
    gens: int = Field(default=200, description="Maximum number of generations")
    threads: int = Field(default=16, description="Maximum number of threads for OpenMp")
    srate: float = Field(default=0.10, description="Selection rate")
    mrate: float = Field(default=0.05, description="Mutation rate")
    size: int = Field(default=100, description="Size of every chromosome")
    train_file: str = Field(..., example="ionosphere.train", description="File containing train data")
    test_file: str = Field(..., example="ionosphere.test", description="File containing test data")
    output_method: str = Field(default="simple", example="csv" , description="Output method (simple, csv, or full)") 
    grammar: str | None = Field(default=None, example="Grammar.bnf", description="Input Grammar used")
    
    seed: int | None = Field(default=None, description="Seed for random number generator")


    model_config = ConfigDict(extra = 'forbid',
       json_schema_extra = {
            "example": {
                "count": 500,
                "fold_count": 0,
                "gens": 200,
                "threads": 16,
                "srate": 0.10,
                "mrate": 0.05,
                "size": 100,
                "train_file": "ionosphere.train",
                "test_file": "ionosphere.test",
                "output_method": "simple",
                "grammar": "Grammar.bnf",
                "seed": 42,
            }
        })