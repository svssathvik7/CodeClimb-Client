import './App.css';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapPage from './Pages/MapPage';
import Home from './Pages/Home';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" Component={Login}/>
        <Route exact path='/map' Component={MapPage}/>
        <Route exact path="/home" Component={Home}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;