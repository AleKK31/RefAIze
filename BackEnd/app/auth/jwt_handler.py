from datetime import datetime, timedelta
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def signJWT(admin_id: int):
    payload = {
        "admin_id": admin_id,
        "exp": datetime.utcnow() + timedelta(hours=6)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def sign_refresh_token(admin_id: int):
    payload = {
        "admin_id": admin_id,
        "exp": datetime.utcnow() + timedelta(days=365)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def refresh_access_token(refresh_token: str):
    try:
        decoded_refresh_token = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        admin_id = decoded_refresh_token["admin_id"]

        new_access_token = signJWT(admin_id)
        return {"access_token": new_access_token}
    
    except jwt.ExpiredSignatureError:
        return {"error": "Refresh token has expired"}
    except JWTError:
        return {"error": "Invalid refresh token"}


def decodeJWT(token: str):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if decoded_token["exp"] >= datetime.utcnow().timestamp() else None
    except JWTError:
        return {}