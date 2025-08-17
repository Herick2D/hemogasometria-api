import { Router } from 'express';
import { WelcomeController } from '../controllers/WelcomeController';

const router = Router();

const welcomeController = new WelcomeController();

router.get('/', welcomeController.handle);

export { router };