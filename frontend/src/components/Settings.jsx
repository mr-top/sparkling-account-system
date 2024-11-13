import { useState } from "react";
import Basic from './settings/Basic';
import Security from './settings/Security';
import WebSettings from './settings/WebSettings';
import Removal from './settings/Removal';

function Settings (props) {
  const [selected, setSelected] = useState('basic');

  return (
    <div className="bg-base-100 w-[40rem] my-10 px-10 py-5 rounded-md flex flex-col sm:flex-row">
      <div className="flex flex-col">
        <button onClick={() => setSelected('basic')} className={`${selected === 'basic' ? 'font-semibold' : ''} text-start`}>Basic information</button>
        <button onClick={() => setSelected('security')} className={`${selected === 'security' ? 'font-semibold' : ''} text-start`}>Security & Privacy</button>
        <button onClick={() => setSelected('websettings')} className={`${selected === 'websettings' ? 'font-semibold' : ''} text-start`}>Web settings</button>
        <button onClick={() => setSelected('removal')} className={`${selected === 'removal' ? 'font-semibold' : ''} text-start`}>Account removal</button>
      </div>
      <div className="w-full h-[1.5px] sm:h-full sm:w-[1.5px] bg-primary sm:mx-8"></div>
      <div>
        {selected === 'basic' && <Basic setAlert={props.setAlert}/>}
        {selected === 'security' && <Security setAlert={props.setAlert}/>}
        {selected === 'websettings' && <WebSettings/>}
        {selected === 'removal' && <Removal setAlert={props.setAlert}/>}
      </div>
    </div>
  )
}

export default Settings;