var CryptoJS = require("crypto-js");


const decreptUserData = (data) => {
  var bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(data),
    "secret key string"
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = decreptUserData;
