import { createContext, useState} from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import Destination from './Componants/Destination/Destination';
import Details from './Componants/Details/Details';
import Home from './Componants/Home/Home';
import Login from './Componants/Login/Login';
import NavBar from './Componants/NavBar/NavBar';
import PrivateOutlet from './Componants/PrivateOutlet/PrivateOutlet';
import Search from './Componants/Search/Search';
export const userContext = createContext();
export const bookingContext = createContext();
function App() {
  const [singedInUser, setSingedInUser] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  return (
    <div>
      <userContext.Provider value= {[singedInUser, setSingedInUser]}>
        <bookingContext.Provider value={[bookingDetails, setBookingDetails]}>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='login'element={<Login/>}/>
            <Route path='/*' element={<PrivateOutlet/>}> 
              <Route path='search/:vehicle' element={<Search/>}/>
              <Route path='search/:vehicle/details' element={<Details/>}/>
              <Route path='destination' element={<Destination/>}/>
            </Route>
          </Routes>
        </bookingContext.Provider>  
      </userContext.Provider>
    </div>
  );
}

export default App;
