import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function PrimaryButton(props) {
  const theme = useContext(ThemeContext);
  const themeClass = theme.darkOn ? 'bg-slate-400 text-zinc-900' : 'bg-zinc-800 text-slate-100';
  const { children, ...rest } = props;

  return (
    <button className={`${themeClass} rounded-md sm:rounded-lg px-2 py-1 sm:px-5 sm:py-2 text-xs sm:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0)]`} {...rest}>
      <p>{children}</p>
    </button>
  )
}

function SecondaryButton(props) {
  const { children, ...rest } = props;

  return (
    <button className={'bg-indigo-700 text-slate-100 rounded-md sm:rounded-lg px-2 py-1 sm:px-5 sm:py-2 text-xs sm:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0)]'} {...rest}>
      <p>{children}</p>
    </button>
  )
}

export { PrimaryButton, SecondaryButton }