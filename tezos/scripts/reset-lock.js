const completeTezTransfers = require("../complete-transfers");
const initAdminAccount = require("../init-admin-account");
const taquito = require("@taquito/taquito");
const config = require("../../config/tez-config.json");

const Reset = async () => {
  initAdminAccount();
  const res = await taquito.Tezos.contract
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods.lock_contract("").send();
    })
    .then((op) => {
      console.log(`TEZ TX HASH :  ${op.hash}`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  if (res) {
    console.log("TEZOS CONTRACT LOCKED");
    const complete = await completeTezTransfers();
    if (complete) {
      console.log("TRANSFERS RESET ON TEZOS NET");
    } else {
      console.log("FAILED TO RESET TRANSFERS ON TEZOS NET");
    }
  } else {
    console.log("ERROR SETTING LOCK IN TEZOS CONTRACT");
  }
};

Reset();
