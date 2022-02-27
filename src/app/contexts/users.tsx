import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
  useCallback,
} from 'react';
import web3Service from '../services/web3';

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
  const [users] = useState<IUser[]>([]);

  const userExists = (userCalled: string) => {
    return users.some((user) => {
      return JSON.stringify(user) === userCalled;
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const count = await web3Service.Contract.methods
        .userCount()
        .call();
      if (count > 0)
        for (let i = 0; i <= count; i++) {
          const user = await web3Service.Contract.methods
            .users(i)
            .call();
          if (!userExists(JSON.stringify(user))) users.push(user);
        }
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
