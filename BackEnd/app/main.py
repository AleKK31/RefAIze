from fastapi import FastAPI
from app.database import Base, engine
from app.routers import admin
from app.auth import auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(admin.router)
app.include_router(auth_router.router)