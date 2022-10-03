import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import DashboardContent from "./Components/FuelStation/Dashboard/Dashboard";
import StockComponent from "./Components/FuelStation/StockComponent";
import QueuesComponent from "./Components/FuelStation/QueuesComponent";

import QuotaComponent from "./Components/Admin/QuotaComponent";
import RegisteredComponent from "./Components/Admin/RegisteredComponent";
import UnregisteredComponent from "./Components/Admin/UnregisteredComponent";
import VehiclesComponent from "./Components/Admin/VehiclesComponent";
import DistributionComponent from "./Components/FuelStation/DistributionComponent";
import PersonalVehicles from "./Components/PersonalCLient/PersonalVehiclesComponent";
import PersonalDashboard from "./Components/PersonalCLient/Dashboard/Dashboard";
import AddVehicle from "./Components/PersonalCLient/AddVehicle";
import OrgDashboard from "./Components/Organization/Dashboard/Dashboard";
import OrgVehicles from "./Components/Organization/OrgVehiclesComponent";
import RequestFuelOrg from "./Components/Organization/RequestFuelOrg";
import AdminDashboard from "./Components/Admin/Dashboard/Dashboard";
import GetStand from "./Components/auth/GetStand/GetStand";
import SignIn from "./Components/auth/LogIn/Login";
import SignUp from "./Components/auth/SignUp/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="fuelstationgetstands" element={<GetStand />} />

          <Route path="fuelstation" element={<DashboardContent />}>
            <Route index element={<StockComponent />} />
            <Route path="home" element={<StockComponent />} />
            <Route path="fuelqueues" element={<QueuesComponent />} />
            <Route
              path="fueldistribution"
              element={<DistributionComponent />}
            />
          </Route>

          <Route path="admin" element={<AdminDashboard />}>
            <Route index element={<QuotaComponent />} />
            <Route path="home" element={<QuotaComponent />} />
            <Route path="registered" element={<RegisteredComponent />} />
            <Route path="unregistered" element={<UnregisteredComponent />} />
            <Route path="vehicles" element={<VehiclesComponent />} />
          </Route>

          <Route path="userp" element={<PersonalDashboard />}>
            <Route index element={<PersonalVehicles />} />
            <Route path="home" element={<PersonalVehicles />} />
            <Route path="addvehicle" element={<AddVehicle />} />
          </Route>

          <Route path="usero" element={<OrgDashboard />}>
            <Route index element={<RequestFuelOrg />} />
            <Route path="home" element={<RequestFuelOrg />} />
            <Route path="vehicles" element={<OrgVehicles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
