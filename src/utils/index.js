import contracts from '../config/contracts';

const contract = contracts['Simplr.sol:Simplr'];

const utils = {
    tronWeb: false,
    contract: false,

    setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = tronWeb.contract(contract.abi, contract.address)
    }

};

export default utils;