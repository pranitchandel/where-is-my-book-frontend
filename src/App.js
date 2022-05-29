import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Landing from "./Components/Landing/Landing";
import SearchList from "./Components/SearchListPage/SearchList";
import SelectedProduct from "./Components/SelectedProduct/SelectedProduct";
import Account from "./Components/Account/Account";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/searchList" element={<SearchList />}></Route>
            <Route path="/productPage" element={<SelectedProduct />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
