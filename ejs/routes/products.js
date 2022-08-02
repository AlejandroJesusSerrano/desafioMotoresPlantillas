const { Router } = require("express");

const routerProducts = Router();

routerProducts.get("api/products/", (req, res) => {
    res.json({ msj: "aprendiendo Router" });
});

module.exports = routerProducts;
