from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from logger import get_logger
from config import POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT
from sqlalchemy.exc import OperationalError
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

logger = get_logger('database')

# Helper to create database if not exists
def create_database_if_not_exists():
    try:
        con = psycopg2.connect(dbname='postgres', user=POSTGRES_USER, password=POSTGRES_PASSWORD, host=POSTGRES_HOST, port=POSTGRES_PORT)
        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = con.cursor()
        cur.execute(f"SELECT 1 FROM pg_database WHERE datname='{POSTGRES_DB}'")
        exists = cur.fetchone()
        if not exists:
            cur.execute(f'CREATE DATABASE "{POSTGRES_DB}"')
            logger.info(f"Database '{POSTGRES_DB}' created.")
        else:
            logger.info(f"Database '{POSTGRES_DB}' already exists.")
        cur.close()
        con.close()
    except Exception as e:
        logger.error(f"Error creating database: {str(e)}")
        raise

try:
    engine = create_engine(DATABASE_URL)
    # Try connecting
    conn = engine.connect()
    conn.close()
    logger.info("Database engine created successfully")
except OperationalError as e:
    if 'does not exist' in str(e):
        logger.warning("Database does not exist. Attempting to create it...")
        create_database_if_not_exists()
        # Try again
        engine = create_engine(DATABASE_URL)
        conn = engine.connect()
        conn.close()
        logger.info("Database engine created successfully after creation.")
    else:
        logger.error(f"Error creating database engine: {str(e)}")
        raise
except Exception as e:
    logger.error(f"Error creating database engine: {str(e)}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
