import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/partials/NavBar";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
