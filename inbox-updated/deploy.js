// deploy code will go here
const HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3');
//const { interface, bytecode } = require('./compile');
const { abi, evm } = require('./compile');
const provider = new HDWalletProvider(
    'submit hybrid cattle panther april bar double message recall meadow expire click',
    'https://rinkeby.infura.io/v3/4116e263366a4eb0a7a49466bd60ecde'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON. parse(abi))
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()
};
deploy();
//to run the deploy:
//- node deploy.js