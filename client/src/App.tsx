import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainTheme } from "./components/theme/MainTheme";
import { LoadingScreen } from "./components/utils/LoadingScreen";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useLocalStorage } from "./hooks/use-local-storage";
import { i18n } from "./lib";
import { Lang } from "./models/entities";
import { AppRouter } from "./router/AppRouter";
import { refreshAuth, setIsAuthChecking } from "./store/slices/authSlice";

function App() {

  const dispatch = useAppDispatch();

  const [storageLanguage, setStorageLanguage] = useLocalStorage<keyof typeof Lang>("lang", "en");

  const { isAuthChecking } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(refreshAuth())
      .unwrap()
      .then((originalPromiseResult) => {
        i18n.changeLanguage(originalPromiseResult.user.lang)
          .then(() => setStorageLanguage(originalPromiseResult.user.lang));
      })
      .catch((error) => {
        i18n.changeLanguage(storageLanguage);
      })
      .finally(() => {
        dispatch(setIsAuthChecking(false));
      });
  }, []);


  if (isAuthChecking) {
    return (
      <LoadingScreen />
    )
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <MainTheme>
            <AppRouter />
          </MainTheme>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
