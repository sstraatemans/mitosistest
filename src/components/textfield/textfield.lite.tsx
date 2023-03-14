import { container } from './textfield.css';

type TextfieldProps = {
  label: string;
  id: string;
};

export default function TextField({ label, id }: TextfieldProps) {
  return (
    <div className={container}>
      <label htmlFor={id}>{label}</label>
      <input name={id}></input>
    </div>
  );
}
