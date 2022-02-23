import React, { useEffect, useState } from 'react';
import Header from '../../../initials/Home/Header';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { localStorageGet } from '../../../utils/helpers/localStorage';

interface User {
  name: string;
  email: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const users = useUsers();
  const token = localStorageGet('to_do_token_');

  console.log(token);

  const getUserByEmail = (email: string, users: any[]) => {
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
      getUserByEmail(email, users);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header name={user?.name} />
    </div>
  );
};

export default HomePage;
