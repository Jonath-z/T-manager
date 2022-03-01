import Web3 from 'web3';
import { TO_DO_CONTRACT_ADDRESS } from '../../config';
import { useAccount } from '../contexts/task';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI = require('../../config');

const web3_provider = new Web3(
  Web3.givenProvider || 'http://localhost:8545',
);

const Contract = new web3_provider.eth.Contract(
  ABI.TO_DO_CONTRACT_ABI,
  TO_DO_CONTRACT_ADDRESS,
);

console.log(Contract);

const createTask = async (
  title: string | undefined,
  content: string | undefined,
  startTime: string | undefined,
  endTime: string | undefined,
  ownerName: string | undefined,
  ownerEmail: string | undefined,
  date: string | undefined,
  progress: string,
  // id: number,
) => {
  console.log(
    title,
    content,
    startTime,
    endTime,
    ownerName,
    ownerEmail,
    date,
    progress,
    // id,
  );
  try {
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
  } catch (err) {
    console.log(err);
  }
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

const updateTaskStatus = async (taskID: number) => {
  await Contract.methods
    .updateTaskStatus(taskID)
    .send({ from: '0xACb1411C8e86AB26D24f54c7EfA3EB6417AcF79D' });
};

const web3Service = {
  createTask,
  createUser,
  web3_provider,
  Contract,
  updateTaskStatus,
};

export default web3Service;
