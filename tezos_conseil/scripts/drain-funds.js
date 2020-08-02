const invokeContract = require("../util/invokeContract");
const init = require("../init");

init().then(() => {
  invokeContract(0, `(Left (Right (Right Unit)))`)
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
