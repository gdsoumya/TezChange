const initAdminAccount = require("../init-admin-account");
const taquito = require("@taquito/taquito");
const config = require("../../config/tez-config.json");

const drainFunds = () => {
  initAdminAccount();
  return new Promise((resolve) => {
    taquito.Tezos.contract
      .at(config.contractAddr)
      .then((contract) => {
        return contract.methods.drain("").send();
      })
      .then((op) => {
        console.log(`TEZ TX HASH :  ${op.hash}`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then((hash) => {
        console.log(
          `Operation injected: https://carthagenet.tzstats.com/${hash}`
        );
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};

drainFunds().then((res) => {
  if (res) {
    console.log("FUNDS DRAINED SUCCESFULLY");
  } else {
    console.log("ERROR DRAINING FUNDS");
  }
});
