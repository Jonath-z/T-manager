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
  profile: string | null | undefined,
) => {
  await Contract.methods
    .createUser(name, email, profile)
    .send({ from: '0xACb1411C8e86AB26D24f54c7EfA3EB6417AcF79D' });
};

const web3Service = {
  createTask,
  createUser,
  web3_provider,
  Contract,
};

export default web3Service;
