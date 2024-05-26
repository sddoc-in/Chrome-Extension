const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', Router);
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server running on port ${Port}`));