import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function LoginForm() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const source = axios.CancelToken.source();

  const handleFormSubmit = async (data: FieldValues) => {
    const params = {
      username: data?.username,
      password: data?.password,
    };
    const credentials = btoa(`${params?.username}:${params?.password}`);
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/login",
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          cancelToken: source.token,
          timeout: 5000,
        }
      );

      setTimeout(() => {
        source.cancel("Request timed out");
      }, 5000);

      const token = res.headers.authorization;
      const exp: {
        username: string;
        iat: number;
        exp: number;
      } = jwtDecode(token);
      console.log(exp);
      localStorage.setItem("token", token);
      localStorage.setItem("exp", `${exp?.exp}`);

      setLoading(false);

      navigate("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-5 min-vh-100">
    <img src="/logo.svg" alt="" />
    <h2 className="mb-1 mt-5" style={{
        fontSize:"2.25rem"
    }}>Log in to your account</h2>
    <p className="mb-5 fw-light">Welcome back! Select method to log in:</p>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group controlId="username" className="mb-4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            {...register("username")}
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="text"
            {...register("password")}
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button className="w-100 rounded-pill mt-5" disabled={loading} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
