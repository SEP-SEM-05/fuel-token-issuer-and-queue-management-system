import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import DashboardContent from './Components/FuelStation/Dashboard/Dashboard';
import StockComponent from './Components/FuelStation/StockComponent';
import QueuesComponent from './Components/FuelStation/QueuesComponent';

import QuotaComponent from './Components/Admin/QuotaComponent';
import RegisteredComponent from './Components/Admin/RegisteredComponent';
import LoginComponent from './Components/Admin/LoginComponent';
import UnregisteredComponent from './Components/Admin/UnregisteredComponent';
import VehiclesComponent from './Components/Admin/VehiclesComponent';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="fuelstation" element={<DashboardContent />} >
          <Route index element={<StockComponent />} />
          <Route path="home" element={<StockComponent />} />
          <Route path="fuelqueues" element={<QueuesComponent />} />
        </Route>

        <Route path="admin" >
          <Route index element={<QuotaComponent />} />
          <Route path="home" element={<QuotaComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="registered" element={<RegisteredComponent />} />
          <Route path="unregistered" element={<UnregisteredComponent />} />
          <Route path="vehicles" element={<VehiclesComponent />} />

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
