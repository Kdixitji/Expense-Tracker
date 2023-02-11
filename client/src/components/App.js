import AppBar from "./AppBar.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
