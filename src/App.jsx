import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <main role="main" className="min-h-screen">
          <div className="mx-auto">
            <AppRoutes />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
