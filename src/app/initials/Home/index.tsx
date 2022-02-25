import HomePage from '../../modules/components/Home';
import SweepDownProvider from '../../contexts/sweep';

const Home = () => {
  return (
    <SweepDownProvider>
      <HomePage />
    </SweepDownProvider>
  );
};

export default Home;
