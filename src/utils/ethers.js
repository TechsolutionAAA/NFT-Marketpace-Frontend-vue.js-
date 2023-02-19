import { ethers, providers } from "ethers";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Magic } from 'magic-sdk';
import { ConnectExtension } from "@magic-ext/connect";

const wwc_provider = new WalletConnectProvider({ infuraId: "9f65f2e7dc324b6fba99c874cecfbadd" });
const wwc_web3 = new Web3(wwc_provider);
const wc_web3Provider = new providers.Web3Provider(wwc_provider);
// const signer = wc_web3Provider.getSigner();


// magic connect config
const magic = new Magic('pk_live_8AD1C21568DB499E', {
  network: 'goerli',
  locale: 'en_US',
  extensions: [new ConnectExtension()],
});

const magic_web3 = new Web3(magic.rpcProvider);

export default {
  install: (app,) => {
    var provider = null;
    var signer = null;
    var accounts = null;
    var blockchain = {};
    blockchain.magic_provider = function () {
      return magic_web3;
    };
    blockchain.magic_connect = function () {
      magic_web3.eth.getAccounts((magic_accounts) => {
        return magic_accounts?.[0];
      })
    };
    blockchain.wc_provider = function () {
      return wwc_provider;
    };
    blockchain.wc_web3 = function () {
      return wwc_web3;
    };
    blockchain.wc_web3Provider = function () {
      return wc_web3Provider;
    };
    blockchain.ethers = ethers;
    blockchain.ethereum = null;
    blockchain.getAccounts = function () {
      return accounts;
    };
    blockchain.setAccounts = function (acts) {
      accounts = acts;
    };
    blockchain.getProvider = function () {
      return provider;
    };
    blockchain.setProvider = function (provi) {
      provider = new ethers.providers.Web3Provider(provi);
      return ethers;
    };
    blockchain.getSigner = function () {
      if (signer == null) signer = provider.getSigner();
      return signer;
    };

    blockchain.toHash = function (texto) {
      if (/(0x)/.test(texto)) {
        return ethers.utils.keccak256(texto);
      } else return ethers.utils.id(texto);
    };

    blockchain.isconnected = false;

    //Vue.prototype.$Rateeee = function (methodOptions) {}
    app.config.globalProperties.$Web3 = blockchain;
  },
};
