import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { EmpresaCreate } from "./Pages/Empresa/EmpresaCreate";
import { Layout } from "./Components/Layout";

export function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/empresa/cadastrar' element={<EmpresaCreate />} />
            <Route path='/home' element={<Layout text="Home"><Dashboard /></Layout>} />
        </Routes>
    );
}