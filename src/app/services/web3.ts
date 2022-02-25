import Web3 from 'web3';
import { TO_DO_CONTRACT_ADDRESS } from '../../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI = require('../../config');

const web3_provider = new Web3(
  Web3.givenProvider || 'http://localhost:8545',
);

const Contract = new web3_provider.eth.Contract(
  ABI.TO_DO_CONTRACT_ABI,
  TO_DO_CONTRACT_ADDRESS,
);

const createTask = async (
  title: string | undefined,
  content: string | undefined,
  startTime: string | undefined,
  endTime: string | undefined,
  ownerName: string | undefined,
  ownerEmail: string | undefined,
  date: string | undefined,
  progress: string,
) => {
  await Contract.methods
    .createTasks(
      title,
      content,
      startTime,
      endTime,
      ownerName,
      ownerEmail,
      date,
      progress,
    )
    .send({ from: '0xACb1411C8e86AB26D24f54c7EfA3EB6417AcF79D' });
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
