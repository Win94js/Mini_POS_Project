    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const dotenv = require('dotenv');

    // Load environment-specific .env file
    const env = process.env.NODE_ENV || 'development';
    dotenv.config({ path: `.env.${env}` });

    const app = express();
    app.use(cors({
        origin: "https://mini-pos-project-kdyf-554uoodku-win-94s-projects.vercel.app"
    }))
    app.use(express.json());



    //Middlewares
    const { authorizeRoles, authenticateJWT, authorize } = require('./Middlewares/authMiddlewares');
    //Router folders
    const authRouteV1 = require('../backend/Routes/V1/authRoutes');
    const adminRouteV1 = require('../backend/Routes/V1/adminRoutes');
    const productRouteV1 = require('../backend/Routes/V1/productRoutes');
    const unitRouteV1 = require('../backend/Routes/V1/unitRoutes');
    const orderRouteV1 = require('../backend/Routes/V1/orderRoutes');
    const billRouteV1 = require('../backend/Routes/V1/billRoutes')
    const tableRouteV1 = require('../backend/Routes/V1/tableRoutes')
    const customerRouteV1 = require('../backend/Routes/V1/customerAccountRoutes');


    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Mongo DB Connected."))
        .catch(err => console.log('error connecting in main server', err));


    // auth route
    app.use('/api/v1/auth', authRouteV1)
        //admin route & user permission
    app.use('/api/v1/user', adminRouteV1)
        // product route
    app.use('/api/v1/product', productRouteV1);
    // unit route
    app.use('/api/v1/unit', authenticateJWT, authorizeRoles, unitRouteV1);
    //order route
    app.use('/api/v1/order', orderRouteV1);
    //bill route
    app.use('/api/v1/bill', billRouteV1)
        //table route
    app.use('/api/v1/table', tableRouteV1)
        //customer route
    app.use('/api/v1/customer', authenticateJWT, authorizeRoles('manage_users'), customerRouteV1)
        // console.log('authenticatJWT',authenticateJWT, "authMiddlewear",authorizeRoles )

    const PORT = process.env.PORT || 5030;
    app.listen(PORT, () => console.log('server running in port', `${PORT} , (${env})`));