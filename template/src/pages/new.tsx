import { documentCreate, PrismaForm } from "@edwin/client";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";

export default function Index() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
  });

  return (
    <div>
      <h2>Nouveau doc</h2>

      <PrismaForm
        validationSchema={schema}
        initialValues={{ title: "", content: "" }}
        onSubmitQuery={(values) =>
          documentCreate({
            data: {
              title: values.title,
              content: values.content,
              wiki: {
                connect: { id: "ckyu0l9a10000bikdrlej2h80" },
              },
            },
          })
        }
        onSuccess={(data) => navigate("/document/" + data.id)}
      >
        {(formikProps, loading, success) => (
          <>
            <Field name="title" />
            <Field name="content" />
            <input type="submit" value="envoyer" disabled={loading} />
          </>
        )}
      </PrismaForm>
    </div>
  );
}
