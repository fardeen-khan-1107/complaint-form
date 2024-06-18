import {createBrowserRouter} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import App from './App';
import Complaints from './components/Complaints';
import Home from './components/Home';

 const router =createBrowserRouter(         
    [
      {path:'/', element:<App />},
      {path:'/home', element:<Home />},
      {path:'/register', element: <Signup />},
      {path:'/login', element:<Login />},
      {path:'/complaints', element:<Complaints />}

    ]
   );

export default router;