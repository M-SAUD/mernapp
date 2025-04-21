import express from 'express';
import dotenv from 'dotenv';    // import dotenv
import  path from 'path'; // import path
import { connectDB } from './config/db.js'; // import connectDB
import productRoutes from './routes/product.route.js'; // import productRoutes
dotenv.config();              // use dotenv

const app = express();
const PORT = process.env.PORT || 5000; // use PORT from env file

const __dirname = path.resolve(); // get current directory
app.use(express.json());// allow us to accecp josn data in body

app.use("/api/products",productRoutes); // use productRoutes

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); // serve static files from frontend/build
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html')); // serve index.html file
    });
}


app.listen(PORT, () => {
    connectDB();
  console.log('Server is running on http://localhost:'+PORT);
});
