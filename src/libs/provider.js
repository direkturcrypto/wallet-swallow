import {ethers} from "ethers"

class Provider {
  provider
  network
  wallet
  privateKey
  balance

  constructor(privateKey, network) {
    this.privateKey = privateKey
    this.network = network
    this.provider = new ethers.providers.JsonRpcProvider(this.network.rpcUrl)
    this.wallet = new ethers.Wallet(this.privateKey, this.provider)
  }

  async getBalance () {
    const balance = await this.provider.getBalance(this.wallet.address)
    this.balance = ethers.utils.formatEther(balance)
    return this.balance
  }
}

export default Provider