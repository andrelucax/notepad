require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const secretRoutes = require('./src/routes/secretRoutes');

const app = express();

app.use(express.json());

if (process.env.DEBUG == "True") {
    app.use(cors({
        origin: 'http://localhost:8080'
    }));
} else {
    app.use(cors({
        origin: 'https://notepad.andrelucax.com'
    }));
}

connectDB();

app.use('/', secretRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running at port ${PORT}`));