import { RefCallBack } from "react-hook-form";
import "./InputFile.css";
export namespace IconInputType {
  export type Props = {
    label: string;
    onChange: (e: any) => void;
  };
}
const InputFile = ({ label, onChange }: IconInputType.Props) => {
  return (
    <div className="input-file-container">
      <input
        className="input-file"
        id="my-file"
        type="file"
        onChange={onChange}
      />
      <label tabIndex={0} htmlFor="my-file" className="input-file-trigger">
        {label}
      </label>
    </div>
  );
};

export default InputFile;
