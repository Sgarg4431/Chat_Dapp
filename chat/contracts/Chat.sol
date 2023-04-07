// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
struct message {
    address sender;
    address reciever;
}
struct User {
    string name;
    string messageSent;
    string messageRecieved;
    address u;
    address[] friends;
}

contract Chat {
    User[] users;
    mapping(address => string[]) messages;

    function existUser(address a) private view returns (int256) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].u == a) return int256(i);
        }
        return -1;
    }

    function existsFriend(address _user, address _friend)
        private
        view
        returns (int256)
    {
        int256 x = existUser(_user);
        require(x != -1, "User is not there");
        for (uint256 i = 0; i < users[uint256(x)].friends.length; i++) {
            if (users[uint256(x)].friends[i] == _friend) return int256(i);
        }
        return -1;
    }

    function createAccount(string memory _name) external {
        int256 x = existUser(msg.sender);
        require(x == -1, "Already has an account");
        User memory user;
        user.name = _name;
        user.u = msg.sender;
        users.push(user);
    }

    function addFriend(address _friend) external {
        int256 x = existUser(msg.sender);
        require(x != -1, "User does not exists");
        require(msg.sender != _friend, "Self freind");
        int256 y = existsFriend(users[uint256(x)].u, _friend);
        require(y == -1, "Already freinds");

        int256 z = existUser(_friend);
        require(z != -1, "Freind does not exists");
        users[uint256(x)].friends.push(_friend);
    }

    function getFriendList() external view returns (address[] memory) {
        int256 x = existUser(msg.sender);
        require(x != -1, "User does not exist");
        return users[uint256(x)].friends;
    }

    function sendMessage(address _friend, string calldata _msg) external {
        int256 x = existUser(msg.sender);
        require(x != -1, "User does not exists");
        int256 y = existsFriend(users[uint256(x)].u, _friend);
        require(y != -1, "Not freinds or one sided friend");
        int256 z = existUser(_friend);
        require(z != -1, "Freind does not exists");
        messages[msg.sender].push(_msg);
    }

    function readMessage(address friend)
        external
        view
        returns (string[] memory)
    {
        int256 x = existUser(msg.sender);
        require(x != -1, "User does not exists");
        int256 y = existsFriend(users[uint256(x)].u, friend);
        require(y != -1, "Not freinds or one sided friend");
        return messages[friend];
    }
}
