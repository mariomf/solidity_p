// deploy code will go here
const HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3');
//const { interface, bytecode } = require('./compile');
// const { abi, evm } = require('./compile');
/************************************************
* Ya no se hace la compilacion on the fly       *
* ahora se tiene los archivos de compliacion en * 
* el directorio de build                        *
*************************************************/
const compiledFactory = require('./build/CampaignFactory.json');
/****************************************************************************************
*ESTE ES EL MNEMONIC DE A ADDRESS DE METAMASK                                           *
* Ex.                                                                                   *
*   'submit hybrid cattle panther april bar double message recall meadow expire click'  *
*ESTAS SON API DE INFURA                                                                *
* Ex.                                                                                   *
*   'https://rinkeby.infura.io/v3/4116e263366a4eb0a7a49466bd60ecde'                     *
*   'https://sepolia.infura.io/v3/8f2d7c3d1e02431fa1a245dd917d5edd'                     *
*                                                                                       *
*The Truffle HDWallet provider is a convenient and easy to configure network connection *
*to ethereum through infura.io (or any other compatible provider).                      *
*For example the HDWallet provider add some features required by Truffle that are not   *
*available with infura like event filtering and transaction signing.                    *
*                                                                                       *
*****************************************************************************************/
const provider = new HDWalletProvider(
    'submit hybrid cattle panther april bar double message recall meadow expire click',
    'https://goerli.infura.io/v3/439fd4c604df4deab02faf63b48a47ce'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON. parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()
};
deploy();
//0xE4A6ead164593F52ec613F8350d0Eb1F565EDf64
/********************************************************************************
*             To run the deploy:                                                *
* - node deploy.js                                                              *
*  mariomucino@Marios-MacBook-Pro ethereum % node deploy.js                     *
*  Attempting to deploy from account 0xcF12CFaf08f1902bb39ededEEe20eA12669372D2 *
*  Contract deployed to 0x5853A7ec433Bb0a0c8188ADf953a3d2b6C9f1fE7              *
*********************************************************************************/