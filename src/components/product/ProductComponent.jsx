/* eslint eqeqeq: 0 */
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postNewProductApi, getSpecificProductApi,putUpdateProductApi } from "./api/ProductApiService"

export default function ProductComponent(){
    
    const {id} = useParams()
    const[productId,setProductId]=useState('')
    const[productName,setProductName]=useState('')
    const[manDate,setManDate]=useState('')
    const[expDate,setExpDate]=useState('')
    const[price,setPrice]=useState('')
    const[quantity,setQuantity]=useState('')

    useEffect(() => {
        if(id!=-1){
        getSpecificProductApi(id)
        .then((response) => {
            setProductId(response.data.productId)
            setProductName(response.data.productName)
            setManDate(response.data.manDate)
            setExpDate(response.data.expDate)
            setPrice(response.data.price)
            setQuantity(response.data.quantity)
        })
        .catch((error) => {
            console.error('Error fetching specific product data:', error);
        });}
    }, [id]);
    

    const navigate = useNavigate()
    const[message,setMessage] = useState(null)


    function onSubmit(values) {
        
        const product = {
            productId: values.productId,
            productName: values.productName,
            manDate: values.manDate,
            expDate: values.expDate,
            price: values.price,
            quantity:values.quantity
        }

        if(id==-1) {
            postNewProductApi(product)
            .then(response => {
                console.log(response.data)
                navigate('/products')
            })
            .catch(error => { 
                setMessage(error.response.data.message)   
               console.log(error.response.data.message)
            })
    
        } else if(id==product.productId){
            putUpdateProductApi(product)
            .then(response => { 
                console.log(response.data)
                navigate('/products')              
            })
            .catch(error => {
                setMessage(error.response.data.message)
                console.log(error)
            })
        }else{
            setMessage("You are trying to modify other product or a product with same id doesn't exist")
        }
    }

    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h1>Please enter the product details</h1>
            </div>
            {message && <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="alert alert-warning">{message}</div>}
             <div>
               
               <Formik initialValues={{productId,productName,manDate,expDate,price,quantity}} 
                   enableReinitialize={true} onSubmit= {onSubmit}>
                    { (props)=>(
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Product Id</label>
                                        <Field type="number" className="form-control" autoComplete="off" name="productId"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Product Name</label>
                                        <Field type="text" className="form-control" autoComplete="off" name="productName"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Manufacture Date</label>
                                        <Field type="date" className="form-control" name="manDate"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Expiry Date</label>
                                        <Field type="date" className="form-control" name="expDate"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field type="number" className="form-control" name="price"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Quantity</label>
                                        <Field type="number" className="form-control" name="quantity"/>
                                    </fieldset>

                                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                        <button className="btn btn-success m-5" type="submit">
                                                    Save
                                        </button>
                                    </div>
                                </Form>
                    )
               }
               </Formik>
            </div>
        </div>
    )
}