    // SPDX-License-Identifier: MIT
     
    pragma solidity ^0.8.11;
     
    contract Lottery {
        // global variable to store manager address
        address public manager;
        // global variable to store players addresses which are payable
        address payable[] public players;
     
        constructor() {
            // manager is the person who deployed the contract
            manager = msg.sender;
        }
     
        /** Function to return all players separated by a comma **/
        function getPlayers() public view returns (address payable[] memory) {
            return players;
        }
     
        /** Function to return the amount of eth in the lottery contract **/
        function getPrize() public view returns (uint) {
            // .balance is the total eth sent to this contract.
            return address(this).balance;
        }
     
        /** Function to enter in the lottery **/
        function enter() public payable {
            // check if the player hasn't already registered to the lottery
            for (uint i = 0; i < players.length; i++) require(msg.sender != players[i], '409: the player has already registered to the lottery.');
     
            // check if we send the good amount of ether to enter in the lottery
            require(msg.value == 1 ether, '402: the amount to participate is 1 ether.');
     
            // add the address of the player in the array
            players.push(payable(msg.sender));
        }
     
        /** Function to pick the winner **/
        function pickWinner() public payable restricted {
            // get randomly a player then send to him the money
            // doesn't call a function to generate random number but put code directly here to have less gas fees
            players[uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))) % players.length].transfer(address(this).balance);
     
            // reset players array to be ready for next round
            delete players;
        }
     
        /** Modifier function to check if the user is the manager **/
        modifier restricted() {
            // check if the person calling the function is the manager
            require(msg.sender == manager, '403: call restricted to manager.');
     
            // place holder to inject code inside when the modifier is used in a function
            _;
        }
    }