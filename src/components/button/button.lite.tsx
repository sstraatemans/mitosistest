import { container } from './button.css';

console.log({ container });

type ButtonProps = {
  children?: any;
};

export default function Button(props: ButtonProps) {
  return <button className={container}>{props.children}</button>;
}
