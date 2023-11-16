import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import './App.css'
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import firebaseConfig from "../firebaseConfig";
import { ToastContainer} from 'react-toastify';
import Home from "./Pages/Home";
import Message from "./Pages/Message";
import Profile from "./Pages/Profile";
import RootLayout from "./Components/RootLayout";
import Connections from "./Pages/Connections";



const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route
            path="/"
            element={<Registration/>}
          />
      <Route
            path="/login"
            element={<Login/>}
          />

        <Route
        path="/"
        element={<RootLayout/>}
        >
            
          
              <Route
                    path="/home"
                    element={<Home/>}
                  />
              <Route
                    path="/message"
                    element={<Message/>}
                  />
              <Route
                    path="/connections"
                    element={<Connections/>}
                  />
              <Route
                    path="/Profile"
                    element={<Profile/>}
                  />

        </Route>

    </Route>

  )
);






function App() {
  
  

  return (
    <>
    
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  )
}

export default App
