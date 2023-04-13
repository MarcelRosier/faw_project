import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cartFile = path.join(__dirname, 'cart.json');

export function read(callback) {
  fs.readFile(cartFile, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
}

export function write(carts, callback) {
  fs.writeFile(cartFile, JSON.stringify(carts), (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

export function findProductIndex(cart, productId) {
  return cart.items.findIndex(item => item.productId === productId);
}

export default { read, write };
