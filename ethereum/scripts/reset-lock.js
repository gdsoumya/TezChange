const completeEthTransfers = require("../complete-transfers");
const config = require("../../config/eth-config.json");
const BCInteract = require("../bc-intereraction");
const initAdminAccount = require("../init-admin-account");

const Reset = async () => {
  const web3 = initAdminAccount();
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const lock = await contractinstance.methods.lock_contract().encodeABI();
  const rc = await BCInteract(
    web3,
    lock,
    "0",
    "1000000",
    config.contractAddr,
    config.chain
  );
  if (rc) {
    console.log("ETHEREUM CONTRACT LOCKED");
    const complete = await completeEthTransfers(web3);
    if (complete) {
      console.log("TRANSFERS RESET ON ETHEREUM NET");
    } else {
      console.log("FAILED TO RESET TRANSFERS ON ETHEREUM NET");
    }
  } else {
    console.log("ERROR SETTING LOCK IN ETHEREUM CONTRACT");
  }
};

Reset();
