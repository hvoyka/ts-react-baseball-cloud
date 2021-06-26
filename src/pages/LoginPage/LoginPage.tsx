import { FC } from "react";
import { Form, Field } from "react-final-form";
import { required } from "redux-form-validators";
import TextInput from "../../ui/components/TextInput";
import Button from "../../ui/components/Button";
import AuthLayout from "../../layouts/AuthLayout";

interface AddUserNameFromValues {
  userName?: string;
}

const LoginPage: FC<{}> = () => {
  const onSubmit = ({ userName }: AddUserNameFromValues) => {
    console.log(userName);
  };

  return (
    <AuthLayout>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Field<string>
              name="userName"
              validate={required()}
              render={(props) => {
                return <TextInput placeholder="User name" {...props} />;
              }}
            />

            <div className="buttons">
              <Button label="Submit" />
            </div>
          </form>
        )}
      />
    </AuthLayout>
  );
};

export default LoginPage;
