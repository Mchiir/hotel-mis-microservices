import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ROLES } from './constants.js';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Login from '../auth/Login.jsx';
import Register from '../auth/Register.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import RoomsPage from '../pages/RoomsPage.jsx';
import CreateRoomPage from '../pages/CreateRoomPage.jsx';
import RoomDetailsPage from '../pages/RoomDetailsPage.jsx';
import GuestsPage from '../pages/GuestsPage.jsx';
import GuestDetailsPage from '../pages/GuestDetailsPage.jsx';
import ReservationsPage from '../pages/ReservationsPage.jsx';
import ReservationDetailsPage from '../pages/ReservationDetailsPage.jsx';
import CheckInPage from '../pages/CheckInPage.jsx';
import CheckOutPage from '../pages/CheckOutPage.jsx';
import PaymentsPage from '../pages/PaymentsPage.jsx';
import UsersPage from '../pages/UsersPage.jsx';
import UserDetailsPage from '../pages/UserDetailsPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import RevenueReportPage from '../pages/reports/RevenueReportPage.jsx';
import OccupancyReportPage from '../pages/reports/OccupancyReportPage.jsx';
import ReservationReportPage from '../pages/reports/ReservationReportPage.jsx';
import CheckInReportPage from '../pages/reports/CheckInReportPage.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import Loader from '../components/Loader.jsx';

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

const adminOnly = [ROLES.ADMIN];
const reception = [ROLES.ADMIN, ROLES.RECEPTIONIST];
const finance = [ROLES.ADMIN, ROLES.ACCOUNTANT];
const staffRead = [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.ACCOUNTANT];

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <GuestRoute><Login /></GuestRoute>,
  },
  {
    path: '/register',
    element: <GuestRoute><Register /></GuestRoute>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/profile', element: <ProfilePage /> },

          { element: <ProtectedRoute roles={reception} />, children: [
            { path: '/guests', element: <GuestsPage /> },
            { path: '/guests/:id', element: <GuestDetailsPage /> },
            { path: '/reservations', element: <ReservationsPage /> },
            { path: '/reservations/:id', element: <ReservationDetailsPage /> },
            { path: '/check-in', element: <CheckInPage /> },
            { path: '/check-out', element: <CheckOutPage /> },
          ]},

          { element: <ProtectedRoute roles={staffRead} />, children: [
            { path: '/rooms', element: <RoomsPage /> },
            { path: '/rooms/:id', element: <RoomDetailsPage /> },
          ]},

          { element: <ProtectedRoute roles={adminOnly} />, children: [
            { path: '/rooms/create', element: <CreateRoomPage /> },
            { path: '/users', element: <UsersPage /> },
            { path: '/users/:id', element: <UserDetailsPage /> },
          ]},

          { element: <ProtectedRoute roles={finance} />, children: [
            { path: '/payments', element: <PaymentsPage /> },
            { path: '/reports/revenue', element: <RevenueReportPage /> },
            { path: '/reports/occupancy', element: <OccupancyReportPage /> },
            { path: '/reports/reservations', element: <ReservationReportPage /> },
            { path: '/reports/checkins', element: <CheckInReportPage /> },
          ]},
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);
