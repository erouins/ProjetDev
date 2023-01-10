const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const restaurantsRoute = require('./restaurants.route');
const restaurantRoute = require('./restaurant.route');
const clientRoute = require('./client.route');
const deliveryRoute = require('./delivery.route');


const router = express.Router();
const app = express();

app.get('/', (req, res) => res.send(`I'm online. All is OK !`));


app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'));

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/restaurant',
    route: restaurantRoute,
  },
    {
    path: '/restaurants',
    route: restaurantsRoute,
  },
  {
    path: '/client',
    route: clientRoute,
  },
  {
    path: '/delivery',
    route: deliveryRoute,
  }

];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
