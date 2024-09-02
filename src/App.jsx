import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { ROUTES } from "./constants";
import Header from './components/header';
import Footer from './components/footer';
import GadgetsPage from './pages/GadgetsPage';
import GadgetInfoPage from './pages/GadgetInfoPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return <div className="flex flex-col h-full">
    <BrowserRouter>
    <Header />
    <div className="flex-grow p-4">
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage/>}></Route>
      <Route path={ROUTES.GADGETS} element={<GadgetsPage/>}></Route>
      <Route path={ROUTES.GADGET_INFO} element={<GadgetInfoPage/>}></Route>
      <Route path={ROUTES.FALLBACK} element={<div>404 Not Found</div>}></Route>
    </Routes>
    </div>
    <Footer />
  </BrowserRouter>
</div>
}

export default App;
