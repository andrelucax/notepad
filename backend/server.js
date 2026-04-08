require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const secretRoutes = require('./src/routes/secretRoutes');

const app = express();

app.use(express.json());

let origin = process.env.DEBUG == "True" ? '*' : 'https://notepad.andrelucax.com';

app.use(cors({
    origin: origin
}));

connectDB();

app.use('/', secretRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running at port ${PORT}`));