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
//https://pochinki.fly.dev/?sql=select%20*%20from%20%27https%3A%2F%2Fcloudflare-ipfs.com%2Fipfs%2FQmQyyT7UvX3xYfKZtfr245w5kYt63z9kK5HKi1EkjAEvVq%2Fbelanja.parquet%27%20LIMIT%201

app.get("/", async (req:any, res:any) => {
  try{
    const db = await Database.create(":memory:");
    const rows = await db.all(decodeURIComponent(req.query.sql));
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
  }catch{
    const foods=["gule kambing","gule cumi","sop kaki kambing","Flash Sale - Fried Chicken Sambal Ijo"];
    res.json({error:`udah makan ${foods[Math.floor(Math.random() * foods.length)]} hari ini?`});
  }
    
});
app.get("/encode", async (req:any, res:any) => {
  res.send(encodeURIComponent(req.query.url))
    
});

app.listen(3000, () => console.log("Server ready on port 3000."));

