const moment = require('moment');
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

router.post('/create_payment_url', function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');

    let tmnCode = 'TC59NATY';
    let secretKey = 'QUKDKKNOATQJURXAADEBNAZDBMVVOSPF';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let returnUrl = 'http://localhost:5000/api/vnpay/vnpay_ipn';
    let orderId = req.body.orderId;
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;

    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.send(vnpUrl);
});

router.get('/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var config = require('config');
    var tmnCode = 'TC59NATY';
    var secretKey = 'QUKDKKNOATQJURXAADEBNAZDBMVVOSPF';

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        const filter = { orderId: orderId };
        const update = {
            payment: 'Thanh toán qua VNPay',
        };
        // const updateOrder = Order.findOneAndUpdate(filter, update, {
        //     new: true,
        // });
        const connectDB = require('../configs/connectDB');
        connectDB();
        const order = Order.findOne(filter);
        console.log(order);

        res.redirect('http://localhost:5174/order');
    } else {
        res.json('success', { code: '97' });
    }
});

router.get('/vnpay_ipn', async function (req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = 'QUKDKKNOATQJURXAADEBNAZDBMVVOSPF';
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require('crypto');
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        const filter = { orderId: orderId };
        const update = {
            payment: 'Thanh toán qua VNPay',
        };
        const updateOrder = await Order.findOneAndUpdate(filter, update, {
            new: true,
        });
        res.redirect('http://localhost:5174/order');
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
    }
});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
module.exports = router;
