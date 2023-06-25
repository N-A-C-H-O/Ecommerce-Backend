import { Router } from "express";

import CartsController from "../controllers/cartsController.js";

const cartRouter = Router();

cartRouter.get("/:cid", CartsController.getOne);

cartRouter.post("/", CartsController.post);

cartRouter.post("/:cid/product/:pid", CartsController.postOne);

cartRouter.post("/:cid/purchase", )

cartRouter.put("/:cid", CartsController.put);

cartRouter.put("/:cid/product/:pid", CartsController.putOne);

cartRouter.delete("/:cid", CartsController.delete);

cartRouter.delete("/:cid/product/:pid", CartsController.deleteOne);

export default cartRouter;
