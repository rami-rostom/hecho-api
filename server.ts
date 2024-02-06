import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const cors = require('cors');
import router from './app/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4173',
    credentials: true,
  })
);
app.use(
  cors({
    origin: 'https://hecho-app.onrender.com',
    credentials: true,
  })
);
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
