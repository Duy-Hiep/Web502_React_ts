import { useState, useEffect } from "react"
import { IProduct } from "../../types/product"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { ICategory } from "../../types/category";

interface ProductAdd {
  onAdd: (product: IProduct[]) => void
  categories: ICategory[]
}


const ProductAdd = (props: ProductAdd) => {
  // console.log(props);
  
  const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  // } = useForm();
    
  const onHandleSubmit = (data:any) => {
    // console.log(data);
    
    props.onAdd(data)
    navigate("/admin/products")
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
    
  return (
    <div className="container">
      <Form
          {...layout}
          name="nest-messages"
          onFinish={onHandleSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item  label="Product Name" name="name" rules={[{type: 'string' ,required: true }, {whitespace: true, message: "không được để trống"}]} >
            <Input />
          </Form.Item>

          <Form.Item  label="Product Image" name="image" rules={[{ type: 'string', required: true },{whitespace: true, message: "không được để trống"}]} >
            <Input />
          </Form.Item>

          <Form.Item  label="Product Description" name="description" rules={[{ type: 'string', required: true }, {whitespace: true, message: "không được để trống"}]} >
            <Input />
          </Form.Item>

          <Form.Item  label="Product Price" name="price" rules={[{ type: 'number', min: 0 , required: true}]} >
            <InputNumber />
          </Form.Item>

          <Form.Item  label="Product Category" name="categoryId" rules={[{ type: 'string', min: 0 , required: true}]} >
          <Select
              defaultValue=""
              style={{ width: 120 }} 
              options={props.categories.map((item) => (
                { value: `${item._id}`, label: `${item.name}` }
              ))}
            />
          </Form.Item>
              
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              ADD PRODUCTS
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default ProductAdd

{/* <form action="" id="form-add" onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="form-group mb-3">
              <label htmlFor="">Product's Name</label>
              <input type="text" className="form-control" {...register('name')}/>
          </div>

          <div className="form-group mb-3">
              <label htmlFor="">Image Product</label>
              <input type="text" className="form-control" {...register('image')}/>
          </div>

          <div className="form-group mb-3">
              <label htmlFor="">Product Description</label>
              <input type="text" className="form-control" {...register('description')}/>
          </div>

          <div className="form-group mb-3">
              <label htmlFor="">Product Price</label>
              <input type="number" className="form-control" {...register('price')}/>
          </div>

          <div className="form-group mb-3">
              <label htmlFor="">Product CategoryId</label>
              <input type="string" className="form-control" {...register('categoryId')}/>
          </div>

          <div className="form-group mb-3">
              <button className="btn btn-primary">ADD Products</button>
              
          </div>
        </form> */}