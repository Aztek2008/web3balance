import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import Web3 from 'web3';

dotenv.config();

const interval = 60000;
const PORT = 3000 || process.env.PORT;
console.log(`process.env.PORT`, process.env.PORT);
const ADDRESS: string = process.env.ETH_ADDRESS as string;
const logger = fs.createWriteStream('balance-log.txt', { flags: 'a' });
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://mainnet.infura.io/v3/${process.env.API_KEY}`
  )
);

export const getBalance = async (): Promise<void> => {
  try {
    await web3.eth.getBalance(ADDRESS, (_, wei: string): void => {
      const balance = web3.utils.fromWei(wei, 'ether');
      logger.write(`${new Date().toLocaleString()}: ${balance}\n`);
      console.log('Actual balance saved to balance log file');
    });
  } catch (err) {
    console.log(`Error: `, err);
  }
};

getBalance();

setInterval(() => {
  getBalance();
}, interval);

const app = express();

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream('balance-log.txt').pipe(res);
});

app.listen(PORT, () => {
  console.log('Server is up...');
});
