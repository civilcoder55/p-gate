import express from "express";
import merchantRouter from "./Routers/merchant.router";
import authRouter from "./Routers/auth.router";
import appRouter from "./Routers/app.router";
import checkoutRouter from "./Routers/checkout.router"
import _404 from "./Middlewares/404.middleware"
import _500 from "./Middlewares/internal.error.middleware"
import dbConnection from "./Database/mongoose"
import log from "./Logger";
import cors from "cors"

/**
 * init server
 */
const app = express();

/**
 * init database
 */
dbConnection()

/**
 *  app middleware
 */
app.use(express.json())

/**
 * init routers
 */
app.use(cors())
app.use(merchantRouter)
app.use(authRouter)
app.use(appRouter)
app.use(checkoutRouter)
app.use(_404) // for not exists routes
app.use(_500)
/**
 * start application
 */
app.listen(process.env.PORT as string || 3003, () => {
    log.info(`Server up and running on port ${process.env.PORT}`);
})