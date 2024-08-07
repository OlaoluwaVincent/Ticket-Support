const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const path = require('path');

// Initialize Express
const app = express();
app.use(cors());

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//End of Middle Wares

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Serve front end

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  //
  app.get('*', (req, res) => {
    const options = {
      root: path.join(__dirname, '../', 'frontend', 'dist'),
      dotfiles: 'allow',
    };
    res.sendFile('index.html', options);
  });
} else {
  // Routes || Endpoint
  app.get('/', (req, res) => {
    res.send('Hello WORLD');
  });
}
// End of Routes

// Error Handler
app.use(errorHandler);

// Nodemon Server running
app.listen(PORT, () => console.log('Port Started on: ' + PORT));
