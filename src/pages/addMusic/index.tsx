import { IonImg, IonButton } from "@ionic/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { person, musicalNote } from "ionicons/icons";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import IconInput from "../../components/iconInput";
import InputFile from "../../components/inputFile";
import { getAppStorage } from "../../config/firebase";
import { addDocumentToCollection } from "../../utils/firebase";

interface AddMusicForm {
  name: string;
  thumbnail: FileList;
  song: FileList;
  creator: string;
}
const AddMusicPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<AddMusicForm>({ mode: "onChange" });

  const history = useHistory();

  const addMusic = async (data: AddMusicForm) => {
    try {
      const thumbnailFile = data.thumbnail[0];
      const songFile = data.song[0];

      // handle save file on storage
      const thumbnailStorageRef = ref(
        getAppStorage,
        `${data.name}/thumbnails/${thumbnailFile.name}`
      );
      const songStorageRef = ref(
        getAppStorage,
        `${data.name}/songs/${songFile.name}`
      );
      await uploadBytes(thumbnailStorageRef, thumbnailFile);
      await uploadBytes(songStorageRef, songFile);

      // handle add document to musics collection
      const thumbnailUrl = await getDownloadURL(thumbnailStorageRef);
      const songUrl = await getDownloadURL(songStorageRef);
      await addDocumentToCollection("musics", {
        name: data.name,
        thumbnail: thumbnailUrl,
        song: songUrl,
        creator: data.creator,
      });
      history.push("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IonImg src={require("../../assets/img/logo.png")} className="logo-app" />
      <Controller
        control={control}
        name="name"
        rules={{
          required: { value: true, message: "Tên bài hát không được để trống" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <IconInput
            value={value}
            onChange={onChange}
            errorMessage={errors.name?.message!}
            label="Tên bài hát"
            onBlur={onBlur}
            icon={musicalNote}
          />
        )}
      />
      <Controller
        control={control}
        name="creator"
        rules={{
          required: { value: true, message: "Tác giả không được để trống" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <IconInput
            value={value}
            onChange={onChange}
            errorMessage={errors.creator?.message!}
            label="Tác giả"
            onBlur={onBlur}
            icon={person}
          />
        )}
      />
      <Controller
        control={control}
        name="thumbnail"
        rules={{
          required: { value: true, message: "Tác giả không được để trống" },
        }}
        render={({ field: { onChange, onBlur, ref } }) => (
          <InputFile
            onChange={(e) => onChange(e.target.files)}
            label="Select thumbnail file..."
          />
        )}
      />
      <Controller
        control={control}
        name="song"
        rules={{
          required: { value: true, message: "Tác giả không được để trống" },
        }}
        render={({ field: { onChange, onBlur } }) => (
          <InputFile
            onChange={(e) => onChange(e.target.files)}
            label="Select song file..."
          />
        )}
      />
      <IonButton
        className="submit-button"
        onClick={handleSubmit((data) => addMusic(data))}
        color="success"
        expand="block"
        disabled={!isDirty || !isValid}
      >
        Create
      </IonButton>
    </>
  );
};
export default AddMusicPage;
