import Web3 from 'web3';
import { TO_DO_CONTRACT_ADDRESS } from '../../../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI = require('../../../config');

console.log(ABI.TO_DO_CONTRACT_ABI);

const web3_provider = new Web3(
  Web3.givenProvider || 'http://localhost:8545',
);

const Contract = new web3_provider.eth.Contract(
  ABI.TO_DO_CONTRACT_ABI,
  TO_DO_CONTRACT_ADDRESS,
);

console.log(Contract);

const createTask = async (
  content: string,
  startTime: string,
  endTime: string,
  ownerName: string,
  ownerEmail: string,
) => {
  await Contract.methods
    .createTasks(content, startTime, endTime, ownerName, ownerEmail)
    .call();
};

const createUser = async (
  name: string | null | undefined,
  email: string | null | undefined,
) => {
  await Contract.methods
    .createUser(name, email)
    .send({ from: '0xD8234db74088D5dd2dd5C991886700bD6385f98C' });
  const createUser = await Contract.methods.createUser(name, email);
  console.log('user created', createUser);
};

const web3Service = {
  createTask,
  createUser,
  web3_provider,
  Contract,
};

export default web3Service;
