import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Waitlist from '@/pages/Waitlist';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Waitlist />} />
        </Routes>
      </div>
    </Router>
  );
}