const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all delivery boys
const getAllDeliveryBoys = async (req, res) => {
    try {
        const deliveryBoys = await prisma.deliveryBoy.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                email: true,
                phone: true,
                address: true,
                ratings: {
                    select: {
                        rating: true
                    }
                }
            }
        });

        // Calculate average rating for each delivery boy
        const deliveryBoysWithAvgRating = deliveryBoys.map(boy => {
            const averageRating = boy.ratings.length
                ? boy.ratings.reduce((sum, rating) => sum + rating.rating, 0) / boy.ratings.length
                : 0;
            return { ...boy, averageRating };
        });

        res.status(200).json(deliveryBoysWithAvgRating);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching delivery boys' });
    }
};

// Get detailed information for a specific delivery boy by ID
const getDeliveryBoyDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const deliveryBoy = await prisma.deliveryBoy.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                address: true,
                phone: true,
                bio: true,
                ratings: {
                    select: {
                        rating: true,
                        comment: true,
                    },
                },
                orders: {
                    select: {
                        id: true,
                        totalAmount: true,
                        requestStatus:true,
                        client: {
                            select: {
                                name: true,
                                address: true,
                            },
                        },
                        chef: {
                            select: {
                                name: true,
                                address: true,
                            },
                        },
                    },
                },
            },
        });

        if (!deliveryBoy) {
            return res.status(404).json({ error: 'Delivery boy not found' });
        }

        // Calculate the average rating
        const averageRating = deliveryBoy.ratings.length
            ? deliveryBoy.ratings.reduce((sum, r) => sum + r.rating, 0) / deliveryBoy.ratings.length
            : null;

        res.status(200).json({ ...deliveryBoy, averageRating });
    } catch (error) {
        console.error("Error fetching delivery boy details:", error); 
        res.status(500).json({ error: 'Error fetching delivery boy details' });
    }
};


module.exports = {
    getAllDeliveryBoys,
    getDeliveryBoyDetails
};
