import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from './styles/lightTheme';
import Shop from './pages/shop';
import CustomerReg from './pages/CustomerReg';
import OpenPage from './pages/OpenUser';
import CustomerLogin from './pages/CustomerLogin';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import './styles/scroll_custom.css';

function App() {
  
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OpenPage/>}/>
          <Route path="/register-customer" element={<CustomerReg/>}/>
          <Route path="/login-customer" element={<CustomerLogin/>}/>
          <Route path="/shop/:customer_id" element={<Shop/>}/>
          <Route path="/my_wishlist/:customer_id" element={<Wishlist/>}/>
          <Route path="/my_cart/:customer_id" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
