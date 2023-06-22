import Web3 from "web3";
     
//window es una variable que hace disponible metamask 
//si no tienes metamask instalado esta variable no existe en el borwser.
// const web3 = new Web3(window.ethereum);

let web3;

//typeof to check if the variable is define 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
      //infura es nuestro propio provider para no usar o depender de 
      //metamask.
    "https://goerli.infura.io/v3/439fd4c604df4deab02faf63b48a47ce"
    //"https://sepolia.infura.io/v3/8f2d7c3d1e02431fa1a245dd917d5edd"
    //"https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
    // 'https://rinkeby.infura.io/v3/4116e263366a4eb0a7a49466bd60ecde'
    //infura es solo como un portal a la red de ethereum
    //no tiene info de cuentas ni nada
  );
  web3 = new Web3(provider);
}

 
export default web3;