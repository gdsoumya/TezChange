const config = require("../../config/eth-config.json");
const BCInteract = require("../bc-intereraction");
const initAdminAccount = require("../init-admin-account");
const gconfig = require("../../config/global-config.json");

const Deploy = async () => {
  const web3 = initAdminAccount();
  const fees = gconfig.ethFee;
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
