import { Request, Response } from 'express';
import { GasometryService } from '@/services/GasometryService';
import { IAnalysisRequest } from '@/types/gasometry.types';

class GasometryController {
  public handle(request: Request, response: Response): Response {
    try {
      const { patientValues, referenceValues }: IAnalysisRequest = request.body;
      if (
        !patientValues ||
        patientValues.ph === undefined ||
        patientValues.pco2 === undefined ||
        patientValues.hco3 === undefined
      ) {
        return response.status(400).json({
          //TODO: Melhorar a mensagem de erro;
          error: 'O objeto "patientValues" com as propriedades ph, pco2 e hco3 é obrigatório.',
        });
      }

      const gasometryService = new GasometryService();
      const result = gasometryService.analyze(patientValues, referenceValues);

      return response.status(200).json(result);

    } catch (error) {
      console.error('Erro no GasometryController:', error);
      return response.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    }
  }
}

export { GasometryController };