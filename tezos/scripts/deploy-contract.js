const initAdminAccount = require("../init-admin-account");
const taquito = require("@taquito/taquito");
const config = require("../../config/tez-config.json");
const gconfig = require("../../config/global-config.json");

const DeployContract = () => {
  initAdminAccount();
  const jsonCode = require("../../config/contract.json");
  taquito.Tezos.contract
    .originate({
      code: jsonCode,
      storage: {
        fees: gconfig.tezFee,
        cadmin: config.walletAddr,
        funds: 0,
        transfers: [],
        lock: false,
      },
    })
    .then((originationOp) => {
      console.log(
        `Confirming Contract origination : ${originationOp.contractAddress}`
      );
      return originationOp.contract();
    })
    .then(() => {
      console.log(`Origination completed.`);
    })
    .catch((error) => console.error(`Error: ${error}`));
};

DeployContract();
