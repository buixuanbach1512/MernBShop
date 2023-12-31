const express = require('express');
const connectDB = require('./configs/connectDB');
const User = require('./models/userModel');

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

const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const OAuth20 = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:5174', methods: 'GET,POST,PUT,DELETE', credentials: true }));
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://frontend-gold-beta.vercel.app/");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(
//     session({
//         secret: '15122001buixuanbach',
//         resave: false,
//         saveUninitialized: true,
//     }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//     new OAuth20(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             callbackURL: '/api/auth/google/callback',
//             scope: ['profile', 'email'],
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             console.log('profile', profile);
//             try {
//                 let user = await User.findOne({ googleId: profile.id });
//                 if (!user) {
//                     user = new User({
//                         googleId: profile.id,
//                         name: profile.displayName,
//                         email: profile.emails[0].value,
//                     });
//                     await user.save();
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error, null);
//             }
//         },
//     ),
// );
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get(
//     '/api/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: 'http://localhost:5174/',
//         failureRedirect: 'http://localhost:5174/login',
//     }),
// );

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

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.listen(PORT, () => {
    console.log('Server is running at port:', PORT);
});
