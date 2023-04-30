import React, { useState } from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import { SigNin } from '../../api/auth';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
type INputs = {
    email: string;
    password: string;


}

const SigNinAdmin = (props: INputs) => {
const navigate = useNavigate()
    // const {
    //     register,
    //     handleSubmit,
    //     formState : {errors},
    // } = useForm <INputs>();

    const Submit:SubmitHandler<INputs> = async (inputValue: INputs) => {
        const {data} = await SigNin(inputValue)

        localStorage.setItem("user", JSON.stringify(data))
        alert("Ban da dang nhap thanh cong")
        navigate('/products')
    }
    

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div className='mx-auto'>
        {/* <form action="" onSubmit={handleSubmit(Submit)}>
            <input type="text" {...register("email", {required: true})} />
            {errors.email && <span>Truong email la bat buoc</span>}
            <input type="password" {...register("password", {required: true})} />
            {errors.password && <span>Truong password la bat buoc</span>}
            <button>Submit</button>
        </form> */}
        <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={12}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, }}
            initialValues={{ remember: true }}
            onFinish={Submit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className='mb-2'>
                Dang Nhap
            </Button>
            <p>Ban chua co tai khoan hay <a href="/signup">Dang ky</a> tai khoan!</p>
            </Form.Item>
        </Form>
        </Col>
    </Row>
    </div>
  )
}

export default SigNinAdmin