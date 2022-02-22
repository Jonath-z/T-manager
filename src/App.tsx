import AppRoutes from './app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import TasksProvider from './app/contexts/task';

function App() {
  return (
    <TasksProvider>
      <Router>
        <AppRoutes />
      </Router>
    </TasksProvider>
  );
}

export default App;
