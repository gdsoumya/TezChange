# TezChange
A Crypto Exchange for Tezos, convert XTZ to ETH and vice-versa seamlessly. No servers are required to be exposed, all interactions happen through the Tezos and Ethereum Smart Contracts. 

## How it works?
![TezChange Diagram](https://github.com/gdsoumya/TezChange/blob/master/images/tezchange.png?raw=true)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **TezChange** requires [ **NodeJs**](https://nodejs.org/en/)

### Getting the project.

```sh
$ git clone https://github.com/gdsoumya/TezChange
or 
Download and extract the Zip-File
```

### Install Dependencies
```
$ cd TezChange
$ npm i
```
### Setting up the Config files
There are 2 config files that needs to be updated before we can run **TezChange**. The two files are located at `config/eth-config.json` and `config/tez-config.json`. There are some sensitive parameters like :
1. `config/eth-config.json`
```
  "walletAddress": "<ETH_WALLET_ADDR>",
  "walletPK": "<PRIVATE_KEY>",
  "RPC": "https://goerli.infura.io/v3/<ACCESS_TOKEN>",
   "contractAddr": "<CONTRACT_ADDR>"
```
2. `config/tez-config.json`
```
  "RPC": "https://carthagenet.smartpy.io/",
  "walletAddress": "<TEZOS_ADDR>",
  "walletPK": "<PRIVATE_KEY>",
  "contractAddr": "<CONTRACT_ADDR>"
```

These fields need to be filled with you specific details. `contractAddr` can be filled in later after deploying each contract.

### Deploying Contracts
After setting the configs, we need to deploy the precompiled tezos and ethereum contracts, to deploy the contracts run:
```
$ node ethereum/scripts/deploy-contract.js
$ node tezos/scripts/deploy-contract.js 
```
You will recieve the contract addresses for both the Ethereum and Tezos contracts, these addresses need to inserted in the appropriate config files.

## Starting the Exchange Bot
To start the botv
```sh
$ node index.js
```
The bot will start and keep watching for pending transfers on both the networks every 5mins.

## Test TezChange
Currently **TezChange** doesn't have a frontend for interaction all interactions need to be done by directly communicating with the contracts. These scripts can be used to test the whole system :
```
$ node ethereum/scripts/add-transfer.js
$ node tezos/scripts/add-transfer.j
```

These 2 scripts will add crypto conversion requests to each of the networks, which should be caught by the **bot**. Before using the scripts ensure to change the `Public Addresses` to which you want to convert and transfer crypto to. These have to be changed directly in the script code it self.

## Note
The current setup uses static `Conversion Rates` and `Conversion Fees` these can be changed in the `config/global-config.json`. The convertion rate is approximately specified in terms of `1XTZ->GWEI`
## Author
-   **Soumya Ghosh Dastidar**
