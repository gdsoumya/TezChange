const invokeContract = require("./util/invokeContract");

module.exports = (rc, tez) => {
  return new Promise((resolve) => {
    console.log(`(Right (Right (Left (Pair "${rc}" ${tez}))))`);
    invokeContract(0, `(Right (Right (Left (Pair "${rc}" ${tez}))))`, 0, 1000)
      .then((res) => {
        if (res.status !== "applied") {
          console.log("FAILED - XTZ HASH : ", res.operation_group_hash);
          console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
          resolve(false);
        } else {
          console.log("CONFIRMED - XTZ HASH : ", res.operation_group_hash);
          resolve(true);
        }
      })
      .catch((err) => {
        console.error("ERROR : ", err);
        resolve(false);
      });
  });
};
