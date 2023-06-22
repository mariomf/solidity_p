pragma solidity ^0.4.17;
//pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    //se usa para no repetir y se usa como comodin en el codigo 
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers()  public view returns (address[] memory) {
        return players;
    }
    
}   