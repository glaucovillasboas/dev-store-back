/* eslint import/prefer-default-export: "off" */
import connection from '../database.js';

async function signIn(req, res) {
  const { email } = req.body;

  const user = await connection.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email]);

  console.log(user);

  res.sendStatus(200);
}

export {
  signIn,
};
