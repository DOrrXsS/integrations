import ReactDOM from 'react-dom/client'
import React from 'react';
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Main, { loader as urlDataLoader, action as urlDataAction } from './components/Body/Main';
import Passages from './components/Body/Passages';
import Experiments from './components/Body/Experiments';
import ModifyUrlData, {loader as urlDataTypeLoader} from './components/Body/ModifyUrlData';
import SideBar from './components/sideBar/SideBar';
import UrlType, { loader as urlTypeLoader} from './components/Body/UrlType';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Main />,
        loader: urlDataLoader,
        action: urlDataAction,
        children:[
          {
            path: '/:urlType',
            element: <UrlType />,
            loader: urlTypeLoader
          },
          {
            path: '/modify:urlDataType',
            element: <ModifyUrlData />,
            loader: urlDataTypeLoader
          },
          {
            path: '/settings',
            element: <SideBar />,
            
          }
        ]
      },
      {
        path: '/passages',
        element: <Passages />,
      },
      {
        path:'/experiments',
        element: <Experiments />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
