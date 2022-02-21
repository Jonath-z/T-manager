// import React from 'react';
import AppRoutes from './app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
// import Web3 from 'web3';

function App() {
  // useEffect(() => {
  //   const load = async () => {

  //     const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  //     const account = await web3.eth.requestAccounts();

  //     console.log(account[0]);
  //   }
  //   load();
  // }, []);
  
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

export default App;
