pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


contract TezChange {

    struct PayTo{
        string addr;
        uint amt;
    }
    
    address payable private owner;
    uint funds;
    uint public fee;
    bool lock;
    PayTo[] public transfers;

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    constructor(uint fees) public {
        owner = msg.sender;
        funds = 0;
        lock=false;
        fee=fees;
    }

    function add_funds()public payable isOwner{
        funds+=msg.value;
    }
    
    function drain()public isOwner{
        funds=0;
        owner.transfer(address(this).balance);
    }
    
    function pay_recipient(address payable addr, uint amt)public isOwner{
        require(funds>=amt);
        funds=funds-amt;
        addr.transfer(amt);
    }
    
    function transfer_tez(string memory rc)public payable{
        require(msg.value>fee && !lock);
        transfers.push(PayTo({
            addr:rc,
            amt:msg.value-fee
        }));
    }
    
    function complete_transfers()public isOwner{
        require(lock);
        delete transfers;
        lock=false;
    }
    
    function lock_contract()public isOwner{
        lock=true;
    }
    
    function get_pending_transfers()public view isOwner returns(PayTo[] memory){
        require(lock);
        return transfers;
    }
}