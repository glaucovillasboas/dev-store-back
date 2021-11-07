import app from './app.js';
import './setup.js';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${process.env.PORT}`);
});
