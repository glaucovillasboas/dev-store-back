/* eslint-disable comma-dangle */
import bcrypt from 'bcrypt';
import connection from '../database.js';
import { signUpSchema } from '../../schemas/userSchema.js';

const signUp = async (req, res) => {
  const {
    name,
    email,
    cpf,
    phone,
    photo,
    password,
    address,
    cep,
    complement,
    state,
  } = req.body;

  const validation = signUpSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  try {
    const checkEmail = await connection.query(
      `
        SELECT * FROM users WHERE email = $1;`,
      [email]
    );

    const checkCpf = await connection.query(
      `
        SELECT * FROM users WHERE cpf = $1;`,
      [cpf]
    );

    if (checkCpf.rowCount > 0 || checkEmail.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(
      `
    INSERT INTO users (name, email, password, cpf, photo) VALUES ($1, $2, $3, $4, $5);`,
      [name, email, passwordHash, cpf, photo]
    );

    const createdUser = await connection.query(
      `
    SELECT * FROM users WHERE email = $1;`,
      [email]
    );

    const userId = createdUser.rows[0].id;

    await connection.query(
      `
    INSERT INTO addresses (user_id, address, cep, complement, state_id) VALUES ($1, $2, $3, $4, $5);`,
      [userId, address, cep, complement, state]
    );

    await connection.query(
      `
    INSERT INTO phones (user_id, phone) VALUES ($1, $2);
    `,
      [userId, phone]
    );

    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(500);
  }
};

export default signUp;
