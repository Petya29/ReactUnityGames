import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/partials/NavBar";
import { useLocalStorage } from "./hooks/use-local-storage";
import { i18n } from "./lib";
import { Lang } from "./models/entities";
import { AppRouter } from "./router/AppRouter";

function App() {

  const [storageLanguage] = useLocalStorage<keyof typeof Lang>("lang", "en");

  useEffect(() => {
    // TODO get lang from checkAuth
    i18n.changeLanguage(storageLanguage);
  }, []);

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
