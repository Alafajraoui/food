const express = require('express');
const ratingsController = require('../Controllers/ratingscontroller');
const { authenticate } = require('../Controllers/authMiddleware');
const router = express.Router();

router.post('/rate-dish/:dishId', authenticate ,ratingsController.rateDish);
router.get('/dish-ratings/:dishId', authenticate ,ratingsController.getDishRatings);

router.post('/rate-delivery-boy/:deliveryBoyId', authenticate ,ratingsController.rateDeliveryBoy);
router.get('/delivery-boy-ratings/:deliveryBoyId', authenticate ,ratingsController.getDeliveryBoyRatings);
router.get('/chef-dishes-ratings/:chefId', authenticate, ratingsController.getChefDishesRatings);


module.exports = router;
