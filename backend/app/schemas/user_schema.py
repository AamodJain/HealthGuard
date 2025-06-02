from pydantic import BaseModel, EmailStr, Field

class SignupRequest(BaseModel):
    first_name: str 
    last_name: str
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class UserResponse(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    token: str 

