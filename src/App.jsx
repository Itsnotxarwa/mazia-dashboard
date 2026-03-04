import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import History from './components/history';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

