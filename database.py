import psycopg
import importlib

# read password from a file (pw.txt)
with open("pw.txt", "r") as f:
    password = f.read().strip()

# connect to the database
conn = psycopg.connect(f"postgresql://neondb_owner:{password}@ep-spring-wind-anixzc55-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

# route to files which hold different information
choice = input("Which table: ")
operation = input("Which operation: ")


fileToRun = importlib.import_module(f"routes." + operation + "." + choice)
fileToRun.run(conn)