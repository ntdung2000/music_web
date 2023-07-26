import { IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonRow } from "@ionic/react";
import "./IconInput.css"
export namespace IconInputType {
  export type Type = "date" | "datetime-local" | "email" | "month" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week"
  export type Props = {
    value: string;
    label: string;
    placeholder?: string;
    errorMessage: string;
    type?: Type;
    icon: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
  }
}
const IconInput = ({value, label, placeholder, errorMessage, type = "text", icon, onChange, onBlur}: IconInputType.Props) => {

  return (
    <IonItem fill="solid" lines="full" className={`${!errorMessage && 'ion-valid'} ${errorMessage && 'ion-invalid'}`}>
      <IonRow className="input-container">
        <IonIcon icon={icon} size="large" className="input-icon" />
        <IonCol >
          <IonLabel position="floating">{label}</IonLabel>
          <IonInput 
            value={value} 
            type={type} 
            placeholder={placeholder} 
            onIonInput={(event) => onChange(event)} 
            onIonBlur={(e) => onBlur(e)}
          >
          </IonInput>
        </IonCol>
      </IonRow>
      <IonNote slot="error">{errorMessage}</IonNote>
    </IonItem>
  )
}

export default IconInput