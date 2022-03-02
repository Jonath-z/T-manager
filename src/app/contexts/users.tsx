import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';
import useWeb3 from '../hooks/useWeb3';

interface IUser {
  name: string;
  email: string;
  profile: string;
  id: number;
}

type userType = {
  users: IUser[];
};

const defaultContext: userType = {
  users: [],
};
const UserContext = createContext<userType>(defaultContext);

export const useUsers = () => useContext(UserContext);

const UsersProvider: FC = ({ children }): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { Contract } = useWeb3();

  useEffect(() => {
    const getUsers = async () => {
      const count = await Contract.methods.userCount().call();
      const stateMemory = [];
      if (count > 0)
        for (let i = 0; i <= count; i++) {
          const user = await Contract.methods.users(i).call();
          stateMemory.push(user);
        }
      setUsers(stateMemory);
    };
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;
