import HomePage from '../../components/Home';
import SweepDownProvider from '../../contexts/sweepDown';
import ProgressProvider from '../../contexts/progress';

const Home = () => {
  return (
    <ProgressProvider>
      <SweepDownProvider>
        <HomePage />
      </SweepDownProvider>
    </ProgressProvider>
  );
};

export default Home;
