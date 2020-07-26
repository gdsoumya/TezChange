const config = require("./config.json");
const BCInteract = require("./bc-intereraction");

module.exports = async (web3) => {
  var contractinstance = new web3.eth.Contract(config.abi, config.contractAddr);
  const lock = await contractinstance.methods.complete_transfers().encodeABI();
  const rc = await BCInteract(
    web3,
    lock,
    "0",
    "1000000",
    config.contractAddr,
    config.chain
  );
  return rc;
};
