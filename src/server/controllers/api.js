import * as handlers from "./handlers";
import { Router } from "express";

const router = Router();
router.get("/", handlers.index);

export default router;