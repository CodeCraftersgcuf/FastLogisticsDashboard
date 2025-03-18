import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import "bootstrap-icons/font/bootstrap-icons.css";

// Importing all pages
import Booking from "./pages/booking/Booking";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import Notification from "./pages/notification/Notification";
import Rating from "./pages/rating/Rating";
import RiderManagement from "./pages/riderManagement/RiderManagement";
import Setting from "./pages/setting/Setting";
import Statement from "./pages/statement/Statement";
import Support from "./pages/support/Support";
import Tracking from "./pages/tracking/Tracking";
import UserManagement from "./pages/userManagement/UserManagement";
import Profile from "./profile/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Layout Wraps All Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<Booking />} />
          <Route path="earnings" element={<Earning />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="ratings" element={<Rating />} />
          <Route path="rider/management" element={<RiderManagement />} />
          <Route path="/settings/general" element={<Setting />} />
          <Route path="/settings/admin" element={<Setting />} />
          <Route path="statements" element={<Statement />} />
          <Route path="support" element={<Support />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="user/management" element={<UserManagement />} />
          <Route path="user/management/:username/customer/detail" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
