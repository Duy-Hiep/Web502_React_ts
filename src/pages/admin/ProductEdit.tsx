import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { IProduct } from '../../types/product';
import { ICategory } from '../../types/category';


type Props = {
  products: IProduct[],
  onEdit: (product: IProduct) => void
  categories: ICategory[]
}

const ProductEdit = (props : Props) => {
const navigate = useNavigate();
const {id} = useParams();

const [products, setProduct] = useState<IProduct>()

// const { reset} = useForm(); //reset thay doi cap nhat lai toan bo gia tri trong form


useEffect(() => {
   //product.id cua san pham la number conf id kia tren duong dan la string eps kieeur ve Number(id)
    const currentProduct = props.products.find((product:IProduct) => product._id === id) 
    setProduct(currentProduct)
},[props])


useEffect(() => {
  setFields()
},[products])


const[form] = Form.useForm()

const setFields = () => {
   form.setFieldsValue({
    _id: products?._id,
    name: products?.name,
    image: products?.image,
    description: products?.description,
    price: products?.price,
    categoryId: products?.categoryId
  })
}

const onHandleSubmit = (data : any) => {

    props.onEdit(data)
    alert('Sửa thanh công')
    navigate('/admin/products')
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
          form={form}
          name="nest-messages"
          onFinish={onHandleSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >


           <Form.Item
              label=""
              name="_id"
              style={{ display: 'none' }} // ẩn input này
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
          </Form.Item>

          <Form.Item  label="Product Name" name="name" rules={[{type: 'string' ,required: true }]} >
            <Input />
          </Form.Item>

          <Form.Item  label="Product Image" name="image" rules={[{ type: 'string', required: true }]} >
            <Input />
          </Form.Item>

          <Form.Item  label="Product Description" name="description" rules={[{ type: 'string', required: true }]} >
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
              UPDATE PRODUCTS
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default ProductEdit