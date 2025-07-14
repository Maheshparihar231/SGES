from fastapi import FastAPI
from routers import escort
from database.database import engine, Base

app = FastAPI(title="Escort Listing API")

Base.metadata.create_all(bind=engine)

app.include_router(escort.router)
