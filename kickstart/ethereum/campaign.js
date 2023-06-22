import web3 from "./web3";
import Campaign from "./build/Campaign.json";

//Funcion con address dinamica para mandara a llamar cualquier contrato 
//usando su address
const campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};
export default campaign;