// ====== DEPENDENCIES ======
require('dotenv').config();
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express();
const port = 5000;

// ====== IMPORT ======
const productsController = require('./controllers/ProductsController');
const usersController = require('./controllers/UsersController');

// see env variables
// console.log(process.env);
// console.log(process.env.DB_USER);

// ====== MONGOOSE ======

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.set('useFindAndModify', false)


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

// import session package
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "app_session",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
  }))

app.use(setUserVarMiddleware)


// ====== PRODUCT ROUTES ======

// redirect main index to products
app.get('', productsController.redirectToMain)

// index route
app.get('/products', productsController.listProducts)

// new route
app.get('/products/new', productsController.newProduct)

// show route
// app.get('/products/:id', productsController.showProduct)
app.get('/products/:slug', productsController.showProduct)

// // create route
app.post('/products', productsController.createProduct)

// // edit route
// app.get('/products/:id/edit', productsController.editProduct)
app.get('/products/:slug/edit', productsController.editProduct)

// // update route
// app.patch('/products/:id', productsController.updateProduct)
app.patch('/products/:slug', productsController.updateProduct)

// // delete route
// app.delete('/products/:id', productsController.deleteProduct)
app.delete('/products/:slug', productsController.deleteProduct)


// ====== USER ON-BOARDING ROUTES ======
// apply guestOnlyMiddleware here

// user registration form route
app.get('/users/register', guestOnlyMiddleware, usersController.showRegistrationForm)

// user registration
app.post('/users/register', guestOnlyMiddleware, usersController.register)

// user login form route
app.get('/users/login', guestOnlyMiddleware, usersController.showLoginForm)

// user login route
app.post('/users/login', guestOnlyMiddleware, usersController.login)

// ====== USER-ONLY ROUTES ======

// user dashboard
// apply authenticatedMiddleware here
app.get('/users/dashboard', authenticatedOnlyMiddleware, usersController.dashboard)

// user logout
app.post('/users/logout', authenticatedOnlyMiddleware, usersController.logout)


// ====== LISTENER ======
mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(response => {
    // DB connected successfully
    console.log('DB connection successful')

    app.listen(process.env.PORT || port, () => {
      console.log(`Biscoff Bakery app listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })


// ====== MIDDLEWARE FOR LOGIN ======

function guestOnlyMiddleware(req, res, next) {
      // check if user is logged in
      // If logged in, redirect back to dashboard
      if (req.session && req.session.user) {
          res.redirect('/users/dashboard')
          return
      }
      next()
}

// for authenticated users only
function authenticatedOnlyMiddleware(req, res, next) {
    if(! req.session || ! req.session.user) {
      res.redirect('/users/login')
      return
    }
  
    next()
}

// logout middleware
function setUserVarMiddleware(req, res, next) {
    // default user template var set to null
    res.locals.user = null
  
    // check if req.session.user is set
    // if set, template user var will be set as well
    if (req.session && req.session.user) {
      res.locals.user = req.session.user
    }
  
    next()
  }

