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

  let status = false; //status shows whether either of the watchers are running or not

  //Run every 5 min if not already running
  setInterval(() => {
    if (!status) {
      status = true;
      ethWatcher(web3)
        .then(() => {
          return tezWatcher(web3);
        })
        .then(() => {
          console.log("\n\nONE WATCH CYCLE COMPLETE");
          status = false;
        });
    }
  }, 300000);
};

StartWatch();
