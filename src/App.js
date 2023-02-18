import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/layout/Main';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';

function App() {
 const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {path:'/',element:<Home></Home>},
      {path:'/register',element:<Register></Register>},
      {path:'/login',element:<Login></Login>},
      {path:'/orders',element:<PrivateRoute><Orders></Orders></PrivateRoute>},
    ]
  }
 ])
  return (
    <div>
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
