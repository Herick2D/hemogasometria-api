interface IWelcomeMessage {
  message: string;
}

class WelcomeService {
  public execute(): IWelcomeMessage {
    return { message: 'Bem-vindo à hemogasometria API!' };
  }
}

export { WelcomeService };