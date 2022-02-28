import { Formik, Form as FormikForm } from "formik";
import { ReactNode, useState } from "react";
import * as yup from "yup";
import { useLogin, useSetMessage } from "..";

type Props = {
  children: ReactNode;
};

export default function LoginForm({ children }: Props) {
  const login = useLogin();
  const setMessage = useSetMessage();

  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        setLoading(true);
        const { error } = await login(values.email, values.password);

        if (error) {
          setLoading(false);
          setMessage(error);
        }
      }}
    >
      {(formikProps) => (
        <FormikForm>
          {typeof children === "function"
            ? children(formikProps, loading)
            : children}
        </FormikForm>
      )}
    </Formik>
  );
}
