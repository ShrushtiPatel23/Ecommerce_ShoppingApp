import logo from './logo.svg';
import './App.css';
import Header from './components/Headers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
      
        <Header />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;
