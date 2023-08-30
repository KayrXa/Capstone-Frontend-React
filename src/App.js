import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import NavBar from './components/NavBar';
import Contact from './components/Contact';
import MoviesList from './components/MoviesList';
import LoginUser from './components/LoginUser';
import Register from './components/Register';
import LoginAdmin from './components/LoginAdmin';
import MovieDetail from './components/MovieDetail';
import MovieAdd from './components/MovieAdd';
import MovieEdit from './components/MovieEdit';
import Cart from './components/Cart';
import Profile from './components/Profile';
import OrderSummary from './components/OrderSummary';
import OrderDetail from './components/OrderDetail';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/movies" element={<MoviesList />}></Route>
        <Route path="/movies/:mid" element={<MovieDetail />}> </Route> 
        <Route path="/movies/add" element={<MovieAdd/>}></Route>
        <Route path="/movies/edit/:mid" element={<MovieEdit/>}></Route>

        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order/:pid" element={<OrderDetail />}></Route>
        <Route path="/summary/:pid" element={<OrderSummary />}></Route>


        <Route path="/register" element={<Register />}></Route>   
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/login-admin" element={<LoginAdmin />}></Route> 
        <Route path="/profile/:name" element={<Profile />}></Route>

        <Route path="/"></Route> 
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
