const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rate a dish
const rateDish = async (req, res) => {
    const { dishId } = req.params;
    const { rating, comment } = req.body;
    const clientId = req.user?.id;

    if (!clientId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const newRating = await prisma.dishRating.create({
            data: {
                clientId,
                dishId: parseInt(dishId),
                rating,
                comment,
            },
        });
        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error rating dish:', error);
        res.status(500).json({ error: 'Error rating dish' });
    }
};

// Get dish ratings with average rating
const getDishRatings = async (req, res) => {
    const { dishId } = req.params;

    try {
        const ratings = await prisma.dishRating.findMany({
            where: { dishId: parseInt(dishId) },
            include: {
                client: {
                    select: { name: true },
                },
            },
        });

        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / (ratings.length || 1);

        res.status(200).json({ averageRating, ratings });
    } catch (error) {
        console.error('Error fetching dish ratings:', error);
        res.status(500).json({ error: 'Error fetching dish ratings' });
    }
};

// Rate a delivery boy
const rateDeliveryBoy = async (req, res) => {
    const { deliveryBoyId } = req.params;
    const { rating, comment } = req.body;
    const clientId = req.user.id;

    try {
        const newRating = await prisma.deliveryBoyRating.create({
            data: {
                clientId,
                deliveryBoyId: parseInt(deliveryBoyId),
                rating,
                comment,
            },
        });
        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error rating delivery boy:', error);
        res.status(500).json({ error: 'Error rating delivery boy' });
    }
};

// Get delivery boy ratings with average rating
const getDeliveryBoyRatings = async (req, res) => {
    const { deliveryBoyId } = req.params;

    try {
        const ratings = await prisma.deliveryBoyRating.findMany({
            where: { deliveryBoyId: parseInt(deliveryBoyId) },
            include: {
                client: {
                    select: { name: true },
                },
            },
        });

        const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / (ratings.length || 1);

        res.status(200).json({ averageRating, ratings });
    } catch (error) {
        console.error('Error fetching delivery boy ratings:', error);
        res.status(500).json({ error: 'Error fetching delivery boy ratings' });
    }
};

// Get all dishes and ratings for a specific chef
const getChefDishesRatings = async (req, res) => {
    const { chefId } = req.params;

    try {
        // Fetch all dishes for the specified chef along with their ratings
        const dishesWithRatings = await prisma.dish.findMany({
            where: { chefId: parseInt(chefId) },
            include: {
                ratings: {
                    include: {
                        client: {
                            select: { name: true },
                        },
                    },
                },
            },
        });

        // Calculate the average rating for each dish
        const dishes = dishesWithRatings.map(dish => {
            const averageRating = dish.ratings.reduce((acc, curr) => acc + curr.rating, 0) / (dish.ratings.length || 1);
            return {
                ...dish,
                averageRating,
            };
        });

        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error fetching chef dishes and ratings:', error);
        res.status(500).json({ error: 'Error fetching chef dishes and ratings' });
    }
};

module.exports = {
    rateDish,
    getDishRatings,
    rateDeliveryBoy,
    getDeliveryBoyRatings,
    getChefDishesRatings
};
