import { Database } from "duckdb-async";

async function simpleTest() {
  const db = await Database.create(":memory:");
  const rows = await db.all("select * from 'https://cloudflare-ipfs.com/ipfs/QmQyyT7UvX3xYfKZtfr245w5kYt63z9kK5HKi1EkjAEvVq/prices.parquet' LIMIT 1");
  console.log(rows);
  process.exit()
}

simpleTest();