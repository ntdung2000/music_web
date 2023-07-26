import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, lockClosed, mailOpen, person } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import IconInput from "../../components/iconInput";
import "./RegisterPage.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAppAuth } from "../../config/firebase";
import { addDocumentToCollection } from "../../utils/firebase";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}
const RegisterPage = () => {
  const history = useHistory();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterForm>({ mode: "onChange" });

  const signUp = async (data: RegisterForm) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAppAuth,
        data.email,
        data.password
      );

      const newUser = userCredential.user
      await updateProfile(newUser, { displayName: data.name })
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons onClick={() => history.goBack()}>
            <IonIcon icon={arrowBack} color="success" size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg
          src={require("../../assets/img/logo.png")}
          className="logo-app"
        />
        <Controller
          control={control}
          name="name"
          rules={{
            required: { value: true, message: "Mật khẩu không được để trống" },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <IconInput
              value={value}
              onChange={onChange}
              errorMessage={errors.name?.message!}
              label="Name"
              onBlur={onBlur}
              icon={person}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: { value: true, message: "Email không được để trống" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <IconInput
              value={value}
              onChange={onChange}
              errorMessage={errors.email?.message!}
              label="Email"
              onBlur={onBlur}
              icon={mailOpen}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: { value: true, message: "Mật khẩu không được để trống" },
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <IconInput
              value={value}
              onChange={onChange}
              errorMessage={errors.password?.message!}
              label="Password"
              onBlur={onBlur}
              icon={lockClosed}
            />
          )}
        />
        <IonButton
          className="submit-button"
          onClick={handleSubmit((data) => signUp(data))}
          color="success"
          expand="block"
          disabled={!isDirty || !isValid}
        >
          Sign up
        </IonButton>
      </IonContent>
    </>
  );
};

export default RegisterPage;
