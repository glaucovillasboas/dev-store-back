import './setup.js';
import express from 'express';
import cors from 'cors';
import signIn from './controllers/signIn.js';
import signUp from './controllers/signUp.js';
import getProductByCode from './controllers/products.js';
import getUser from './controllers/getUser.js';
import { addCart, getCart, deleteProduct } from './controllers/cart.js';
import auth from './middlewares/auth.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.post('/sign-in', signIn);

app.post('/sign-up', signUp);

app.get('/products/:code', getProductByCode);

app.get('/user', getUser);

app.get('/cart', auth, getCart);

app.post('/cart', auth, addCart);

app.delete('/cart/:code', auth, deleteProduct);

export default app;
