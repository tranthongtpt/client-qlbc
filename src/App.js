import React, { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route, Redirect, withRouter} from "react-router-dom";
import PublicRoutes from "./Utils/PublicRoute";
import PrivateRouter from "./Utils/PrivateRoute";
import {
  Ecommerce,
  ListReporter,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ListUnits,
  ColorMapping,
  Editor,
  Login,
  EnterMail,
  EnterCode,
  ForgotPassword
} from "./pages";
import "./App.css";
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

const App = () => {

  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserSession(token);
      setAuthLoading(false);
    } else {
      removeUserSession();
      setAuthLoading(false);
    } 
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <BrowserRouter>     
      <Routes>
          <Route element={<PublicRoutes/>}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/entermail" element={<EnterMail/>}/>
            <Route path="/entercode" element={<EnterCode/>}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          </Route>

          <Route element={<PrivateRouter/>}>
            <Route path="/bangdieukhien" element={<Ecommerce />} />
            {/* pages  */}
            <Route path="/listreporter" element={<ListReporter />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            {/* apps  */}
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/list-units" element={<ListUnits />} />
            {/* charts  */}
            <Route path="/line" element={<Line />} />
            <Route path="/area" element={<Area />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/color-mapping" element={<ColorMapping />} />
            <Route path="/pyramid" element={<Pyramid />} />
            <Route path="/stacked" element={<Stacked />} />
          </Route>

      </Routes>
  </BrowserRouter>
  );
};

export default App;
