import { Request, Response } from 'express';
import { GasometryService } from '@/services/GasometryService';
import { IAnalysisRequest } from '@/types/gasometry.types';

class GasometryController {
  public handle(request: Request, response: Response): Response {
    try {
      const { patientValues, referenceValues }: IAnalysisRequest = request.body;

      if (!patientValues) {
        return response.status(400).json({
          error: 'Requisição inválida.',
          details: 'O objeto "patientValues" é obrigatório no corpo da requisição.',
        });
      }

      const missingFields: string[] = [];
      if (patientValues.ph === undefined) missingFields.push('ph');
      if (patientValues.pco2 === undefined) missingFields.push('pco2');
      if (patientValues.hco3 === undefined) missingFields.push('hco3');

      if (missingFields.length > 0) {
        return response.status(400).json({
          error: 'Dados incompletos.',
          details: `Os seguintes campos são obrigatórios dentro de "patientValues": ${missingFields.join(', ')}.`,
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