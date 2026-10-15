const jwt = require("jsonwebtoken");
const customerModel = require("../Models/customer.model.js");

exports.protect = async function (req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const customer = await customerModel.findById(
            decoded.customerID
        ).select("-password");

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Customer not found"
            });
        }

        req.user = customer;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid token"
        });
    }
};