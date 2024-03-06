import sqlite3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

def show_tables(database_path):
    # Connect to the SQLite database
    connection = sqlite3.connect(database_path)
    cursor = connection.cursor()

    # Execute a query to get a list of all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    
    # Fetch all the table names
    tables = cursor.fetchall()

    # Print the table names
    print("Tables in the database:")
    for table in tables:
        print(table[0])
        
        # Export each table to Parquet
        export_table_to_parquet(connection, table[0])

    # Close the connection
    connection.close()

def export_table_to_parquet(connection, table_name):
    # Read data from SQLite into a Pandas DataFrame
    query = f"SELECT * FROM {table_name}"
    df = pd.read_sql_query(query, connection)

    # Write the Pandas DataFrame to Parquet
    parquet_path = f"{table_name}.parquet"
    table = pa.Table.from_pandas(df)
    pq.write_table(table, parquet_path)

    print(f"Table '{table_name}' exported to Parquet: {parquet_path}")

# Replace 'your_database.db' with the actual path to your SQLite database file
database_path = 'indiemart.db'
show_tables(database_path)
