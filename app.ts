import express from 'express';
import { connectDB } from './configs/db';
import { config } from 'dotenv';
import productRoute from './routes/product-route';
import homeRoute from './routes/home-route';

config();

const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.json());    // Parse JSON bodies to all routes

app.set('view engine','ejs')
app.use(express.static('public'))

//Routes
app.use("/", homeRoute);     // Use the homeRoute for all routes starting with /
app.use("/api/products",productRoute);     // Use the productRoute for all routes starting with /api/products

app.all("*", (_req, _res) => {
    _res.status(404).send("Page Not Found");
  });

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();

export default app;
