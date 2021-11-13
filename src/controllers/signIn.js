/* eslint-disable comma-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database.js';
import { signInSchema } from '../../schemas/userSchema.js';

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const validation = signInSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const userQuery = await connection.query(
      `
        SELECT users.*
        FROM users
        WHERE users.email = $1;`,
      [email]
    );

    const user = userQuery.rows[0];
    if (!user) {
      return res.sendStatus(404);
    }

    const addressesQuery = await connection.query(
      `
        SELECT
          addresses.address, addresses.cep, addresses.complement,
          states.name AS state
        FROM addresses
          JOIN states
            ON states.id = addresses.state_id
        WHERE user_id = $1`, [user.id]
    );

    const address = addressesQuery.rows[0];

    const phonesQuery = await connection.query(
      `
        SELECT *
        FROM phones WHERE user_id = $1`, [user.id]
    );

    const { phone } = phonesQuery.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const data = { id: user.id, email: user.email, name: user.name };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(data, jwtSecret);

    const sessionQuery = await connection.query(
      'SELECT * FROM sessions WHERE user_id = $1;',
      [user.id]
    );

    const session = sessionQuery.rows[0];

    if (!session) {
      await connection.query(
        'INSERT INTO sessions (user_id, token) VALUES ($1, $2);',
        [user.id, token]
      );
    } else {
      await connection.query(
        'UPDATE sessions SET token = $1 WHERE user_id = $2;',
        [token, user.id]
      );
    }

    return res.status(200).send({
      token,
      address,
      phone,
      name: user.name,
      photo: user.photo,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default signIn;
