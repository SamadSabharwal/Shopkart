const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const customerRoutes = require("./Routes/customer.routes.js");
const productRoutes = require("./Routes/product.routes.js");

dotenv.config();

const app = express();
const port = 8084;

mongoose.connect(process.env.dbURL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(cookieParser());

app.use("/customer", customerRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
