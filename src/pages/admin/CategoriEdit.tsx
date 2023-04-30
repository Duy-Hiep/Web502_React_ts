import React,  { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber } from 'antd';
import { ICategory } from '../../types/category';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
    categories: ICategory[],
    onEdit: (category: ICategory) => void
}

const CategoryEdit = (props: Props) => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [category, setcategory] = useState<ICategory>()

    useEffect(() => {
        const currentCategory = props.categories.find((category:ICategory) => category._id === id)
        setcategory(currentCategory)
    }, [props])

    useEffect(() => {
        setFields()
    },[category])

    const [form] = Form.useForm()
    const setFields = () => {
        form.setFieldsValue({
            _id: category?._id,
            name: category?.name
        })
    }

    const onHandleSubmit = (data:any) => {
        props.onEdit(data)
        alert('Sua thanh cong')
        navigate('/admin/categories')
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    
      const validateMessages = {
        required: '${label} is required!',
        
        
      };
  return (
    <div>
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

          <Form.Item  label="Product Name" name="name" rules={[{type: 'string' ,required: true }, {whitespace: true, message: "không được để trống"}]} >
            <Input />
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

export default CategoryEdit