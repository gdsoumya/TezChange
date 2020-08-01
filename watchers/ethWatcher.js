const getEthTransfers = require("../ethereum/get-transfers");
const completeEthTransfers = require("../ethereum/complete-transfers");
const gconfig = require("../config/global-config.json");
const payTez = require("../tezos_conseil/pay");

module.exports = async (web3) => {
  var date = new Date();
  var time = date.toLocaleTimeString();
  console.log(`[${time}]ETH WATCHER RUNNING`);
  const res = await getEthTransfers(web3);
  if (!res) {
    console.log("ERROR WITH ETH WATCHER");
  } else {
    //1GWEI to XTZ
    const convert = 1.0 / gconfig["1XTZ"];
    for (let i = 0; i < res.length; i++) {
      const rc = res[i];
      const tez = (rc.amt / Math.pow(10, 9)) * convert;
      await payTez(rc.addr, tez);
    }
    const complete = await completeEthTransfers(web3);
    if (complete) {
      console.log("TRANSFERS RESET ON ETHEREUM NET");
    } else {
      console.log("FAILED TO RESET TRANSFERS ON ETHEREUM NET");
    }
  }
};
