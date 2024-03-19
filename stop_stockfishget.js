const fs = require("node:fs");
fs.writeFile("./node_modules/stockfishget-linux/src/input.in","1\nexit",function(err) {
    if (err) {
      throw err;
    } else {
      console.log("action succesfull");
    }
});
