import { Router } from 'express';
import { WelcomeController } from '../controllers/WelcomeController';
import { GasometryController } from '../controllers/GasometryController';

const router = Router();

const welcomeController = new WelcomeController();
const gasometryController = new GasometryController();

router.get('/', welcomeController.handle);

router.post('/analyze', gasometryController.handle);

export { router };