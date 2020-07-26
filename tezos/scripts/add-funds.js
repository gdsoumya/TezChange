const initAdminAccount = require("../init-admin-account");
const taquito = require("@taquito/taquito");
const config = require("../../config/tez-config.json");

const addFunds = (amInTez) => {
  initAdminAccount();
  return new Promise((resolve) => {
    taquito.Tezos.contract
      .at(config.contractAddr)
      .then((contract) => {
        return contract.methods
          .add_funds("")
          .send({ amount: amInTez, tez: true });
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

addFunds("1000").then((res) => {
  if (res) {
    console.log("FUNDS ADDED SUCCESFULLY");
  } else {
    console.log("ERROR ADDING FUNDS");
  }
});
