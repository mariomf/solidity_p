//Compiler version --> 0.4.17+commit.bdeb9e52
//solidity version we are going to use in this file 
pragma solidity ^0.4.17;

//define first contrat
contract Inbox {
    //Al crear la variable message tambien se crea una funcion que se llama igual y te regresa el valor de esta variable
    //No se requiere la funcion getMessage()
    string public message; 
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    //view keyword specify if the function can't be modify
    //returns only used in view functions and set the type of value is going to be returned 
    ////function getMessage() public view returns (string) {
        ////return message;
    ////}
    
    /*funcion doMath(int a, int b){
        a + b;
        b - a;
        a * b;
        a == 0;
    }*/
}