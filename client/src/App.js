import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import DashboardContent from './Components/Dashboard/Dashboard';
import StockComponent from './Components/StockComponent';
import QueuesComponent from './Components/QueuesComponent';

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
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
