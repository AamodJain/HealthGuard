from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
from app.models.models import User
from app.models.schemas import UserLogin, UserRegister, UserOut
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=5)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=UserOut)
def register(user: UserRegister):
    if User.objects(email=user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = pwd_context.hash(user.password)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_pw,
        role=user.role,
    ).save()

    token = create_token({"sub": new_user.email, "role": new_user.role})

    return {
        "firstName": new_user.first_name,
        "lastName": new_user.last_name,
        "email": new_user.email,
        "role": new_user.role,
        "token": token
    }

@router.post("/login", response_model=UserOut)
def login(user: UserLogin):
    db_user = User.objects(email=user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    db_user.update(set__last_logged_in=datetime.utcnow())

    token = create_token({"sub": db_user.email, "role": db_user.role})

    return {
        "firstName": db_user.first_name,
        "lastName": db_user.last_name,
        "email": db_user.email,
        "role": db_user.role,
        "token": token
    }
