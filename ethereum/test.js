const config = require("../config/eth-config.json");
const initAccount = require("./init-admin-account");
const BCInteract = require("./bc-intereraction");

const Test = async (tezAcc, amtInEther) => {
  const web3 = initAccount();
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const data = await contractinstance.methods.transfer_tez(tezAcc).encodeABI();
  const rc = await BCInteract(
    web3,
    data,
    amtInEther,
    "1000000",
    config.contractAddr,
    config.chain
  );
  console.log("SUCCESS : ", rc);
};

Test("tz1TjCVuTLE7mHRJdS8GDYhtmjTu1eAncq8e", "0.04");
