/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */

import connection from '../database.js';

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const userQuery = await connection.query(
      `
        SELECT
          users.*
        FROM users
          JOIN sessions
            ON users.id = sessions.user_id
        WHERE sessions.token = $1`, [token]
    );

    const user = userQuery.rows[0];

    if (!user) {
      return res.sendStatus(401);
    }

    const addressesQuery = await connection.query(
      `
        SELECT
          addresses.address, addresses.cep, addresses.complement,
          states.name AS state
        FROM addresses
          JOIN states
            ON states.id = addresses.state_id AND addresses.user_id = $1
        WHERE addresses.user_id = $1`, [user.id]
    );

    const address = addressesQuery.rows[0];
    const phonesQuery = await connection.query(
      `
        SELECT *
        FROM phones WHERE user_id = $1`, [user.id]
    );

    const { phone } = phonesQuery.rows[0];

    return res.status(200).send({
      address,
      phone,
      name: user.name,
      photo: user.photo,
    });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getUser;
