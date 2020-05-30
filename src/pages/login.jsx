import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { useAuth } from '../hooks/useAuth';
import { useRouter } from '../hooks/useRouter';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Login() {
    const auth = useAuth();
    const { replace, location } = useRouter();
    const { from } = location.state || { from: { pathname: '/projects' } };

    useEffect(() => {
        if (auth.user && !auth.user.guest) {
            replace(from);
        }
    }, [from, replace, auth]);

    const onFinish = async ({ username, password }) => {
        await auth.signin(username, password);
        replace(from);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label='Username'
                name='username'
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
