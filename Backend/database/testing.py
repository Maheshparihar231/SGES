import psycopg2
from psycopg2 import OperationalError
from config import POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT
def check_postgres_connection(host, port, dbname, user, password):
    try:
        connection = psycopg2.connect(
            host=host,
            port=port,
            dbname=dbname,
            user=user,
            password=password
        )
        print("✅ Connection to PostgreSQL was successful!")
        connection.close()
    except OperationalError as e:
        print("❌ Failed to connect to PostgreSQL!")
        print(f"Error: {e}")

if __name__ == "__main__":
    check_postgres_connection(
        host=POSTGRES_HOST,
        port=POSTGRES_PORT,
        dbname=POSTGRES_DB,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD
    )
