const config = require("../config/tez-config.json");
const taquito = require("@taquito/taquito");

module.exports = (rc, tez) => {
  return new Promise((resolve, reject) => {
    taquito.Tezos.contract
      .at(config.contractAddr)
      .then((contract) => {
        return contract.methods.pay_recipient(rc, tez).send();
      })
      .then((op) => {
        console.log(`TEZ TX HASH :  ${op.hash}`);
        op.confirmation(1).then(() => resolve(true));
      })
      .then((hash) =>
        console.log(
          `Operation injected: https://carthagenet.tzstats.com/${hash}`
        )
      )
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};
