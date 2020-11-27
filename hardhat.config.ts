require('dotenv').config()

import { HardhatUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-waffle'

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || ''
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY || ''

const config: HardhatUserConfig = {
  solidity: '0.7.3',
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [ROPSTEN_PRIVATE_KEY]
    }
  }
}

export default config
