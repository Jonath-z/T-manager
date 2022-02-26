import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { useNavigate } from 'react-router-dom';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';
import { useSweepDown } from '../../../contexts/sweep';
import Tasks from './Task';
import { useTasks } from '../../../contexts/task';

interface User {
  name: string;
  email: string;
  profile: string;
}

interface ITasks {
  id: string;
  title: string;
  content: string;
  remind: boolean;
  start_time: string;
  end_time: string;
  completed: boolean;
  owner_name: string;
  owner_email: string;
}
[];

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [userTasks, setUserTasks] = useState<ITasks[]>([]);
  const users = useUsers();
  const tasks = useTasks();
  const { toggleFrame, isFrameOpened } = useSweepDown();
  const token = localStorageGet('to_do_token_');

  console.log(tasks);

  const getUserDataByEmail = (email: string) => {
    users.forEach((user) => {
      if (user.email === email) {
        setUser(user);
      }
    });
    tasks.forEach((task) => {
      if (task.owner_email === email)
        setUserTasks((prev) => [...prev, task]);
    });
  };

  useEffect(() => {
    setUserTasks([]);
    if (token) {
      const email = decrypt(token);
      getUserDataByEmail(email);
    } else {
      navigate('/');
    }
  }, [users]);

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header name={user?.name} profile={user?.profile} />
      <SearchBar />
      <AddButton onClick={toggleFrame} />
      <Tasks tasks={userTasks} name={undefined} />
      {isFrameOpened && <AddTaskFrame />}
    </div>
  );
};

export default HomePage;
