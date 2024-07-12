const express =require('express');
const dotenv =require('dotenv');
const cors =require('cors');
const AuthRoute =require('./route/authRoutes.js');
const {  mongoose } = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swagger.js');
dotenv.config();

const app =express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT 

app.get('/',(req,res)=>{
    res.send("Api is running...")
})
app.use('/api',AuthRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URL);

const connectDB = mongoose.connection;

connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
connectDB.once('open', () => {
    console.log('MongoDB connected successfully!');
});
app.listen(port,connectDB,
    console.log(`server is running on port ${port}`)
)
