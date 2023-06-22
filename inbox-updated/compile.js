// compile code will go here
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
   
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Inbox.sol'
].Inbox;
//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);

//console.log(solc.compile(source, 1));

//to compile and inmediatly have access to complie source code
//module.exports = solc.compile(source, 1).contracts[':Inbox'];