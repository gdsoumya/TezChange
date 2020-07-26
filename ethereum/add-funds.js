const config = require("../config/eth-config.json");
const BCInteract = require("./bc-intereraction");
const initAdminAccount = require("../ethereum/init-admin-account");

const addFunds = async (amtInEth) => {
  const web3 = initAdminAccount();
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const data = await contractinstance.methods.add_funds().encodeABI();
  const rc = await BCInteract(
    web3,
    data,
    amtInEth,
    "1000000",
    config.contractAddr,
    config.chain
  );
  if (rc) {
    console.log("FUNDS ADDED SUCCESFULLY");
  } else {
    console.log("ERROR ADDING FUNDS");
  }
  return;
};

addFunds("0.15");
