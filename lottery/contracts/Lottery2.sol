pragma solidity ^0.4.17;       //make change here
contract Lottery{
    address public manager;
    address[] public players;

    function Lottery()public{
        manager = msg.sender;
    }                              // use this instead of using constructor

    function enter() public payable{
        require(msg.value>.1 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint){
      return uint(keccak256(block.difficulty, now, players));
    }                                    // make change here 

    function pickWinner()public{
        require(msg.sender==manager);
       uint index = random() % players.length;
       players[index].transfer(address(this).balance);
       players = new address[](0);
    }
    function getPlayers()public view returns(address[]){
        return players;
    }
}