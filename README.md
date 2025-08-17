# API de Análise de Hemogasometria

![Node.js](https://img.shields.io/badge/Node.js-20.x+-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express)
![Jest](https://img.shields.io/badge/Jest-30.0.5-C21325?style=for-the-badge&logo=jest)

## Sobre o Projeto

Esta é uma API RESTful desenvolvida para fins acadêmicos, com o objetivo de analisar resultados de exames de hemogasometria e diagnosticar distúrbios do equilíbrio ácido-base. A aplicação recebe valores de pH, pCO2 (pressão parcial de dióxido de carbono) e HCO3- (bicarbonato) e retorna um diagnóstico completo, identificando se o paciente apresenta um estado de normalidade, um distúrbio primário (respiratório ou metabólico), compensado ou misto.

O projeto foi construído seguindo boas práticas de desenvolvimento, como arquitetura em camadas (Controllers, Services), testes unitários com alta cobertura e um ambiente de desenvolvimento robusto com TypeScript, ESLint e Prettier.

## Funcionalidades

- **Diagnóstico Ácido-Base:** Análise completa baseada nos valores de pH, pCO2 e HCO3-.
- **Identificação de Distúrbios:** Classifica os resultados em:
  - Equilíbrio Normal
  - Acidose/Alcalose Metabólica (com ou sem compensação respiratória)
  - Acidose/Alcalose Respiratória (com ou sem compensação metabólica)
  - Acidose/Alcalose Mista
- **Valores de Referência Customizáveis:** Permite que o usuário envie valores de referência personalizados junto com a requisição, oferecendo flexibilidade para diferentes padrões laboratoriais.
- **API Stateless:** Não requer autenticação e não armazena estado do usuário, tornando-a simples e escalável.

