import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Get } from '../api/products';
import { IProduct } from '../types/product';
import axios from 'axios';

type props = {
    products: IProduct[]
}

const ProductDetailPage = (props: props) => {
    
    const {id} = useParams();
    // console.log(id);
    
    const [product, setProduct] = useState({
        _id: '',
        name: '',
        price: 0,
        image: '',
        description: '',
    })
        

    useEffect(() => {
        axios.get(`http://localhost:8090/products/${id}`)
        .then(({data}) => setProduct(data.product)
        )
 
    },[])


    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <img src={product.image} alt="" width='150px'/>
            <p>{product.description}</p>
        </div>
    )
    
}
export default ProductDetailPage