import Header from './Header';
import SearchBar from './Search';
import AddButton from './AddButton';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { useUsers } from '../../../contexts/users';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import AddTaskFrame from './Frames/AddTask';
import { useSweepDown } from '../../../contexts/sweep';
import Progress from './Progress';
import Task from './Task';

const HomePage = () => {
  const { users } = useUsers();
  const { toggleFrame, isFrameOpened } = useSweepDown();
  const token = localStorageGet('to_do_token_');

  const email = decrypt(token as string);

  const usersCollection = users.filter(
    (user) => user.email === email,
  );

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br home">
      <Header
        name={usersCollection[0]?.name}
        profile={usersCollection[0]?.profile}
      />
      <SearchBar />
      <AddButton onClick={toggleFrame} />
      <Progress />
      <Task />
      {isFrameOpened && <AddTaskFrame />}
    </div>
  );
};

export default HomePage;
