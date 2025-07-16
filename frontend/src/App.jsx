import React from "react";
import {Routes , Route , useLocation} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import DeleteProduct from "./pages/DeleteProduct.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import Shop from "./pages/Shop.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AdminNavbar from "./components/AdminNavBar.jsx";

function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      { isAdminRoute ? <AdminNavbar/> : <NavBar/>}
      <Routes>
        <Route path= "/" element = {<Home/>}/>
        <Route path = "/cart" element = {<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path="/cancel" element = {<Cancel/>}/>
        <Route path="/shop" element = {<Shop/>}/>
        <Route
          path="/admin/*"
          element = {
            <ProtectedRoute>
              <AdminRoutes/>
            </ProtectedRoute>
          }
        />
      </Routes>  
      {isAdminRoute ? '':<Footer/> }
    </>
  )
}

const AdminRoutes = ()=>{
  return (
    <Routes>
      <Route path= "/" element= {<Admin/>} />
      <Route path="/product/create" element={<CreateProduct/>} />
      <Route path="/product/edit/:id" element={<EditProduct/>} />
      <Route path = "/product/delete/:id" element=  {<DeleteProduct/>}/>
    </Routes>
  );
};


export default App
