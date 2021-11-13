/* eslint-disable comma-dangle */
import jwt from 'jsonwebtoken';

const addCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  const jwtSecret = process.env.JWT_SECRET;
  const user = jwt.verify(token, jwtSecret);

  res.send(user);
};

export default addCart;
