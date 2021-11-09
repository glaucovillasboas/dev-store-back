/* eslint import/prefer-default-export: "off" */
/* eslint consistent-return: "off" */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database.js';
import { signInSchema } from '../../schemas/userSchema.js';

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = await connection.query(`
        SELECT * FROM users WHERE email = $1;`, [email]);

    const validation = signInSchema.validate(req.body);

    if (validation.error) {
      return res.sendStatus(400);
    }

    const user = userQuery.rows[0];

    if (!user) {
      return res.sendStatus(404);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const data = { email: user.email };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(data, jwtSecret);

    const sessionQuery = await connection.query(`
            SELECT * FROM sessions WHERE user_id = $1;
        `, [user.id]);

    const session = sessionQuery.rows[0];

    if (!session) {
      await connection.query(`
            INSERT INTO sessions (user_id, token) VALUES ($1, $2);
        `, [user.id, token]);
    } else {
      await connection.query(`
            UPDATE sessions SET token = $1 WHERE userid = $2;
        `, [token, user.id]);
    }

    res.status(200).send({
      token,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  signIn,
};
