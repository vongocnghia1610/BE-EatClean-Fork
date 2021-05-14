var jwt = require("jsonwebtoken");
async function createToken(idUser) {
  const token = await jwt.sign(idUser, process.env.ACCESS_TOKEN);
  return token;
}

async function createTokenTime(idUser) {
  const token = await jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60,
      data: idUser,
    },
    process.env.ACCESS_TOKEN
  );
  return token;
}

async function verifyToken(token) {
  const idUser = await jwt.verify(token, process.env.ACCESS_TOKEN);
  return idUser;
}

function makePassword(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}


module.exports = {
  createToken,
  verifyToken,
  createTokenTime,
  makePassword,
};
