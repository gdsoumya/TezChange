const init = require("../init");
const invokeContract = require("../util/invokeContract");

const ethAddress = "0x97fCF91d8C840E5B44157664082d972eF8542476",
  amtMuTez = 30000000;

init().then(() => {
  invokeContract(amtMuTez, `(Right (Right (Right "${ethAddress}")))`)
    .then((res) => {
      if (res.status !== "applied") {
        console.log("FAILED - XTZ HASH : ", res.operation_group_hash);
        console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
      } else console.log("CONFIRMED - XTZ HASH : ", res.operation_group_hash);
    })
    .catch((err) => {
      console.error("ERROR : ", err);
    });
});
