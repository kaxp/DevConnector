const express = require('express');

const connectDB = require('./config/db');
var bodyParser = require('body-parser')

const app = express();

//connect DB
connectDB();


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('API RUNNING'));

// Define Routes
// where /api/users is route name




app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
