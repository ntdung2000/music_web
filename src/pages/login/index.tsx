import { IonButton, IonButtons, IonContent, IonFooter, IonImg, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { lockClosed, mailOpen } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import IconInput from "../../components/iconInput";
import "./LoginPage.css";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAppAuth } from "../../config/firebase";

interface LoginForm {
  email: string;
  password: string;
}
const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()
  const { handleSubmit, control, formState: { errors, isDirty, isValid } } = useForm<LoginForm>({ mode: 'onChange' });

  const signIn = async (data: LoginForm) => {
    try {
      const res = await signInWithEmailAndPassword(getAppAuth, data.email, data.password );
      console.log(res)
      history.push("/");
    } catch (error) {
      console.log(error);
      setErrorMessage('Tài khoản ko tồn tại');
    }
  }

  return (
    <>
      <IonContent className="ion-padding" >
        <IonImg src={require("../../assets/img/logo.png")} className="logo-app"/>
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: { value: true, message: 'Email không được để trống' }, 
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i , message: 'Email không hợp lệ'}
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
            required: { value: true, message: 'Mật khẩu không được để trống' }, 
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
          onClick={handleSubmit(data => signIn(data))} 
          color="success" 
          expand="block"
          disabled={!isDirty || !isValid}
        >
          Log In
        </IonButton>
        <IonRow className="ion-justify-content-center">
          <IonText  color="danger">{errorMessage}</IonText>
        </IonRow>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow className="ion-justify-content-center">
            <IonButton className="text-button" color="success" fill="outline">
              <NavLink to="/register" className="text-link">Create account</NavLink>
            </IonButton>
          </IonRow>
        </IonToolbar>
    </IonFooter>
  </>
  )
}

export default LoginPage