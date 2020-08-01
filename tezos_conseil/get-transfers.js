const conseiljs = require("conseiljs");
const config = require("../config/tez-config.json");
const invokeContract = require("./util/invokeContract");

module.exports = () =>
  new Promise((resolve) => {
    invokeContract(0, `(Right (Left Unit))`)
      .then((res) => {
        if (res.status !== "applied") {
          console.log(
            "FAILED TO LOCK TEZ CONTRACT - XTZ HASH : ",
            res.operation_group_hash
          );
          console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
          resolve(false);
        } else {
          console.log(
            "LOCKED TEZ CONTRACT - XTZ HASH : ",
            res.operation_group_hash
          );
          return conseiljs.TezosNodeReader.getContractStorage(
            config.RPC,
            config.contractAddr
          );
        }
      })
      .then((res) => {
        const transfers = res.args[1].args[1].args[1];
        let pendingTransfers = [];
        transfers.forEach((element) => {
          pendingTransfers.push({
            address: element.args[0].string,
            amount: element.args[1].int,
          });
        });
        resolve(pendingTransfers);
      })
      .catch((err) => {
        console.log("ERROR GETTING TEZ TRANSFERS : ", err);
        resolve(false);
      });
  });
