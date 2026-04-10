import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import KigerLinks from './KigerLinks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<KigerLinks />} />
      </Routes>
    </Router>
  );
}

export default App;
