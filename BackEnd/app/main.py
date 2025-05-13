from fastapi import FastAPI
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.routers import admin, user, season, occasion, style, clothingType, clothing
from app.auth import auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(admin.router)
app.include_router(user.router)
app.include_router(season.router)
app.include_router(occasion.router)
app.include_router(style.router)
app.include_router(clothingType.router)
app.include_router(clothing.router)