import { LoginForm, useSetTitle } from "@edwin/client";
import { Field } from "formik";

export default function LoginPage() {
  useSetTitle("Connexion");
  return (
    <LoginForm>
      <Field type="email" name="email" />
      <Field type="password" name="password" />
      <input type="submit" value="Connexion" />
    </LoginForm>
  );
}
