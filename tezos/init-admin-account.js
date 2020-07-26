const taquito = require("@taquito/taquito");
const signer = require("@taquito/signer");
const config = require("../config/tez-config.json");

module.exports = () => {
  taquito.Tezos.setProvider({
    rpc: config.RPC,
    signer: new signer.InMemorySigner(config.walletPK),
  });
};
