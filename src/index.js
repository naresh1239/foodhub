import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body'
import { BrowserRouter, RouterProvider, createBrowserRouter ,} from 'react-router-dom'
import CartPage from './components/CartPage'
import Favirote from './components/Favirote'

import Fotter from './components/Fotter'
import CardDetails from './components/CardDetails'
import Auth from './components/Auth'
import Test from './components/Test'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "*",
    element: <App/>,
    children: [
      {
        path: "*",
        element: <Body/>,
      },
      {
        path: "/cart",
        element: <CartPage/>,
      },
      {
          path: "/favirote",
          element: <Favirote/>,
        },
        {
          path: "/details/:cardID",
          element: <CardDetails/>,
        },
        {
          path: "/auth",
          element: <Auth/>,
        },
        {
          path : "/test",
          element : <Test/>
        }
    
    ],
  }
]);
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
