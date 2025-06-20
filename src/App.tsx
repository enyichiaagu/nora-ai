import './app.css';
import Waitlist from './pages/Waitlist';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Waitlist />,
  },
  {
    path: '/demo',
    element: <Demo/>
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
