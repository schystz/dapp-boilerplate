import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import TokenArtifact from './contracts/Token.json'
import contractAddress from './contracts/contract-address.json'
import { Token as TokenContract } from './typechain/Token'

declare global {
  interface Window {
    ethereum: any
  }
}

type ContractInfo = {
  name: string
  totalSupply: number
}

function DApp() {
  const [contract, setContract] = useState<TokenContract | undefined>(undefined)
  const [contractInfo, setContractInfo] = useState<ContractInfo | undefined>(
    undefined
  )

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      provider.getSigner(0)
    ) as TokenContract

    setContract(token)
  }, [])

  useEffect(() => {
    if (!contract) return

    const getContractInfo = async () => {
      const name = await contract.name()
      const totalSupply = (await contract.totalSupply()).toNumber()

      setContractInfo({
        name,
        totalSupply
      })
    }

    getContractInfo()
      .then(() => console.log('allisgood'))
      .catch(err => console.error(err))
  }, [contract])

  return (
    <div className="DApp">
      {contractInfo && (
        <p>
          {contractInfo.name} has {contractInfo.totalSupply} total supply of
          tokens.
        </p>
      )}
    </div>
  )
}

export default DApp
