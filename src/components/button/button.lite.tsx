import { container } from './button.css';

type ButtonProps = {
  children?: any;
};

export default function Button(props: ButtonProps) {
  return <button className={container}>{props.children}</button>;
}
