pragma solidity ^0.8.9;

contract Test {
    uint[] public myArray;

    constructor() {
        myArray.push(1);
        myArray.push(10);
        myArray.push(30);
    }

    //devuelve todo el arreglo completo
    function getMyArray() public view returns(uint[] memory){
        return myArray;
    }
    function getArrayLength() public view returns(uint){
        return myArray.length;
    }

    function getFirstElement() public view returns (uint) {
        return myArray[0];
    }
}