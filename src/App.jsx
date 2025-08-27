import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main role="main" className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <AppRoutes />
          </div>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
