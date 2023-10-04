export class HashManagerMock {
    public hash = async (
      plaintext: string
    ): Promise<string> => {
      return "hash-mock"
    }
    public compare = async (
      plaintext: string,
      hash: string
    ): Promise<boolean> => {
      switch(plaintext) {
        case "Fulano123@":
          return hash === "hash-mock-fulano"
        case "Astrodev99@":
          return hash === "hash-mock-astrodev"          
        default:
          return false
      }
    }
}