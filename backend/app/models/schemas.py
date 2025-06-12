from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(..., alias="lastName")
    email: EmailStr
    password: str
    role: Literal["Public" , "Medical Official"]

    class Config:
        allow_population_by_field_name = True

class UserOut(BaseModel):
    first_name: str = Field(..., alias="firstName")
    last_name: str = Field(..., alias="lastName")
    email: EmailStr
    role: str
    token: str

    class Config:
        allow_population_by_field_name = True
        by_alias = True

class TokenResponse(BaseModel):
    token: str
    role: str
    token_type: str = "bearer"

class UpdateOut(BaseModel):
    title: str
    content: str

    class Config:
        orm_mode = True
        
class AlertOut(BaseModel):
    title: str
    content: str

    class Config:
        orm_mode = True
