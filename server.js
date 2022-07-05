const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');


// Routes Initilization
const userManagementRoutes = require('./routes/userManagementRoutes');
const meetingsRoutes = require('./routes/meetingsManagementRoutes');

const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:4200'}));
app.use(userManagementRoutes);
app.use(meetingsRoutes);


app.listen(port, () => {
    console.log('+++ Application Started successfully on Port: ', port);
});

