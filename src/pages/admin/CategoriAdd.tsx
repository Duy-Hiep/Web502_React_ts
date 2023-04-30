import React from 'react'
import { ICategory } from '../../types/category'
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {
    onAdd: (category: ICategory[]) => void
}

const CategoryAdd = (props: Props) => {

const navigate = useNavigate();

const onHandleSubmit = (data:any) => {
    props.onAdd(data)
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
          name="nest-messages"
          onFinish={onHandleSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item  label="Product Name" name="name" rules={[{type: 'string' ,required: true }, {whitespace: true, message: "không được để trống"}]} >
            <Input />
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

export default CategoryAdd