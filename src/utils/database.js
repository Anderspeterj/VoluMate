import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('products.db');

export const initDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      barcode TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      image_url TEXT,
      score INTEGER NOT NULL,
      rating TEXT NOT NULL,
      rating_color TEXT NOT NULL
    );
  `);
};

export const saveProduct = async (product) => {
  const { barcode, name, image_url, score, rating, rating_color } = product;
  
  console.log('DEBUG - Database save - Score:', score, 'Type:', typeof score);
  console.log('DEBUG - Database save - Rating:', rating, 'Type:', typeof rating);
  console.log('DEBUG - Database save - RatingColor:', rating_color, 'Type:', typeof rating_color);
  
  const result = await db.runAsync(
    'INSERT OR REPLACE INTO products (barcode, name, image_url, score, rating, rating_color) VALUES (?, ?, ?, ?, ?, ?)',
    barcode,
    name,
    image_url,
    score,
    rating,
    rating_color
  );
  return result;
};

export const getSavedProducts = async () => {
  const allRows = await db.getAllAsync('SELECT * FROM products');
  return allRows;
};

export const getProductByBarcode = async (barcode) => {
  const firstRow = await db.getFirstAsync('SELECT * FROM products WHERE barcode = ?', barcode);
  return firstRow;
}

export const deleteProduct = async (barcode) => {
  const result = await db.runAsync('DELETE FROM products WHERE barcode = ?', barcode);
  return result;
}; 