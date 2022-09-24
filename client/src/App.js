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
import DistributionComponent from './Components/FuelStation/DistributionComponent';
import PersonalVehicles from './Components/PersonalCLient/PersonalVehiclesComponent';
import PersonalDashboard from './Components/PersonalCLient/Dashboard/Dashboard';
import AddVehicle from './Components/PersonalCLient/AddVehicle';
import RequestFuelPersonal from './Components/PersonalCLient/RequestFuelPersonal';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="fuelstation" element={<DashboardContent />} >
          <Route index element={<StockComponent />} />
          <Route path="home" element={<StockComponent />} />
          <Route path="fuelqueues" element={<QueuesComponent />} />
          <Route path="fueldistribution" element={<DistributionComponent />} />
        </Route>

        <Route path="admin" >
          <Route index element={<QuotaComponent />} />
          <Route path="home" element={<QuotaComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="registered" element={<RegisteredComponent />} />
          <Route path="unregistered" element={<UnregisteredComponent />} />
          <Route path="vehicles" element={<VehiclesComponent />} />
        </Route>

        <Route path="userp" element={<PersonalDashboard />} >
          <Route index element={<PersonalVehicles />} />
          <Route path="home" element={<PersonalVehicles />} />
          <Route path="addvehicle" element={<AddVehicle />} />
          <Route path="req" element={<RequestFuelPersonal />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
