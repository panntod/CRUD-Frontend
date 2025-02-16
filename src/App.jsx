import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ListUser from './pages/ListUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListUser />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
