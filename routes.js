import express from "express";

import auth from "./middleware/auth.js";

import {
  getOrders,
  createUser,
  createOrder,
  querySearch,
  uploadProducts,
  getOrder,
} from "./controllers/index.js";

const router = express.Router();

router.get("/get-orders/:name", getOrders);
router.get("/get-order/:id", getOrder);
router.post("/create-user/:name", createUser);
router.post("/create-order", createOrder);
router.post("/upload-products", uploadProducts);
router.get("/search/:query", querySearch);

export default router;
