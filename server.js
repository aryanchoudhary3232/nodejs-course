const express = require('express');
const app = express();
const db = require('./express/db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

app.get('/', (req,res) => {
    res.send('Hi, I am Aryan, Welcome to Hotel');
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
    console.log('Listening on port 3000');
});