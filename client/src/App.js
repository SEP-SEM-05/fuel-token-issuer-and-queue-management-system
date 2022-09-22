import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import DashboardContent from './Components/FuelStation/Dashboard/Dashboard';
import StockComponent from './Components/FuelStation/StockComponent';
import QueuesComponent from './Components/FuelStation/QueuesComponent';

import QuotaComponent from './Components/Admin/QuotaComponent';

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

        <Route path="admin" element={<QuotaComponent />} >
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
