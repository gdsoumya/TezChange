const getTezTransfers = require("../tezos/get-transfers");
const completeTezTransfers = require("../tezos/complete-transfers");
const gconfig = require("../config/global-config.json");
const payEth = require("../ethereum/pay");

module.exports = async (web3) => {
  var date = new Date();
  var time = date.toLocaleTimeString();
  console.log(`[${time}]TEZ WATCHER RUNNING`);
  const res = await getTezTransfers();
  if (!res) {
    console.log("ERROR WITH ETH WATCHER");
  } else {
    //1XTZ to GWEI
    const transfers = res["transfers"];
    const convert = gconfig["1XTZ"];
    for (let i = 0; i < transfers.length; i++) {
      const rc = transfers[i];
      const tez =
        ((rc["amount"].toNumber() / Math.pow(10, 6)) * convert) /
        Math.pow(10, 9);
      await payEth(web3, rc.address, tez.toString());
    }
    const complete = await completeTezTransfers();
    if (complete) {
      console.log("TRANSFERS RESET ON TEZOS NET");
    } else {
      console.log("FAILED TO RESET TRANSFERS ON TEZOS NET");
    }
  }
};
