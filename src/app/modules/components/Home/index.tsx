import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { useSweepDown } from '../../../contexts/sweepDown';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';
import Task from './Task';
import SearchTaskFrame from './Frames/Search';
import { useState } from 'react';
import Menu from './Frames/Menu';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const { users } = useUsers();
  const {
    toggleTaskFrame,
    isTaskFrameOpened,
    isSearchFrameOpened,
    isMenuFrameOpened,
  } = useSweepDown();
  const token = localStorageGet('to_do_token_');

  const email = decrypt(token as string);

  const usersCollection = users.filter(
    (user) => user.email === email,
  );

  const getSearchInput = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header
        name={usersCollection[0]?.name}
        profile={usersCollection[0]?.profile}
      />
      <SearchBar onChange={getSearchInput} />
      <AddButton onClick={toggleTaskFrame} />
      <Task />
      {isSearchFrameOpened && (
        <SearchTaskFrame inputValue={inputValue} />
      )}
      {isMenuFrameOpened && <Menu />}
      {isTaskFrameOpened && <AddTaskFrame />}
    </div>
  );
};

export default HomePage;
