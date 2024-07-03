import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { ROUTES } from "./constants";
import Header from './components/header';
import Footer from './components/footer';
import GadgetsPage from './pages/GadgetsPage';

const App = () => {
  return <div className="flex flex-col h-full">
    <BrowserRouter>
    <Header />
    <div className="flex-grow p-4">
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.GADGETS}/>}></Route>
      <Route path={ROUTES.GADGETS} element={<GadgetsPage />}></Route>
      <Route path={ROUTES.GADGET_INFO} element={<div>Gadget info</div>}></Route>
      <Route path={ROUTES.FALLBACK} element={<div>404 Not Found</div>}></Route>
    </Routes>
    </div>
    <Footer />
  </BrowserRouter>
</div>
}

export default App;
