import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';
import Web3 from 'web3';
import {
  TO_DO_CONTRACT_ADDRESS,
  TO_DO_CONTRACT_ABI,
} from '../../config';

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
  let [tasks, setTasks] = useState<any[]>([]);
  const [account, setAccount] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [failedToConnect, setFailedToConnect] = useState(false);

  const getTasks = async (provider: any) => {
    const Contract = new provider.eth.Contract(
      TO_DO_CONTRACT_ABI,
      TO_DO_CONTRACT_ADDRESS,
    );
    try {
      console.log('in process ...');
      const tasksCount = await Contract.methods.taskCount().call();

      for (let i = 0; i <= tasksCount; i++) {
        const task = await Contract.methods.tasks(i).call();
        setTasks([task]);
        console.log(task);
      }
      console.log(tasks);
      console.log(tasksCount);
      console.log('process done');
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      const web3_provider = new Web3(
        Web3.givenProvider || 'http://localhost:8545',
      );

      try {
        const account = await web3_provider.eth.requestAccounts();
        setAccount(account[0]);
        console.log(account[0]);
        await getTasks(web3_provider);
        setWalletConnected(true);
        setFailedToConnect(false);
      } catch (err) {
        alert('error when connecting to Metamask');
        setFailedToConnect(true);
        setWalletConnected(false);
        console.log(err);
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
