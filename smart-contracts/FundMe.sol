//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Functions to be implemented:
// 1) fund()
// 2) withdraw(uint amount)
// 3) getBalance()

// HAVE DEPLOYED IT ON REMIX IDE SO THERE'S NO USE OF THIS CONTRACT HERE BUT ADDED JUST INCASE SOMEONE WANTS TO VIEW IT :)
// COULD'VE GONE FOR FOUNDRY AND USED ANVIL BUT NOT REQUIRED FOR SUCH PROJECT 

error NotOwner();

contract FundMe{

    address public i_owner;
    mapping(address => uint) mapAddressToAmount;
    address[] public funders;

    constructor(){
        i_owner = msg.sender;
    }


    function fund() public payable{
        require(msg.value > 0, "you need to send more than 0");
        mapAddressToAmount[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    function withdraw() public onlyOwner {
        for(uint i = 0; i < funders.length; i++){
            address ad = funders[i];
            mapAddressToAmount[ad] = 0;
        }
        funders = new address[](0); // replaces old array with new empty one
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    function getBalance() view public returns (uint256){
        return address(this).balance;
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}