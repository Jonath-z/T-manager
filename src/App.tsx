import AppRoutes from './app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import TasksProvider from './app/contexts/task';
import UsersProvider from './app/contexts/users';

function App() {
  return (
    <TasksProvider>
      <UsersProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UsersProvider>
    </TasksProvider>
  );
}

export default App;
