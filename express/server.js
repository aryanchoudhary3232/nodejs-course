const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

app.get('/', (req,res) => {
    res.send('Hi, I am Aryan, Welcome to Hotel');
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});