import express from "express";
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import router from "./routes/product.js"
import path from 'path'
dotenv.config();


const port = process.env.PORT || 5000;
const __dirname = path.resolve()



export const app = express();

app.use(express.json())

app.use("/api/v1/products" , router)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname ,'/frontend/dist')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname , 'frontend', 'dist','index.html'))
    })
}
connectDB(process.env.MONGO_URI).then(() => {
    console.log("Database connected");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to connect to database:", error);
});