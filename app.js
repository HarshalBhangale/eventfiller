const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const lumaRoutes = require('./routes/luma');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/luma', lumaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
