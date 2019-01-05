var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Simplr = artifacts.require("./Simplr.sol");
module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin, 10000, {
  //   fee_limit: 1e9,
  //   userFeePercentage: 29,
  //   originEnergyLimit: 1e7
  // });

  deployer.deploy(Simplr, 10000, {
    fee_limit: 1e9,
    userFeePercentage: 29,
    originEnergyLimit: 1e7
  });
  // deployer.deploy(Simplr);
};
