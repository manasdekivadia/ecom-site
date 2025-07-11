import React from "react";
import {Routes , Route , useLocation} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {

  return (
    <>
      <Route
        path="/admin/*"
        element = {
          <ProtectedRoute>
            <AdminRoutes/>
          </ProtectedRoute>
        }
      />
    
    </>
  )
}

const AdminRoutes = ()=>{
  return (
    <Routes>

    </Routes>
  );
};

export default App
