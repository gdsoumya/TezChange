const invokeContract = require("../util/invokeContract");
const init = require("../init");

init().then(() => {
  invokeContract(0, `(Right (Left Unit))`)
    .then((res) => {
      if (res.status !== "applied") {
        console.log(
          "FAILED TO LOCK TEZ CONTRACT - XTZ HASH : ",
          res.operation_group_hash
        );
        console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
        return false;
      } else {
        console.log(
          "LOCKED TEZ CONTRACT - XTZ HASH : ",
          res.operation_group_hash
        );
        return invokeContract(0, `(Left(Right(Left Unit)))`);
      }
    })
    .then((res) => {
      if (res) {
        if (res.status !== "applied") {
          console.log(
            "FAILED TO COMPLETE TEZ TRANSFERS- XTZ HASH : ",
            res.operation_group_hash
          );
          console.log("STATUS : ", res.status, "\nREASON : ", res.errors);
        } else
          console.log(
            "COMPLETED TEZ TRANSFERS - XTZ HASH : ",
            res.operation_group_hash
          );
      }
    })
    .catch((err) => {
      console.error("ERROR : ", err);
    });
});
