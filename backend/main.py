from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.mongo import ping_db
from routers import upload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    ping_db()

app.include_router(upload.router)

@app.get("/")
def read_root():
    return {"message": "NeuroStudy AI backend is running!"}