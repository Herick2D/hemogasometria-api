import { GasometryService } from '../GasometryService';
import { IGasometryValues } from '../../types/gasometry.types';

describe('GasometryService', () => {
  let gasometryService: GasometryService;

  beforeEach(() => {
    gasometryService = new GasometryService();
  });

  describe('Cenários Clínicos Principais', () => {
    it('deve diagnosticar o Paciente 1 como Alcalose Metabólica', () => {
      const patientData: IGasometryValues = { ph: 7.6, hco3: 30, pco2: 40 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Alcalose Metabólica');
    });

    it('deve diagnosticar o Paciente 2 como Acidose Respiratória', () => {
      const patientData: IGasometryValues = { ph: 7.2, hco3: 24, pco2: 50 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Acidose Respiratória');
    });

    it('deve diagnosticar o Paciente 3 como Alcalose Metabólica com compensação', () => {
      const patientData: IGasometryValues = { ph: 7.6, hco3: 30, pco2: 60 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Alcalose Metabólica com Acidose Respiratória Compensatória');
    });

    it('deve diagnosticar o Paciente 4 como Acidose Mista', () => {
      const patientData: IGasometryValues = { ph: 6.9, hco3: 10, pco2: 54 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Acidose Mista');
    });

    it('deve diagnosticar o Paciente 5 como Alcalose Mista', () => {
      const patientData: IGasometryValues = { ph: 7.6, hco3: 30, pco2: 30 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Alcalose Mista');
    });
  });

  describe('Cenários de Cobertura Total', () => {
    it('deve diagnosticar corretamente um estado de Equilíbrio Ácido-Base Normal', () => {
      const patientData: IGasometryValues = { ph: 7.4, hco3: 24, pco2: 40 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Equilíbrio Ácido-Base Normal');
    });

    it('deve diagnosticar uma Acidose Metabólica pura (sem compensação)', () => {
      const patientData: IGasometryValues = { ph: 7.2, hco3: 18, pco2: 40 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Acidose Metabólica');
    });

    it('deve diagnosticar uma Alcalose Respiratória pura (sem compensação)', () => {
      const patientData: IGasometryValues = { ph: 7.5, hco3: 24, pco2: 30 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Alcalose Respiratória');
    });
    
    it('deve diagnosticar uma Acidose Metabólica com compensação', () => {
      const patientData: IGasometryValues = { ph: 7.3, hco3: 15, pco2: 30 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Acidose Metabólica com Alcalose Respiratória Compensatória');
    });

    it('deve diagnosticar um estado Totalmente Compensado', () => {
      const patientData: IGasometryValues = { ph: 7.4, hco3: 30, pco2: 50 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Distúrbio Ácido-Base Totalmente Compensado');
    });

    it('deve retornar Indeterminado para casos não clássicos (caminho default)', () => {
      const patientData: IGasometryValues = { ph: 7.2, hco3: 24, pco2: 40 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Indeterminado');
    });

    it('deve diagnosticar uma Acidose Respiratória com compensação', () => {
      const patientData: IGasometryValues = { ph: 7.3, hco3: 28, pco2: 55 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Acidose Respiratória com Alcalose Metabólica Compensatória');
    });

    it('deve diagnosticar uma Alcalose Respiratória com compensação', () => {
      const patientData: IGasometryValues = { ph: 7.5, hco3: 20, pco2: 30 };
      const result = gasometryService.analyze(patientData);
      expect(result.diagnosis).toBe('Alcalose Respiratória com Acidose Metabólica Compensatória');
    });
  });
});