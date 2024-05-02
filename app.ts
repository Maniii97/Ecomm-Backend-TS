import express from 'express';
import { connectDB } from './configs/db';
import { config } from 'dotenv';
import productRoute from './routes/product-route';

config();            // Read the .env file

const PORT = process.env.PORT || 8888;

const app = express();      // Create an express application

app.use(express.json());    // Parse JSON bodies

app.set('view engine','ejs')
app.use(express.static('public'))

app.get("/",(_req, res)=>{
    res.sendFile(__dirname+'public/index.html')
})

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
