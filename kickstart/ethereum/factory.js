import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xF777Ae78ca2a49461E1A2C2F9d5FC5f9af7aa3bd'
);
//'0xcA94e629D6139e61ce8848F94D85AF65Bb0B0514'
export default instance;