import auth from "./auth";

module.exports = { auth };


exports.login = (req, res) => {
    var payload = {
      data1: "Data 1",
      data2: "Data 2",
      data3: "Data 3",
      data4: "Data 4"
    };
    var i = "Mysoft corp";
    var s = "some@user.com";
    var a = "http://mysoftcorp.in";
    var Options = {
      issuer: i,
      subject: s,
      audience: a
    };
    var token = auth.sign(payload, Options);
    res.status(200).send(token);
  };