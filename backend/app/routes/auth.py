from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from app.schemas.user_schema import UserResponse , SignupRequest, LoginRequest
from app.models.user_model import User


load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Token generator
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(hours=5)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/signup" , response_model=UserResponse)
async def signup(user: SignupRequest):
    if User.objects(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password
    )
    new_user.save()

    token = create_token({"email": new_user.email})
    
    return UserResponse(
        first_name=new_user.first_name,
        last_name=new_user.last_name,
        email=new_user.email,
        token=token
    )

@router.post("/login", response_model=UserResponse)
async def login(user: LoginRequest):
    existing_user = User.objects(email=user.email).first()
    
    if not existing_user or not pwd_context.verify(user.password, existing_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = create_token({"email": existing_user.email})
    
    return UserResponse(
        first_name=existing_user.first_name,
        last_name=existing_user.last_name,
        role=existing_user.role,
        email=existing_user.email,
        token=token
    )