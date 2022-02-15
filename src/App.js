import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './components/Layout';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

import useScrollToTop from './hooks/useScrollToTop';

import { verifyToken } from './store/authSlice';

const App = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { isAuthenticated, expiresAt } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    let verifyTokenTimer;
    if (isAuthenticated) {
      verifyTokenTimer = setTimeout(() => {
        dispatch(verifyToken());
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000);
    }
    return () => {
      if (isAuthenticated && verifyTokenTimer) {
        clearTimeout(verifyTokenTimer);
      }
    };
  }, [isAuthenticated, expiresAt, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route
          path="cart"
          element={
            <RequireAuth redirectTo="/login">
              <Cart />
            </RequireAuth>
          }
        />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":categorySlug" element={<Products />} />
        </Route>
        <Route
          path="register"
          element={
            <RedirectIfLoggedIn redirectTo="/">
              <Register />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="login"
          element={
            <RedirectIfLoggedIn redirectTo="/">
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

const RequireAuth = ({ children, redirectTo }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

const RedirectIfLoggedIn = ({ children, redirectTo }) => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  // if (status === 'loading') return <Spinner />;
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

RedirectIfLoggedIn.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default App;
