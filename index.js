import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
import userRoutes from './routes/user.route.js';
import eventRoutes from './routes/event.route.js';


app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);



const PORT = process.env.PORT||8000;


app.get("/",(req,res) => {
    return res.status(200).json({message:"server is running"})
})

app.listen(PORT,() => {
    console.log(`server is running on port no ${PORT}`);
})
