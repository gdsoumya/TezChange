const config = require("../config/tez-config.json");
const taquito = require("@taquito/taquito");

module.exports = () => {
  return new Promise((resolve) => {
    taquito.Tezos.contract
      .at(config.contractAddr)
      .then((contract) => {
        return contract.methods.complete_transfers("").send();
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
