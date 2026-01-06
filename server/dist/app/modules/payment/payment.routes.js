"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
/**
 * Create Stripe Checkout Session
 */
router.post("/trip/checkout-session", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), (0, validateRequest_1.validateRequest)(payment_validation_1.paymentZodSchema), payment_controller_1.PaymentController.createCheckoutSession);
/**
 * Stripe Webhook
 * NOTE: this route MUST use express.raw()
 */
router.post("/webhook", express_1.default.raw({ type: "application/json" }), payment_controller_1.PaymentController.stripeWebhook);
router.get("/", payment_controller_1.PaymentController.getPayments);
exports.PaymentRoutes = router;
