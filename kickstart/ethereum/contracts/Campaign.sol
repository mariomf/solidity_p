pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    //view functions means that we are NOT changing any data
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    //Storage variables
    Request[] public requests;
    //public para que todo mundo pueda ver el address
    address public manager;
    uint public minimumContribution;
    uint public approversCount;
    
    mapping(address => bool) public approvers;

    //modifier to lock functionality
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    //constructor(uint minimum) public {
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        //approvers.push(msg.sender);
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted{
        //Instance creation syntax
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount:0
            //los mapping no se deben inicializar
        });

        //altern syntax
        //Request(description, value, recipient, false);
        
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    //funcion para regresar solo informacion general de la campaña
    //se define como "view" porque no se va a modificar nada, solo 
    //se va consultar informacion.                  Return types
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}
