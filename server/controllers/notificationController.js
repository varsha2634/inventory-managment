const Product = require("../models/Product");

// Get notifications (e.g., low stock alerts)
const getNotifications = async (req, res) => {
  try {
    // Use MongoDB aggregation to find products with stockLevel < reorderPoint
    const lowStockProducts = await Product.aggregate([
      {
        $match: {
          $expr: { $lt: ["$stockLevel", "$reorderPoint"] }, // Compare fields
        },
      },
    ]);

    // Create notifications for each low-stock product
    const notifications = lowStockProducts.map((product) => ({
      message: `Low stock alert for product: ${product.name}. Current stock: ${product.stockLevel}, reorder point: ${product.reorderPoint}`,
    }));

    // Respond with the notifications
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

module.exports = { getNotifications };
