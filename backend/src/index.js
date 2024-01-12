const express = require('express');
const connectDB = require('./configs/connectDB');

// Route
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoute');
const brandRouter = require('./routes/brandRoute');
const colorRouter = require('./routes/colorRoute');
const sizeRouter = require('./routes/sizeRoute');
const couponRouter = require('./routes/couponRoute');
const uploadRouter = require('./routes/uploadRoute');
const contactRouter = require('./routes/contactRoute');
const roleRouter = require('./routes/roleRoute');
const blogRouter = require('./routes/blogRoute');
const conversationRouter = require('./routes/conversationRoute');
const messageRouter = require('./routes/messageRoute');
const permissionRouter = require('./routes/permissionRoute');

const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({ origin: 'https://frontend-gold-beta.vercel.app', methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(cors({ origin: true, methods: 'GET,POST,PUT,DELETE', credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use('/api/size', sizeRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/contact', contactRouter);
app.use('/api/role', roleRouter);
app.use('/api/blog', blogRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/message', messageRouter);
app.use('/api/permission', permissionRouter);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.listen(PORT, () => {
    console.log('Server is running at port:', PORT);
});
