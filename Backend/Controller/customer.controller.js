const customerModel = require('../Models/customer.model.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCustomer = async function (req, res) {

    try {
        const { fullname, email, password, phone } = req.body

        if (!email || !fullname || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: false,
                message: "Password too Short"
            })
        }

        const exsistingCustomer = await customerModel.findOne({ email })

        if (exsistingCustomer) {
            return res.status(409).json({
                status: false,
                message: "Email Already Used"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const customer = await customerModel.create({ fullname, email, password: hashedPassword, phone })

        const token = jwt.sign({ customerID: customer._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true
        })


        return res.status(201).json({
            status: true,
            message: "Customer registered successfully",
            customer: customer

        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Server Error"
        })
    }
}



exports.loginCustomer = async function (req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and Password are required"
            })
        }

        const customer = await customerModel.findOne({ email })

        if (!customer) {
            return res.status(401).json({
                status: false,
                message: "Customer Doesn't Exsist"
            })
        }

        const isPasswordMatching = await bcrypt.compare(password, customer.password)

        if (!isPasswordMatching) {
            return res.status(401).json({
                status: false,
                message: "Password Incorrect"
            })
        }

        const token = jwt.sign(
            { customerID: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            status: true,
            message: "Customer Login Successful",
            customer: customer
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Server Error"
        })
    }
}

exports.getMyProfile = async function (req, res) {

    res.status(200).json(req.user)
};

exports.changePassword = async function (req, res) {
    try {
        const { email, password ,newPassword} = req.body

        const userExsists = await customerModel.findOne({ email })

        if (!userExsists) {
            return res.status(400).json({
                status: false,
                message: "Account Doesn't Exsist"
            })
        }

        const passwordMatches = await bcrypt.compare(password, userExsists.password)

        if (!passwordMatches) {
            return res.status(400).json({
                status: false,
                message: "Wrong Password"
            })
        }

        const newUserPassword=await bcrypt.hash(newPassword,10)

        userExsists.password = newUserPassword

        await userExsists.save()

        res.status(200).json({
            status: true,
            message: "Password Changed Successfully"
        })



    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}


exports.logoutCustomer = async function (req, res) {

    res.clearCookie('token')

    return res.status(201).json({
        status: true,
        message: "Logged out Successfully"
    })
}
