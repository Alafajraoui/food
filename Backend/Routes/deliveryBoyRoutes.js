// Routes/deliveryBoyRoutes.js
const express = require('express');
const { getAllDeliveryBoys, getDeliveryBoyDetails} = require('../Controllers/deliveryBoyController');
const {sendDeliveryRequest,respondToDeliveryRequest} = require ("../Controllers/orderController")
const router = express.Router();

// Route to get all delivery boys with an optional location filter
router.get('/deliveryboys', getAllDeliveryBoys);

// Route to get detailed information of a specific delivery boy by ID
router.get('/deliveryboys/:id', getDeliveryBoyDetails);

// Route for chef to send a delivery request
router.post('/send-delivery-request', sendDeliveryRequest);

// Route for delivery boy to respond to a delivery request
router.patch('/respond-to-request/:orderId', respondToDeliveryRequest);

module.exports = router;
