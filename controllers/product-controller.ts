import product from "../models/product";

var getAllProducts = async (_req: any, res: any) => {
    try {
        const products = await product.find();     // Find all products
        res.json({
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: " Could not find data, try again or check server"
        });
    }
};

var createProduct = async (req: any, res: any) => {
    try {
        const newProduct = new product(req.body);
        await newProduct.save();
        res.json({
            success: true,
            message: "Product Created",
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not create product, check for Server Error" 
        });
    }
}

export default { getAllProducts, createProduct };