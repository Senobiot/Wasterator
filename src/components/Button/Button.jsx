import classes from "./Button.module.scss";

export default function Button({ title, className, color, onClick }) {
  return (
    <div
      className={`${classes.button} ${className && className}`}
      style={{ backgroundColor: color && color }}
      onClick={onClick && onClick}
    >
      {title}
    </div>
  );
}
