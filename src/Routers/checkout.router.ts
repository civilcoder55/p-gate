import express from "express";
import { CheckoutController } from "../Controllers/checkout.controller";
import validate from "../Middlewares/validate.middleware"
import { requestCheckoutSchema, CheckoutPaySchema } from "../Schemas/checkout.schema";

const controller = new CheckoutController();

const router: express.IRouter = express.Router();

router.post("/api/checkout", validate(requestCheckoutSchema), controller.create);
router.get("/api/checkout/:id", controller.get);
router.post("/api/checkout/:id/pay", validate(CheckoutPaySchema), controller.pay);

export default router
