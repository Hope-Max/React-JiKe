import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login Form */}
        <Form autoComplete="off" validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="mobile"
            // Multiple validation logic: Validate the previous rule first, then proceed to validate the next one
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              {
                pattern: /^1[3-9][0-9]{9}$/,
                message: "Please enter the correct format for the phone number."
              }
            ]}>
            <Input size="large" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input the verification code!',
              },
            ]}>
            <Input size="large" placeholder="Verification Code" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login