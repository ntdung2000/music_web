import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { arrowBack, person } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAppAuth } from "../../config/firebase";
import "./ProfilePage.css";
interface User {
  id: string;
  name: string;
  email: string;
}
const ProfilePage = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<User>({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const user = getAppAuth.currentUser;
    if (user) {
      setUserProfile({
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  },[])

  const logout = async () => {
    await signOut(getAppAuth);
    history.push("/login");
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="success">
          <IonButton
            fill="clear"
            color="light"
            onClick={() => history.goBack()}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent color="success" className="profile-content ion-padding">
        <IonCol>
          <div className="profile-avatar">
            <IonIcon icon={person} color="success" />
          </div>
          <IonText>
            <h1>{userProfile.name}</h1>
          </IonText>
          <IonText>
            <h4>{userProfile.email}</h4>
          </IonText>
        </IonCol>
        <IonCol>
          <IonButton
            expand="full"
            className="profile-option-button"
            color="success"
          >
            <NavLink to="/list" className="text-link">
              List Music
            </NavLink>
          </IonButton>
          <IonButton
            expand="full"
            className="profile-option-button"
            color="success"
          >
            <NavLink to="/search" className="text-link">
              Search Music
            </NavLink>
          </IonButton>
          <IonButton
            expand="full"
            className="profile-option-button"
            color="danger"
            onClick={logout}
          >
            Logout
          </IonButton>
        </IonCol>
      </IonContent>
    </>
  );
};

export default ProfilePage;
