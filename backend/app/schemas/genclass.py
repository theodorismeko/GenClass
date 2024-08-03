from fastapi import FastAPI, HTTPException, Body

from pydantic import BaseModel, Field

class GenClass(BaseModel):
   train_path: str = Field(..., example="../examples/ionosphere.train")
   test_path: str = Field(..., example="../examples/ionosphere.test")
   generations: int = Field(..., example=10)
   output_format: str = Field(..., example="csv")
   
   class Config: 
       extra = 'forbid'