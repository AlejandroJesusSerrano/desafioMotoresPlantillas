const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const PORT = 8080;
const Container = require('./public/class/container'); 
const routerProducts = require("./routes/products");
const products = "./files/products.json";
const af = new Container(products);


const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'index.hbs', 
    layoutsDir: __dirname + '/views/layout',
});    

app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'ejs');

//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerProducts);

routerProducts.get("/", (req, res) => {
    res.render("form");
});

routerProducts.post("/products", (req, res) => {
    af.save(req.body).res.redirect("/productsList");
});


routerProducts.get("/productsList", (req, res) => {
    af.getAll().then((product) => res.render("main", {
        allProducts: product, 
        listExists: true
        }));
});

routerProducts.get("/:id", (req, res) => {
    af.getById(req.params.id).then((product) => res.json(product))
});

routerProducts.put("/:id", (req, res) =>{
    af.update(req.params.id, req.body).then((product) => res.json(product))
});

routerProducts.delete("/:id", (req, res) =>{
    af.deleteById(req.params.id).then((product) => res.json(product))
});
    

const server = app.listen(PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
