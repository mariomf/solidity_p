const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');//short of 'file system' plus extra functions

const buildPath = path.resolve(__dirname, 'build');
//DELETE ENTIRE 'build' FOLDER
//removeSync is an extra function from fs-extra
fs.removeSync(buildPath);
//READ 'Campaign.sol' FROM THE 'contracts' FOLDER
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
//COMPILE BOTH CONTRACTS WITH SOLIDITY COMPILER
//Solidity compiler. Compile 2 contracts and put them in output variable.
const output = solc.compile(source, 1).contracts;

//check if the dir exist if not it create it.
fs.ensureDirSync(buildPath);

// WRITE OUTPUT TO THE 'build' DIRECTORY
//console.log(output);
//For para escribir el contendio ed cada uno de los contratos en lo
//files que corresponden en el 'build' directory.
for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}
