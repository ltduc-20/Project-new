import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Room  from './pages/admin/Room';
import ClientLayout from './layouts/ClientLayout';
import Register from './pages/client/Register';
import Login from './pages/client/login';
import FilmUpsert from './pages/admin/FilmUpsert';
import Film from './pages/admin/Film';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path='room' element={<Room />} />
          <Route path='filmupsert' element={<FilmUpsert />} />
          <Route path='film' element={<Film />} />
        </Route>
        <Route element={<ClientLayout />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />     
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App