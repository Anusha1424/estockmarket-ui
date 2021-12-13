import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboard/styles/shards-dashboards.1.1.0.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
