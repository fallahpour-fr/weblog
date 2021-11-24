import React, { useState, useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../component/context/auth";
import Card from "../component/Card";
import "./Sign-in.css";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const [errorModule, setErrorModule] = useState();
  const { setAuthTokens } = useAuth();
  let history = useHistory();
  // const referer = props.location.state.referer || '/';
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();
    // props.signInData(values);

    fetch("http://localhost:3030/signin/users", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            "you did not regestere before , please go to sign up page ."
          );
        }
        return response.json();
      })
      .then((data) => {
        setAuthTokens(data.token ,data.data);
        history.push("/home");
      })
      .catch((err) => {
        setErrorModule({
          title: "Error",
          message: err.message,
        });
      });
  };

  useEffect(() => {
    props.ErrorHandler(errorModule);
  }, [errorModule]);

  return (
    <Card className="Card">
      <h1>Blog</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        onSubmit={submitHandler}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <div className="orLine">OR</div>
          <div>
            <Link to="/signup">Regester now!</Link>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignIn;
