const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Charger les variables d'environnement depuis .env
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Welcome to the Tour Management API');
})
const tourRoutes = require('./routes/tours');
app.use('/api/tours', tourRoutes);
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
const authRoute = require('./routes/auth'); // Import de la route d'authentification
app.use('/api/auth', authRoute); // Montage de la route d'authentification
const reviewRoutes = require('./routes/reviews'); // Import de la route des avis
app.use('/api/reviews', reviewRoutes); // Montage de la route des avis


// Port depuis .env ou fallback
const port = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
