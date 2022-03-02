import { LoginForm, useSetTitle } from "@edwin/client";
import { Field } from "formik";

export default function LoginPage() {
  useSetTitle("Connexion");

  // Utilisation du composant LoginForm qui comprend toute la logique de connexion
  return (
    <LoginForm>
      <Field type="email" name="email" />
      <Field type="password" name="password" />
      <input type="submit" value="Connexion" />
    </LoginForm>
  );
}
