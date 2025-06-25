import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1 className="text-center mt-20 text-3xl">Home Page (Protect this)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
