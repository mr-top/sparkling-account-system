import { useEffect, useState } from "react";

function TextField (props) {
  const {labelValue, inputChange, limit, value, invalid, ...rest} = props;
  const [input, setInput] = useState(value || '');

  useEffect(() => {
    inputChange(input);
  }, [input]);

  return (
    <div className="flex flex-col">
      <label className="text-sm">{labelValue}</label>
      <input {...rest} onChange={e => setInput(e.target.value)} value={input} className={`input input-bordered w-full max-w-xs ${invalid ? 'input-error' : ''}`} />
      {limit && <p>{`${input.length}/${limit}`}</p>}
    </div>
  )
}

function AreaField (props) {
  const {labelValue, inputChange, limit, value, invalid, ...rest} = props;
  const [input, setInput] = useState(value || '');

  useEffect(() => {
    inputChange(input);
  }, [input]);

  return (
    <div className="flex flex-col">
      <label className="text-sm">{labelValue}</label>
      <textarea {...rest} onChange={e => setInput(e.target.value)} value={input} className={`textarea textarea-bordered w-full max-w-xs ${invalid ? 'textarea-error' : ''}`} />
      {limit && <p>{`${input.length}/${limit}`}</p>}
    </div>
  )
}

export {TextField, AreaField}