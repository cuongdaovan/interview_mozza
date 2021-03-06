const fs = require("fs");
const jwt = require("jsonwebtoken");

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync("./private.key", "utf8");
var publicKEY = fs.readFileSync("./public.key", "utf8");
module.exports = {
  sign: (payload, $Options) => {
    var signOptions = {
      issuer: $Options.issuer,
      subject: $Options.subject,
      audience: $Options.audience,
      expiresIn: "30d", // 30 days validity
      algorithm: "RS256"
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: (token, $Option) => {
    var verifyOptions = {
      issuer: $Option.issuer, //username
      subject: $Option.subject, //email
      audience: $Option.audience,
      expiresIn: "30d",
      algorithm: ["RS256"]
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
  }
};
