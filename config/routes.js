const express = require('express')
const controllers = require('../app/controllers')

const apiRouter = express.Router()

// Home
apiRouter.get('/', (req, res) => {
  console.log("Youre in Backend")
  res.status(201).send('<script>alert("INI BACKEND")</script>');
})

// Cars
apiRouter.get(
  process.env.GETCARS,
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.findcar,
)

/* AUTHENTICATION & AUTHORIZATION */

// login users
apiRouter.post(process.env.LOGIN, controllers.api.v1.authController.login)

// register user
apiRouter.post(process.env.REGISTER, controllers.api.v1.authController.register)

// logout user
//apiRouter.post('/api/v1/logout', controllers.api.v1.authController.logoutLocal)

//Checking sessionStorage
//apiRouter.get('/api/v1/sesi', controllers.api.v1.authController.getSesi)

// check current user
apiRouter.get(
  process.env.AUTHCHECK,
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.whoAmI,
)

// google login/register

apiRouter.post(
  process.env.GOOGLELOG,
  controllers.api.v1.authController.handleGoogleLoginOrRegister,
)

/*
// open Api
apiRouter.get("/api/v1/docs/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});
apiRouter.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

*/
apiRouter.use(controllers.api.main.onLost)
apiRouter.use(controllers.api.main.onError)

module.exports = apiRouter
