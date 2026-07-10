import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AvailableSlots from "./pages/user/AvailableSlots";
import MyBookings from "./pages/user/MyBookings";
import CalendarPage from "./pages/CalendarPage";
import Dashboard from "./pages/Owner/Dashboard";
import CreateSlot from "./pages/Owner/CreateSlot";
import Bookings from "./pages/Owner/Bookings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AvailableSlots />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/owner" element={<Dashboard />} />
          <Route path="/owner/create" element={<CreateSlot />} />
          <Route path="/owner/bookings" element={<Bookings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}