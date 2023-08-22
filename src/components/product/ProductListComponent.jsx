import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteProductApi, getAllProductApi } from "./api/ProductApiService"

function ProductListComponent() {

    const[products,setProducts] = useState([])

    useEffect(
        ()=> refreshProducts()
    )
    
    function refreshProducts(){
        getAllProductApi()
        .then(  response => { 
                              setProducts(response.data)
                            }
        )
        .catch((error)=> console.log(error))
    }

    function deleteProduct(id){
        deleteProductApi(id)
        .then(
            ()=>{
                refreshProducts()
            }
        )
        .catch((error)=> console.log(error))
    }

    const navigate = useNavigate()

    function updateProduct(id){
       navigate(`/product/${id}`)
    }

    function postNewProduct(){
        navigate(`/product/-1`)
    }

    return (
        <div className="container">
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>Stocks</h1></div>
            
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Manufacturing Date</th>
                                <th>Expiry Date</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(
                            product => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>                                   
                                    <td>{product.productName}</td>
                                    <td>{product.manDate.toString()}</td>
                                    <td>{product.expDate.toString()}</td>
                                    <td>{product.price}</td> 
                                    <td>{product.quantity}</td> 
                                    <td><button className="btn btn-danger"
                                        onClick={()=>deleteProduct(product.productId)}>Delete</button></td>
                                    <td><button className="btn btn-warning" 
                                        onClick={()=>updateProduct(product.productId)}>Update</button></td>                                
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
               <button style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} 
                    onClick ={postNewProduct} className="btn btn-success m-5">
                ADD NEW PRODUCT
               </button> 
            </div>
        </div>
    )
}

export default ProductListComponent