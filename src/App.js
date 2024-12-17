import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import PageNotFound from './components/page-not-found/PageNotFound';
import Header from './components/Layout/Header';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductDetails from './components/product-details/ProductDetails';
import ProdectsCard from './components/prodect-card/ProdectsCard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "", 
          element: <ProdectsCard />,
        },
        {
          path: "/product-details/:product_id", 
          element: <ProductDetails />,
        },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
