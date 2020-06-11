pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    event StorageSet(address caller, uint256 value);
    event CookieJarRaided(uint256 balance);
    event DonationReceived(uint256 donation);
    event NewGuest(address visitor);

    address public owner;
    uint256 public storedData;
    mapping(address => uint256) public donation;

    address[] public _guestList;
    mapping(address => uint256) public guestCount;

    uint256 public uniqueGuestCount;  // Unique addys that changed state
    uint256 public interactionCount;  // total interactions

    modifier signIn() {
        if (guestCount[msg.sender] == 0) {
            uniqueGuestCount += 1;
            _guestList.push(msg.sender);
            emit NewGuest(msg.sender);
        }
        guestCount[msg.sender] += 1;
        interactionCount += 1;
        _;
    }

    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }


    constructor() public {
        owner = msg.sender;
        // uniqueGuestCount = 1; // count creation
        // interactionCount = 1; //
        // _guestList.push(msg.sender);
    }

    function guestList() public view returns(address[] memory) {
        return _guestList;
    }

    // 0x60fe47b1
    function set(uint256 x) signIn public {
        require (x != storedData, "Duplicate value");

        storedData = x;
        emit StorageSet(msg.sender, x);
    }

    // 0xed88c68e
    function donate() signIn public payable {
        uint256 amount = msg.value;
        donation[msg.sender] += msg.value;
        emit DonationReceived(amount);
    }

    // 0x24a74467
    function cookieJar() onlyOwner signIn public {
        uint256 funds = address(this).balance;
        msg.sender.transfer(funds);
        emit CookieJarRaided(funds);
    }

    function fallback() payable external {}
}
