const config = require("../config/tez-config.json");
const taquito = require("@taquito/taquito");
const initAdminAccount = require("./init-admin-account");

const Test = async (ethAcc, amtInTez) => {
  initAdminAccount();
  await taquito.Tezos.contract
    .at(config.contractAddr)
    .then((contract) => {
      return contract.methods
        .transfer_eth(ethAcc)
        .send({ amount: amtInTez, tez: true });
    })
    .then((op) => {
      console.log(`TEZ TX HASH :  ${op.hash}`);
      return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) =>
      console.log(`Operation injected: https://carthagenet.tzstats.com/${hash}`)
    )
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
};

Test("0x97fCF91d8C840E5B44157664082d972eF8542476", 5);
