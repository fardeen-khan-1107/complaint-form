import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Complaints from './components/Complaints';
import App from './App';
import {createBrowserRouter} from 'react-router-dom'
import Admin from './components/Admin';
import Technician from './components/Technician';

 const router =createBrowserRouter(         
    [
      {path:'/', element:<App />},
      {path:'/login', element:<Login />},
      {path:'/register', element: <Signup />},
      {path:'/home', element:<Home />},
      {path:'/complaints', element:<Complaints />},
      {path:'/admin',element:<Admin />},
      {path:'/technician',element:<Technician/>}
    ]
   );

export default router;