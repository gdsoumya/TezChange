const invokeContract = require("./util/invokeContract");

module.exports = () => {
  return new Promise((resolve) => {
    invokeContract(0, `(Left (Right (Left Unit)))`)
      .then((res) => {
        if (res.status !== "applied") {
          console.log(
            "FAILED COMPLETE TEZ TRANSFER- XTZ HASH : ",
            res.operation_group_hash
          );
          console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
          resolve(false);
        } else {
          console.log(
            "CONFIRMED COMPLETE TEZ TRANSFER- XTZ HASH : ",
            res.operation_group_hash
          );
          resolve(true);
        }
      })
      .catch((err) => {
        console.error("ERROR COMPLETE TEZ TRANSFER: ", err);
        resolve(false);
      });
  });
};
