const config = require("./config.json");
const BCInteract = require("./bc-intereraction");
const initAdminAccount = require("../ethereum/init-admin-account");

const drainFunds = async () => {
  const web3 = initAdminAccount();
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const data = await contractinstance.methods.drain().encodeABI();
  const rc = await BCInteract(
    web3,
    data,
    "0",
    "1000000",
    config.contractAddr,
    config.chain
  );
  if (rc) {
    console.log("FUNDS DRAINED SUCCESFULLY");
  } else {
    console.log("ERROR DRAINING FUNDS");
  }
  return;
};

drainFunds();
