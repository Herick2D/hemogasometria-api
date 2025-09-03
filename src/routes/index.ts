import { Router } from "express";
import { WelcomeController } from "../controllers/WelcomeController";
import { GasometryController } from "../controllers/GasometryController";
import { FileController } from "@/controllers/FileController";

const router = Router();

const welcomeController = new WelcomeController();
const gasometryController = new GasometryController();
const fileController = new FileController();

router.get("/", welcomeController.handle);

router.post("/analyze", gasometryController.handle);
router.get("/download/guide", fileController.downloadGuide);
router.get("/download/bibliography", fileController.downloadBibliography);

export { router };
