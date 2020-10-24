// ====== DEPENDENCIES ======
require('dotenv').config();
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express();
const port = 5000;

// see env variables
// console.log(process.env);
// console.log(process.env.DB_USER);

// ====== MONGOOSE ======

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.set('useFindAndModify', false)


// ====== IMPORT ======
const productsController = require('./controllers/ProductsController');


// ====== EXPRESS SETUP ======

// sets template engine to use
app.set('view engine', 'ejs')

// tells Express app where to find our static assets
app.use(express.static('public'))

// tells Express app to make use of the imported method-override library
app.use(methodOverride('_method'))

// tells Express app to parse incoming form requests,
// and make it available in req.body
app.use(express.urlencoded({
  extended: true
}))

// ====== ROUTES ======

// redirect main index to products
app.get('', productsController.redirectToMain)

// index route
app.get('/products', productsController.listProducts)

// new route
app.get('/products/new', productsController.newProduct)

// show route
app.get('/products/:id', productsController.showProduct)

// // create route
app.post('/products', productsController.createProduct)

// // edit route
app.get('/products/:id/edit', productsController.editProduct)

// // update route
app.patch('/products/:id', productsController.updateProduct)

// // delete route
app.delete('/products/:id', productsController.deleteProduct)



// ====== LISTENER ======
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    // DB connected successfully
    console.log('DB connection successful')

    app.listen(port, () => {
      console.log(`Biscoff Bakery app listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
