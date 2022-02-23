import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';

import web3Service from '../utils/services/web3';

const initialState = [
  {
    id: 'id',
    content: '',
    remind: false,
    start_time: '00:00',
    end_time: '00:00',
    completed: false,
    owner_name: '',
    owner_email: '',
  },
];

type AccountCxtType = {
  account: string;
  walletConnected: boolean;
  failedToConnect: boolean;
};

const defaultAccountCxtData: AccountCxtType = {
  account: '',
  walletConnected: false,
  failedToConnect: false,
};

const TasksContext = createContext(initialState);
export const useTasks = () => useContext(TasksContext);

const AccountContext = createContext<AccountCxtType>(
  defaultAccountCxtData,
);
export const useAccount = () => useContext(AccountContext);

const TasksProvider: FC = ({ children }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any[]>([]);
  const [account, setAccount] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [failedToConnect, setFailedToConnect] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTasks = async () => {
    try {
      const tasksCount = await web3Service.Contract.methods
        .taskCount()
        .call();

      for (let i = 0; i <= tasksCount; i++) {
        const task = await web3Service.Contract.methods
          .tasks(i)
          .call();
        setTasks([task]);
        console.log(task);
      }
    } catch (err) {
      if (err) {
        setFailedToConnect(true);
        setWalletConnected(false);
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const account =
          await web3Service.web3_provider.eth.requestAccounts();
        setAccount(account[0]);
        console.log(account[0]);
        await getTasks();
        setWalletConnected(true);
        setFailedToConnect(false);
      } catch (err) {
        alert('error when connecting to Metamask');
        setFailedToConnect(true);
        setWalletConnected(false);
      }
    };
    load();
  }, []);

  return (
    <TasksContext.Provider value={tasks}>
      <AccountContext.Provider
        value={{ account, walletConnected, failedToConnect }}
      >
        {children}
      </AccountContext.Provider>
    </TasksContext.Provider>
  );
};

export default TasksProvider;
