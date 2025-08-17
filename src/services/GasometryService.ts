import { IGasometryValues, IAnalysisResult } from '@/types/gasometry.types';

const defaultReferenceValues: IGasometryValues = {
  ph: 7.4,
  pco2: 40,
  hco3: 24,
};

class GasometryService {
  public analyze(
    patientValues: IGasometryValues,
    referenceValues: IGasometryValues = defaultReferenceValues
  ): IAnalysisResult {
    const { ph, pco2, hco3 } = patientValues;
    const ref = referenceValues;

    const phState = ph < ref.ph ? 'acidemia' : ph > ref.ph ? 'alcalemia' : 'normal';
    const pco2State = pco2 > ref.pco2 ? 'alto' : pco2 < ref.pco2 ? 'baixo' : 'normal';
    const hco3State = hco3 > ref.hco3 ? 'alto' : hco3 < ref.hco3 ? 'baixo' : 'normal';

    switch (true) {
      // --- DISTÚRBIOS MISTOS ---
      case phState === 'acidemia' && pco2State === 'alto' && hco3State === 'baixo':
        return {
          diagnosis: 'Acidose Mista',
          primaryDisturbance: 'Acidemia (pH baixo)',
          compensatoryDisturbance: 'Nenhum (Distúrbio Misto)',
          details: 'O pH está ácido. Tanto o pCO2 elevado quanto o HCO3- baixo estão contribuindo para a acidose.',
        };
      case phState === 'alcalemia' && pco2State === 'baixo' && hco3State === 'alto':
        return {
          diagnosis: 'Alcalose Mista',
          primaryDisturbance: 'Alcalemia (pH elevado)',
          compensatoryDisturbance: 'Nenhum (Distúrbio Misto)',
          details: 'O pH está alcalino. Tanto o pCO2 baixo quanto o HCO3- elevado estão contribuindo para a alcalose.',
        };

      // --- DISTÚRBIOS RESPIRATÓRIOS ---
      case phState === 'acidemia' && pco2State === 'alto' && hco3State === 'alto':
        return {
          diagnosis: 'Acidose Respiratória com Alcalose Metabólica Compensatória',
          primaryDisturbance: 'Acidemia (pH baixo)',
          compensatoryDisturbance: 'Alcalose Metabólica (HCO3- elevado)',
          details: 'O pH ácido é primariamente causado pelo aumento do pCO2. O sistema metabólico está compensando ao reter HCO3-.',
        };
      case phState === 'acidemia' && pco2State === 'alto':
        return {
          diagnosis: 'Acidose Respiratória',
          primaryDisturbance: 'Acidemia (pH baixo)',
          compensatoryDisturbance: 'Nenhuma',
          details: 'O pH ácido é causado pelo aumento do pCO2, sem compensação metabólica aparente.',
        };
      case phState === 'alcalemia' && pco2State === 'baixo' && hco3State === 'baixo':
        return {
          diagnosis: 'Alcalose Respiratória com Acidose Metabólica Compensatória',
          primaryDisturbance: 'Alcalemia (pH elevado)',
          compensatoryDisturbance: 'Acidose Metabólica (HCO3- baixo)',
          details: 'O pH alcalino é primariamente causado pela queda do pCO2. O sistema metabólico está compensando ao eliminar HCO3-.',
        };
      case phState === 'alcalemia' && pco2State === 'baixo':
        return {
          diagnosis: 'Alcalose Respiratória',
          primaryDisturbance: 'Alcalemia (pH elevado)',
          compensatoryDisturbance: 'Nenhuma',
          details: 'O pH alcalino é causado pela queda do pCO2, sem compensação metabólica aparente.',
        };

      // --- DISTÚRBIOS METABÓLICOS ---
      case phState === 'acidemia' && hco3State === 'baixo' && pco2State === 'baixo':
        return {
          diagnosis: 'Acidose Metabólica com Alcalose Respiratória Compensatória',
          primaryDisturbance: 'Acidemia (pH baixo)',
          compensatoryDisturbance: 'Alcalose Respiratória (pCO2 baixo)',
          details: 'O pH ácido é primariamente causado pela queda de HCO3-. O sistema respiratório está compensando ao diminuir o pCO2.',
        };
      case phState === 'acidemia' && hco3State === 'baixo':
        return {
          diagnosis: 'Acidose Metabólica',
          primaryDisturbance: 'Acidemia (pH baixo)',
          compensatoryDisturbance: 'Nenhuma',
          details: 'O pH ácido é causado pela queda do HCO3-, sem compensação respiratória aparente.',
        };
      case phState === 'alcalemia' && hco3State === 'alto' && pco2State === 'alto':
        return {
          diagnosis: 'Alcalose Metabólica com Acidose Respiratória Compensatória',
          primaryDisturbance: 'Alcalemia (pH elevado)',
          compensatoryDisturbance: 'Acidose Respiratória (pCO2 elevado)',
          details: 'O pH alcalino é primariamente causado pelo aumento do HCO3-. O sistema respiratório está compensando ao reter pCO2.',
        };
      case phState === 'alcalemia' && hco3State === 'alto':
        return {
          diagnosis: 'Alcalose Metabólica',
          primaryDisturbance: 'Alcalemia (pH elevado)',
          compensatoryDisturbance: 'Nenhuma',
          details: 'O pH alcalino é causado pelo aumento do HCO3-, sem compensação respiratória aparente.',
        };

      // --- ESTADOS NORMAIS OU TOTALMENTE COMPENSADOS ---
      case phState === 'normal':
        if (pco2State === 'normal' && hco3State === 'normal') {
          return {
            diagnosis: 'Equilíbrio Ácido-Base Normal',
            primaryDisturbance: 'Nenhum',
            compensatoryDisturbance: 'Nenhuma',
            details: 'Os parâmetros de pH, pCO2 e HCO3- estão dentro dos valores de referência.',
          };
        }
        return {
          diagnosis: 'Distúrbio Ácido-Base Totalmente Compensado',
          primaryDisturbance: 'pH normalizado por compensação',
          compensatoryDisturbance: 'Ativa',
          details: 'O pH está normal, mas as alterações no pCO2 e HCO3- indicam distúrbios primários que foram totalmente compensados.',
        };

      // --- RETORNO PADRÃO ---
      default:
        return {
          diagnosis: 'Indeterminado',
          primaryDisturbance: 'Não foi possível classificar o distúrbio',
          compensatoryDisturbance: 'N/A',
          details: 'Os valores fornecidos não se encaixam nos padrões clássicos de distúrbios ácido-base.',
        };
    }
  }
}

export { GasometryService };