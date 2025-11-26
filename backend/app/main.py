from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import router

app = FastAPI()

# Allow CORS for the frontend URL
origins = [
    "http://localhost:3000",  # Frontend development server
    # Add other frontend origins if deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Welcome to the Finance Tracker Backend API"}
