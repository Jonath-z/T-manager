import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { TO_DO_CONTRACT_ADDRESS } from '../../config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ABI = require('../../config');

const useWeb3 = () => {
  const [account, setAccount] = useState('');
  const web3_provider = new Web3(
    Web3.givenProvider || 'http://localhost:8545',
  );

  const Contract = new web3_provider.eth.Contract(
    ABI.TO_DO_CONTRACT_ABI,
    TO_DO_CONTRACT_ADDRESS,
  );

  useEffect(() => {
    (async () => {
      const requestAccount =
        await web3_provider.eth.requestAccounts();
      setAccount(requestAccount[0]);
    })();
  }, []);

  const getBalance = async () => {
    const balance = await web3_provider.eth.getBalance(account);
    return balance;
  };

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
      .send({ from: account });
  };

  const createUser = async (
    name: string | null | undefined,
    email: string | null | undefined,
    profile: string | null | undefined,
  ) => {
    await Contract.methods
      .createUser(name, email, profile)
      .send({ from: account });
  };

  const updateTaskStatus = async (taskID: number) => {
    await Contract.methods
      .updateTaskStatus(taskID)
      .send({ from: account });
  };

  const deleteTask = async (taskID: number) => {
    await Contract.methods.deleteTask(taskID).send({ from: account });
  };

  return {
    createTask,
    createUser,
    getBalance,
    account,
    web3_provider,
    Contract,
    updateTaskStatus,
    deleteTask,
  };
};

export default useWeb3;
