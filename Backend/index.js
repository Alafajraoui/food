const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoutes');
const dishRoutes = require('./Routes/dishRoutes');
const chefRoutes = require ('./Routes/chefRoutes')
const orderRoutes = require('./Routes/orderRoutes'); 
const cartRoutes = require('./Routes/cartRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const cors = require('cors');

app.use(cors());

dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dishRoutes);
app.use('/api',chefRoutes)
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));


