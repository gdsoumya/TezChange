const invokeContract = require("../util/invokeContract");
const init = require("../init");

const amtInMuTez = 1000000000;

init().then(() => {
  invokeContract(amtInMuTez, `(Left (Left Unit))`)
    .then((res) => {
      if (res.status !== "applied") {
        console.log("FAILED - ETX HASH : ", res.operation_group_hash);
        console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
      } else console.log("CONFIRMED - ETX HASH : ", res.operation_group_hash);
    })
    .catch((err) => {
      console.error("ERROR : ", err);
    });
});
