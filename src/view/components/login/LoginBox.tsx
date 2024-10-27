import { Col, Form, Row } from "react-bootstrap";
import Card from "../UI/Card";
import LoginButton from "./LoginButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTypedDispatch, useTypedSelector } from "src/utility/hooks";
import { login } from "src/store/auth/actions";
import socomec_logo from "src/img/socomec_logo.jpg";

type FormValues = {
  email: string;
  password: string;
};

const LoginBox: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { error } = useTypedSelector((state) => state.auth);

  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <Card className="py-2 w-25 rounded mt-5 white-shadow">
      <Row className="my-4">
        <img
          src={socomec_logo}
          className="mx-auto d-block w-75"
          alt="logo di Socomec"
        />
      </Row>

      <Row className="mt-1 text-center">
        <h1 className="h5 socomec">Smart4Energy</h1>
      </Row>

      {error ? (
        <Row className="mt-1 text-danger">
          <p className="mb-0">{error}</p>
        </Row>
      ) : null}

      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group className="my-2">
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Control type="text" {...register("email")} />
        </Form.Group>

        <Form.Group className="mt-2 mb-4">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" {...register("password")} />
        </Form.Group>

        <Form.Group>
          <LoginButton />
        </Form.Group>
      </Form>
    </Card>
  );
};

export default LoginBox;
