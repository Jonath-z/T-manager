import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';

interface User {
  name: string;
  email: string;
  profile: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [isTaskFrame, setIsTaskFrame] = useState(false);
  const users = useUsers();
  const token = localStorageGet('to_do_token_');

  console.log(token);
  console.log('users at home', users);

  const getUserByEmail = (email: string) => {
    users.forEach((user) => {
      if (user.email === email) {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    if (token) {
      const email = decrypt(token);
      console.log(email);
      getUserByEmail(email);
    } else {
      navigate('/');
    }
  }, [users]);

  const ToggleTaskFrame = () => {
    setIsTaskFrame(!isTaskFrame);
  };

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header name={user?.name} profile={user?.profile} />
      <SearchBar />
      <AddButton onClick={ToggleTaskFrame} />
      {isTaskFrame && <AddTaskFrame toggleFrame={ToggleTaskFrame} />}
    </div>
  );
};

export default HomePage;
