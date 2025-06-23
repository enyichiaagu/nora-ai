import './app.css';
import Waitlist from './pages/Waitlist';
import Demo from './pages/Demo';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Waitlist />,
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '/dev',
    element: <LandingPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/onboarding',
    element: <Onboarding />
  }
]);

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}