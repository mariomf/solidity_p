// contract test code will go here
const { equal } = require('assert');
const assert = require('assert');
const ganache = require('ganache-cli');
const { isTypedArray } = require('util/types');
//con mayuscula es una constructor function.
const Web3 = require('web3');

//in lower case means an instance 
                        //El provider es lo que nos conecta a la network
const web3 = new Web3(ganache.provider());
//const { interface, bytecode } = require('../compile');
const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
// Get a list of all accounts
    // web3.eth.getAccounts().then(fetchdAccounts => {
    //     console.log(fetchdAccounts);
    // });

    //async function
    accounts = await web3.eth.getAccounts();

    //Use one of those accounts to deploy
    //the contract
    //inbox = await new web3.eth.Contract(JSON.parse(interface))
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
        //.deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000'})
});

describe ('Inbox', () => {
    it('deploys a contract', () => {
        //console.log(inbox);
        assert.ok(inbox.options.address);//"ok" method it validate value
    });

    it('has a default messaage', async () => {
        //methods tiene todas las funciones publicas 
        //en este ejemplo es message()
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({/*who is paying*/from:accounts[0]})
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });

})



//Example Test
/*class Car {
    park(){
        return 'stop';
    }
    drive(){
        return 'vroom';
    }
}

let car;
beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        const car = new Car();
        assert.equal(car.park(), 'stop');

    });

    it('can drive', () => {
        const car = new Car();
        assert.equal(car.drive(), 'vroom');
    });
});*/