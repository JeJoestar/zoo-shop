import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AdminCatalogPage from './components/AdminCatalogPage';
import EditPage from './components/EditPage'

function App() {
  return (
    <div className="main">
    <Router>
      <Routes>
        <Route path="/" element={<AdminCatalogPage/>}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
