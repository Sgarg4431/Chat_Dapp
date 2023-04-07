import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";

import Chat from "./artifacts/contracts/Chat.sol/Chat.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function App() {
  const ethers = require("ethers")
  const address = "0xdB68d6A8769b3E77D2BcbDaDADc1d9BC31bcB33B";
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [name, setName] = useState();
  const [a, setA] = useState();
  const [aa, setAA] = useState();
  const[msg, setMsg] = useState();
  const[aaa,setAAA]=useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    window.ethereum.on("accountChanged", async function (accounts) {
      setAccount(account[0]);
      await web3Handler();
    });
    loadContract(signer);
  };
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  const loadContract = async (signer) => {
    setContract(new ethers.Contract(address, Chat.abi, signer));
  };
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  const style3 = {
    marginLeft: "400px",
    marginRight: "100px",
  };
  const style4 = {
    marginLeft: "200px",
    marginRight: "100px",
  };
  async function createAccount() {
    if (contract) {
      try {
        await contract.createAccount(name);
      } catch (e) {
        if (e.message.search("Already has an account") != -1)
          alert("Already has an account ");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function addFriend() {
    if (contract) {
      try {
        await contract.addFriend(a);
      } catch (e) {
        if (e.message.search("User does not exists") != -1)
          alert("User does not exists ");
        else if (e.message.search("Self freind") != -1)
          alert("Self freind");
        else if (e.message.search("Already freinds") != -1)
          alert("Already freinds");
        else if (e.message.search("Freind does not exists") != -1)
          alert("Freind does not exists");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function sendMessage() {
    if (contract) {
      try {
        await contract.sendMessage(aa, msg);
      } catch (e) {
        if (e.message.search("User does not exists") != -1)
          alert("User does not exists ");
        else if (e.message.search("Not freinds or one sided friend") != -1)
          alert("Not freinds or one sided friend");
        else if (e.message.search("Freind does not exists") != -1)
          alert("Freind does not exists");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  async function readMessage() {
    if (contract) {
      try {
        await contract.readMessage(aaa);
      } catch (e) {
        if (e.message.search("User does not exists") != -1)
          alert("User does not exists ");
        else if (e.message.search("Not freinds or one sided friend") != -1)
          alert("Not freinds or one sided friend");
      }
    } else {
      alert("Connect to wallet first");
    }
  }
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>CHAT</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={web3Handler}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
      <br></br>
      <Row sm={1} md={2} className="g-4">
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>CREATE ACCOUNT</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                <br></br>
                <br></br>
                <Button onClick={createAccount}>Create</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>ADD FRIEND</Card.Title>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setA(e.target.value)}
                  placeholder="Enter Address"
                />
                <br></br>
                <br></br>
                <Button onClick={addFriend}>Add</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style3}>
          <Card>
            <Card.Body>
              <Card.Title>SEND MESSAGE</Card.Title>

              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setAA(e.target.value)}
                  placeholder="Enter Address Of Friend"
                />
                <br></br>
                <br></br>
                <input
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Enter Message"
                />
                <br></br>
                <br></br>
                <Button onClick={sendMessage}>Send</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm lg="2" style={style4}>
          <Card>
            <Card.Body>
              <Card.Title>READ MESSAGE</Card.Title>
              <br></br>
              <br></br>
              <Card.Text>
                <input
                  onChange={(e) => setAAA(e.target.value)}
                  placeholder="Enter Address"
                />
                <br></br>
                <br></br>
                <Button onClick={readMessage}>Read</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
