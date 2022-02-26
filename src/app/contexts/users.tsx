import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';
import web3Service from '../services/web3';

type userCxt = {
  name: string;
  email: string;
  profile: string;
  id: number;
};

const initialState = [
  {
    name: 'jonath',
    email: 'jonath@gmail.com',
    profile: 'profile',
    id: 0,
  },
];

const UserContext = createContext(initialState);

export const useUsers = () => useContext(UserContext);

const UsersProvider: FC = ({ children }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<userCxt[]>([]);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const count = await web3Service.Contract.methods
          .userCount()
          .call();
        if (count > 0)
          for (let i = 0; i <= count; i++) {
            const user = await web3Service.Contract.methods
              .users(i)
              .call();
            setUsers((prevState) => [...prevState, user]);
          }
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={users}>
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;
