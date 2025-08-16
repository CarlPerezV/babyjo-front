import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
