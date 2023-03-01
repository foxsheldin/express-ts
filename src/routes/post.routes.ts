import express from "express";
import PostController from "../controllers/post.controller";

const router = express.Router();

router.post("/post", PostController.create);
router.get("/post", PostController.getAll);
router.get("/post/:id", PostController.getOne);
router.put("/post", PostController.update);
router.delete("/post/:id", PostController.delete);

export default router;
