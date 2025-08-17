export interface IGasometryValues {
  ph: number;
  pco2: number;
  hco3: number;
}

export interface IAnalysisRequest {
  patientValues: IGasometryValues;
  referenceValues?: IGasometryValues;
}

export interface IAnalysisResult {
  diagnosis: string;
  primaryDisturbance: string;
  compensatoryDisturbance: string;
  details: string;
}