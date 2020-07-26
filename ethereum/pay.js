const config = require("../config/eth-config.json");
const BCInteract = require("./bc-intereraction");

module.exports = async (web3, rc, ether) => {
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const weiValue = web3.utils.toWei(ether, "ether").toString();
  const data = await contractinstance.methods
    .pay_recipient(rc, weiValue)
    .encodeABI();
  const status = await BCInteract(
    web3,
    data,
    "0",
    "1000000",
    config.contractAddr,
    config.chain
  );
  return status;
};
