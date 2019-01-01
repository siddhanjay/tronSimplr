var fs = require('fs')
var path = require('path')
var MetaCoin = require('../build/contracts/MetaCoin')
var Simplr = require('../build/contracts/Simplr')

const address = MetaCoin.networks['2'].address
const address1 = Simplr.networks['2'].address

console.log('The app has been configured.')
console.log('Run "npm run dev" to start it.')

const tronboxJs = require('../tronbox').networks.shasta
const metacoinConfig = {
  contractAddress: address,
  privateKey: tronboxJs.privateKey,
  fullHost: tronboxJs.fullHost
}

const simplrConfig = {
  contractAddress: address1,
  privateKey: tronboxJs.privateKey,
  fullHost: tronboxJs.fullHost
}

fs.writeFileSync(path.resolve(__dirname, '../src/js/metacoin-config.js'),`var metacoinConfig = ${JSON.stringify(metacoinConfig, null, 2)}`)
fs.writeFileSync(path.resolve(__dirname, '../src/js/simplr-config.js'),`var simplrConfig = ${JSON.stringify(simplrConfig, null, 2)}`)
