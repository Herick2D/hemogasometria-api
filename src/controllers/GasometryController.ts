import { Request, Response } from "express";
import { z } from "zod";
import { GasometryService } from "@/services/GasometryService";

const analysisRequestSchema = z.object({
  patientValues: z.object({
    ph: z.number(),
    pco2: z.number(),
    hco3: z.number(),
  }),
  referenceValues: z
    .object({
      ph: z.number(),
      pco2: z.number(),
      hco3: z.number(),
    })
    .optional(),
});

class GasometryController {
  public handle(request: Request, response: Response): Response {
    try {
      const validation = analysisRequestSchema.safeParse(request.body);

      if (!validation.success) {
        return response.status(400).json({
          error: "Dados de entrada inválidos.",
          details: validation.error.flatten().fieldErrors,
        });
      }

      const { patientValues, referenceValues } = validation.data;

      const gasometryService = new GasometryService();
      const result = gasometryService.analyze(patientValues, referenceValues);

      return response.status(200).json(result);
    } catch (error) {
      console.error("Erro no GasometryController:", error);
      return response
        .status(500)
        .json({ error: "Ocorreu um erro interno no servidor." });
    }
  }
}

export { GasometryController };
