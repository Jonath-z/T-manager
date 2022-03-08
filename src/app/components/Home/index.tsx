/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { decrypt } from '../../utils/helpers/cryptoJS';
import { useUsers } from '../../contexts/users';
import { useSweepDown } from '../../contexts/sweepDown';
import { localStorageGet } from '../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';
import Task from './Task';
import SearchTaskFrame from './Frames/Search';
import Menu from './Frames/Menu';
import LeftSlide from '../../modules/responsive/LeftSlide';
import useResponsive from '../../hooks/useResponsive';
import useClickOutside from '../../hooks/useClickOutside';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const { users } = useUsers();
  const {
    toggleTaskFrame,
    isTaskFrameOpened,
    isSearchFrameOpened,
    isMenuFrameOpened,
    setIsSearchFrameOpened,
  } = useSweepDown();
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  const onOutSideClick = () => {
    setIsSearchFrameOpened(false);
  };
  const outSideRef = useClickOutside(onOutSideClick);

  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat'];

  const token = localStorageGet('to_do_token_');
  const email = decrypt(token as string);

  const usersCollection = users.filter(
    (user) => user.email === email,
  );

  const getSearchInput = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 home">
      {!isDesk && (
        <Header
          name={usersCollection[0]?.name}
          profile={usersCollection[0]?.profile}
        />
      )}
      {!isDesk && <SearchBar onChange={getSearchInput} />}
      {!isDesk && <AddButton onClick={toggleTaskFrame} />}
      {!isDesk && <Task inputValue={inputValue} />}
      {isDesk && (
        <div className="flex h-full w-screen">
          <LeftSlide
            name={usersCollection[0]?.name}
            email={usersCollection[0]?.email}
            profile={usersCollection[0]?.profile}
            onAddTaskClick={toggleTaskFrame}
          />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-white font-Mulish text-3xl px-8">
                {' '}
                {days[date.getDay()]} {date.getDate()}-
                {(date.getMonth() + 101).toString().substring(1)}-
                {date.getFullYear()}
              </p>
              <SearchBar onChange={getSearchInput} />
            </div>
            <div className="pt-10" ref={outSideRef}>
              <Task inputValue={inputValue} />
            </div>
          </div>
        </div>
      )}
      {isSearchFrameOpened && !isDesk && (
        <SearchTaskFrame inputValue={inputValue} />
      )}
      {isMenuFrameOpened && <Menu />}
      {isTaskFrameOpened && (
        <AddTaskFrame onOutSideClick={toggleTaskFrame} />
      )}
    </div>
  );
};

export default HomePage;
