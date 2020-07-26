const config = require("../config/eth-config.json");
const initAccount = require("./init-admin-account");
const BCInteract = require("./bc-intereraction");

const Deploy = async () => {
  const web3 = initAccount();
  const fees = "10000000000000000";
  var contractinstance = new web3.eth.Contract(config.abi);
  const data = contractinstance
    .deploy({
      data: config.byteCode,
      arguments: [fees],
    })
    .encodeABI();
  const rc = await BCInteract(web3, data, "0", "5000000", "", config.chain);
  console.log("CONTRACT ADDR : ", rc);
};

Deploy();
