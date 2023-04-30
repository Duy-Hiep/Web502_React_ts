import React from 'react'
import { useState, useEffect } from 'react';
import { IProduct } from '../types/product';
import { Button, Col, Row } from 'antd';


interface IProps {
    products: IProduct[],
}
const ProductPage = (props: IProps) => {

    const[data, setData] = useState<IProduct[]>([])

    useEffect(( ) => {
        setData(props.products)
    },[props])

    





  return (   
        <div>
            <Row gutter={[16, 16]}>
                {data.map((product, index) => {
                    return (
                        <Col span={6} key={index}>
                        <div className='text-center mt-2 fw-medium '>
                            <a href={'/products/' + product._id} className='text-decoration-none'>{product.name}</a>
                        </div>
                        <div className='text-center mt-2'>
                            <img src={product.image} alt="" width='150px'/>
                        </div>
                        <div className='text-center mt-2'>
                            <Button className='bg-primary me-2 text-white font-bold' >Mua</Button>
                            <Button className='bg-primary text-white ' href={'/products/' + product._id}>Chi Tiet
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary ">
                                +99 <span className="visually-hidden">unread messages</span></span>
                            </Button>
                        </div>
                        </Col>
                    )
                })}
            </Row>
              
            
        </div>
  )
}

export default ProductPage