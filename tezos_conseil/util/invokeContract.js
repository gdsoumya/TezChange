const conseiljs = require("conseiljs");
const config = require("../../config/tez-config.json");
const store = require("../store");

module.exports = (amtInMuTez, parameters, extraFee = 0, extraStorage = 0) => {
  return new Promise((resolve, reject) => {
    conseiljs.TezosConseilClient.getFeeStatistics(
      config.conseilServer,
      config.network,
      conseiljs.OperationKindType.Transaction
    )
      .then((res) => {
        const fee = Number(res[0]["high"]),
          storage_limit = 6000,
          gas_limit = 100000,
          entry_point = "";
        return conseiljs.TezosNodeWriter.testContractInvocationOperation(
          config.RPC,
          config.chain_id,
          store.keyStore,
          config.contractAddr,
          amtInMuTez,
          fee + extraFee,
          storage_limit + extraStorage,
          gas_limit,
          entry_point,
          parameters,
          conseiljs.TezosParameterFormat.Michelson
        ).then(({ gas, storageCost: freight }) => {
          return conseiljs.TezosNodeWriter.sendContractInvocationOperation(
            config.RPC,
            store.signer,
            store.keyStore,
            config.contractAddr,
            amtInMuTez,
            fee + extraFee,
            freight + extraStorage,
            gas + 10000,
            entry_point,
            parameters,
            conseiljs.TezosParameterFormat.Michelson
          );
        });
      })
      .then((result) => {
        const groupid = result["operationGroupID"]
          .replace(/"/g, "")
          .replace(/\n/, ""); // clean up RPC output
        return conseiljs.TezosConseilClient.awaitOperationConfirmation(
          config.conseilServer,
          config.network,
          groupid,
          1
        );
      })
      .then(resolve)
      .catch(reject);
  });
};
