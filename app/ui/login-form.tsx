'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button, Checkbox, Form, Input } from 'antd';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

type FieldType = {
  username?: string;
  password?: string;
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Form
    name="basic"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='login-form'
  >
    <h2>Đăng nhập</h2>
    <Form.Item<FieldType>
      label="Tên đăng nhập"
      name="username"
      rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
    >
      <Input style={{height:'45px'}}/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Mật khẩu"
      name="password"
      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
    >
      <Input.Password style={{height:'45px'}} />
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit" style={{width:'100%'}}>
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  )
}
