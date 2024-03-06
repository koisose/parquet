import { NFTStorage, File, Blob } from 'nft.storage'
import { readFile } from 'fs/promises';
async function copin(){
  
}
const client = new NFTStorage({ token: "" })
// Assuming 'client' is already defined somewhere in your code

const parquetFilePath = 'parquet/prices.parquet';

// Read the content of the Parquet file
const parquetContent = await readFile(parquetFilePath);

// Create a Buffer from the file content
const parquetBuffer = Buffer.from(parquetContent);

// Create a Blob from the Buffer
const parquetBlob = new Blob([parquetBuffer], { type: 'application/octet-stream' });

// Create a File object from the Blob
const parquetFile = new File([parquetBlob], 'prices.parquet', { type: 'application/octet-stream' });

// Store the file using the client



const cid = await client.storeDirectory([parquetFile])
console.log(cid)

//prices.parquet https://nftstorage.link/ipfs/bafybeihdwnozx544mcexs4pk7kcrqwcb3txbeajp66oithhu2ojkecxwqu/prices.parquet