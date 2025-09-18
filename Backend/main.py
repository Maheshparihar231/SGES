from fastapi import FastAPI
from routers import auth
from database.database import engine, Base
from routers import api_router

app = FastAPI(title="Escort Listing API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)  # Add authentication router
app.include_router(api_router)   # Add other API routers
