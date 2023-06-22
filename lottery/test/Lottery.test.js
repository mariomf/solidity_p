const assert = require("assert");
// ganach is our localtest network to test

const ganache = require("ganache-cli");
const Web3 = require("web3");
// The provider its what allow us to conect to the network
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');
//contract
let lottery;
//list of accounts
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Lottery Contract", () => {
    //Cada statement it prueba algo del contrato
  it("deploys a contract", () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
      await lottery.methods.enter().send({
          from: accounts[0],//from es quien esta mandando a llamar este methodo
          value: web3.utils.toWei('0.02', 'ether')//web3 library converter
      });

      const players = await lottery.methods.getPlayers().call({
          from: accounts[0]
      });

      assert.equal(accounts[0], players[0]);
      assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.02', 'ether')//web3 library converter
    });
    await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.02', 'ether')//web3 library converter
    });
    await lottery.methods.enter().send({
        from: accounts[2],
        value: web3.utils.toWei('0.02', 'ether')//web3 library converter
    });

    const players = await lottery.methods.getPlayers().call({
        from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
    });

    it('requires a minimum amoutn of ether to enter', async () => {
        try {
            await lottery.methods.enter.send({
                from: accounts[0],
                value: 200  //200 Wei
            });
            assert(false);//si llega a pasar el try sin error, aqui se forzaria el error
        } catch (err) {
            // assert.ok(err);//.ok method assuer al value is pass to this function
            assert(err);
        }
    });

    it('only manager can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);//si llega a pasar el try sin error, aqui se forzaria el error
        } catch (err) {
            // assert.ok(err);//.ok method assuer al value is pass to this function
            assert(err);
        }
    });

    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')//web3 library converter
        });

        const initialBalance  = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]

        })
        
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] });

        //la diferencia en la vida real debe ser menos de 2 eth ya que se gasta un algo 
        //el gas por transaccion
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;
        const gas = web3.utils.toWei('2', 'ether') - difference;
        const twoEther = web3.utils.toWei('2', 'ether');
        console.log('2 ether en Wei = ' + twoEther);
        console.log('el gas que se gasto ' + gas);
        assert(difference > web3.utils.toWei('1.8', 'ether'));

    });

});