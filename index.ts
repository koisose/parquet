import express from "express";
import { Database } from "duckdb-async";
const app = express();
//https://cloudflare-ipfs.com/ipfs/QmQyyT7UvX3xYfKZtfr245w5kYt63z9kK5HKi1EkjAEvVq/
// belanja.parquet
// belanja_link.parquet
// discounts.parquet
// item_item.parquet
// items.parquet
// prices.parquet
//select * from 'https://cloudflare-ipfs.com/ipfs/QmQyyT7UvX3xYfKZtfr245w5kYt63z9kK5HKi1EkjAEvVq/belanja.parquet' LIMIT 1
app.get("/", async (req:any, res:any) => {
    const db = await Database.create(":memory:");
    const rows = await db.all(req.query.sql);
    const sanitizedRows = rows.map(row => {
        // Convert BigInt values to numbers
        const sanitizedRow = { ...row };
        Object.keys(sanitizedRow).forEach(key => {
          if (typeof sanitizedRow[key] === 'bigint') {
            sanitizedRow[key] = Number(sanitizedRow[key]);
          }
        });
        return sanitizedRow;
      });
    res.json(sanitizedRows)
});

app.listen(3000, () => console.log("Server ready on port 3000."));

