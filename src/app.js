import './setup.js';
import express from 'express';
import cors from 'cors';
import signIn from './controllers/signIn.js';
import signUp from './controllers/signUp.js';
import {
  getProductByCode,
  getProductsHighlights,
  getProductsOnSale,
  getCategories,
} from './controllers/products.js';
import getUser from './controllers/getUser.js';
import { addCart, getCart, deleteProduct } from './controllers/cart.js';
import auth from './middlewares/auth.js';
import getCategorieById from './controllers/categorie.js';
import getResearchedProduct from './controllers/search.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.post('/sign-in', signIn);

app.post('/sign-up', signUp);

app.get('/products/:code', getProductByCode);

app.get('/highlights', getProductsHighlights);

app.get('/on-sale', getProductsOnSale);

app.get('/categories', getCategories);

app.get('/categorie/:id', getCategorieById);

app.get('/user', getUser);

app.post('/search', getResearchedProduct);

app.get('/cart', auth, getCart);

app.post('/cart', auth, addCart);

app.delete('/cart/:code', auth, deleteProduct);

export default app;
