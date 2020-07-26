const config = require("./config.json");
const taquito = require("@taquito/taquito");

module.exports = () => {
  return new Promise((resolve, reject) => {
    taquito.Tezos.contract
      .at(config.contractAddr)
      .then((contract) => {
        return contract.methods.lock_contract("").send();
      })
      .then((op) => {
        console.log(`TEZ TX HASH :  ${op.hash}`);
        return op.confirmation(1).then(() => op.hash);
      })
      .then((hash) => {
        console.log("TEZOS CONTRACT LOCKED");
        return taquito.Tezos.contract
          .at(config.contractAddr)
          .then((contract) => {
            return contract
              .storage()
              .then((store) => store)
              .catch(() => false);
          });
      })
      .then((res) => {
        if (!res) resolve(false);
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};
