import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import ProductListComponent from './ProductListComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import ProductComponent from './ProductComponent'
import SpecificProductComponent from './SpecificProductComponent'
import SpecificProduct from './SpecificProduct'
import '../../css/ProductApp.css';

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children
    
    return <Navigate to="/" />
}

export default function ProductApp() {
    return (
        <div className="ProductApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    
                    <Routes>
                        <Route path='/' element={ <LoginComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        
                        <Route path='/welcome' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />
                        
                        <Route path='/products' element={
                            <AuthenticatedRoute>
                                <ProductListComponent /> 
                            </AuthenticatedRoute>
                        } />
                        
                        <Route path='/product/:id' element={
                            <AuthenticatedRoute>
                                <ProductComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/specificproduct/:inputValue' element={
                            <AuthenticatedRoute>
                                <SpecificProductComponent /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='/specific' element={
                            <AuthenticatedRoute>
                                <SpecificProduct /> 
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div> 
    )
}
