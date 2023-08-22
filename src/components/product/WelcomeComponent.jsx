import {Link} from 'react-router-dom'
import {useAuth} from './security/AuthContext'

function WelcomeComponent() {
    const authContext = useAuth()
    
    return (
        <div className="WelcomeComponent">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>Welcome {authContext.userName}</h1></div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Link to="/products">View All Products</Link>
            </div>
        </div>
    )
}
export default WelcomeComponent