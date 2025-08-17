import { Request, Response } from 'express';
import { WelcomeService } from '../services/WelcomeService';

class WelcomeController {
  public handle(request: Request, response: Response): Response {
    const welcomeService = new WelcomeService();

    const result = welcomeService.execute();
    return response.status(200).json(result);
  }
}

export { WelcomeController };