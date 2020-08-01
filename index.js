const initEthAdminAccount = require("./ethereum/init-admin-account");
// const initTezAdminAccount = require("./tezos/init-admin-account");
const ethWatcher = require("./watchers/ethWatcher");
const tezWatcher = require("./watchers/tezConseilWatcher");
const init = require("./tezos_conseil/init");

const StartWatch = async () => {
  const web3 = initEthAdminAccount();
  // initTezAdminAccount();
  await init();
  var date = new Date();
  var time = date.toLocaleTimeString();
  console.log(`[${time}] WATCHERS SATRTED`);

  //Run every 5 min

  setInterval(() => {
    ethWatcher(web3);
  }, 300000);

  setInterval(() => {
    tezWatcher(web3);
  }, 300000);
};

StartWatch();
