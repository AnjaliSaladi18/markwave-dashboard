import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Dashboard/Products';
const AppRoutes = ({setToast}) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setToast={setToast}></Login>}></Route>
                    <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                    <Route path="/products" element={<Products/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default AppRoutes;