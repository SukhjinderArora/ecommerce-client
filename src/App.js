import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Products from './pages/Products';
import useScrollToTop from './hooks/useScrollToTop';

import { product } from './dummyData';
import Register from './pages/Register';
import Login from './pages/Login';
import DemoForm from './pages/DemoForm';

const App = () => {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product product={product} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
