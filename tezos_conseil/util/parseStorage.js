const config = require("../../config/tez-config.json");
const gconfig = require("../../config/global-config.json");
const convertJSON = require("./convertJSON");

module.exports = () => {
  return convertJSON(config.storage)
    .replace("${config.walletAddr}", config.walletAddr)
    .replace("${gconfig.tezFee}", gconfig.tezFee);
};
