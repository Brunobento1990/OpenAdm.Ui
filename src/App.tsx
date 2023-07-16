import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useLoader } from './Components/Loading';
import { useModal } from './Components/Modals';
import { AppRoutes } from './AppRoutes';

function App() {

  const Loader = useLoader();
  const Modal = useModal();

  return (
    <div className="App">
      <Loader.Component />
      <Modal.Component />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
