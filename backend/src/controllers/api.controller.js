const {
  verifyWhitelist,
  getWhitelistRoot,
} = require("../services/merkleTree.service");

exports.getWhitelist = (req, res) => {
  const address = req.params.address;
  const whitelist = verifyWhitelist(address);
  res.status(200).send({
    ...whitelist,
    success: true,
  });
};

exports.getWhitelistRoot = (req, res) => {
  const root = getWhitelistRoot();
  res.status(200).send({
    root,
    success: true,
  });
};
