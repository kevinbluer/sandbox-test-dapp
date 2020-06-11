const fs = require('fs')
const path = require('path')

const networks = ['goerli', 'ropsten'];
// const networks = ['ropsten'];

const relPath = './app/src/deployed-contracts'
networks.forEach(network => {
  let fn = path.join(relPath, `${network}/SimpleStorage.json`)
  let data = fs.readFileSync(fn).toString()
  const json = JSON.parse(data)

  const filteredKeys = [ 'abi',
    'contractName',
    'networks',
    'schemaVersion',
  ]

  const filteredJson = filteredKeys.reduce((acc, key) => {
    return {...acc, [key]: JSON.parse(JSON.stringify(json[key]))}
  }, {})

  const output = JSON.stringify(filteredJson, null, 2)
  fs.writeFileSync(fn, output)

})
