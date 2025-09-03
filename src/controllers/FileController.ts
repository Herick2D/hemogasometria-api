import { Request, Response } from "express";
import path from "path";

class FileController {
  public downloadGuide(request: Request, response: Response): void {
    try {
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "assets",
        "guia-hemogasometria.pdf"
      );

      response.download(
        filePath,
        "Guia_Interpretativo_Hemogasometria.pdf",
        (err) => {
          if (err) {
            console.error("Erro ao baixar o arquivo:", err);
            response.status(404).json({ error: "Arquivo não encontrado." });
          }
        }
      );
    } catch (error) {
      console.error("Erro no FileController:", error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro interno no servidor." });
    }
  }

  public downloadBibliography(request: Request, response: Response): void {
    try {
      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "assets",
        "referencias.pdf"
      );
      response.download(filePath, "referencia.pdf", (err) => {
        if (err) {
          console.error("Erro ao baixar a referências:", err);
          response
            .status(404)
            .json({ error: "Arquivo de referência não encontrado." });
        }
      });
    } catch (error) {
      console.error("Erro no FileController (referências):", error);
      response
        .status(500)
        .json({ error: "Ocorreu um erro interno no servidor." });
    }
  }
}

export { FileController };
