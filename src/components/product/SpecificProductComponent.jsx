import { useState,useEffect } from 'react';
import { deleteProductApi,getSpecificProductApi } from "./api/ProductApiService"
import { useParams, useNavigate } from 'react-router-dom';

function SpecificProductComponent(){

    const {inputValue} = useParams(); 
    const[productId,setProductId]=useState('')
    const[productName,setProductName]=useState('')
    const[manDate,setManDate]=useState('')
    const[expDate,setExpDate]=useState('')
    const[price,setPrice]=useState('')
    const[quantity,setQuantity]=useState('')
    const[message,setMessage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getSpecificProductApi(inputValue)
        .then((response) => {
            setProductId(response.data.productId)
            setProductName(response.data.productName)
            setManDate(response.data.manDate)
            setExpDate(response.data.expDate)
            setPrice(response.data.price)
            setQuantity(response.data.quantity)
        })
        .catch((error) => {
            setMessage(error.response.data.message) 
            console.error('Error fetching specific product data:', error);
        });
    }, [inputValue]);

    function deleteProduct(id){
        deleteProductApi(id)
        .then(
            console.log('product deleted')
        )
        .catch((error)=> console.log(error))
        navigate(`/specific`)
    }

    function updateProduct(id){
       navigate(`/product/${id}`)
    }

    function postNewProduct(){
        navigate(`/product/-1`)
    }

  return (
    <div className="container">
    <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>Stocks</h1></div>
    {message && <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="alert alert-warning">{message}</div>}
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
                    <tr>
                            <td>{productId}</td>                                   
                            <td>{productName}</td>
                            <td>{manDate.toString()}</td>
                            <td>{expDate.toString()}</td>
                            <td>{price}</td> 
                            <td>{quantity}</td> 
                            <td><button className="btn btn-danger"  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                                onClick={()=>deleteProduct(productId)}>Delete</button></td>
                            <td><button className="btn btn-warning" 
                                onClick={()=>updateProduct(productId)}>Update</button></td>                                
                    </tr>
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
  );
}
export default SpecificProductComponent;