import React, { useState, useCallback, useContext} from 'react'
import List from '../useRef/List';
import MyContext from '../useContext/Store';

export default function CalllBack(){
const [number, setNumber] = useState(1)
const [dark, setDark] = useState(false)
const { name, function1 } = useContext(MyContext)
const getItems = useCallback((incrementor) => {
  return [number + incrementor, number + 1 + incrementor, number + 2 + incrementor]
}, [number])

const theme = {
  backgroundColor: dark ? '#333' : '#FFF',
  color: dark ? '#FFF' : '#333'
}
return (
  <div style={theme}>
    <input
      type="number"
      value={number}
      onChange={e => setNumber(parseInt(e.target.value))}
    />
      <button onClick={function1}>callback</button>

    <button onChange={() => setDark(preDark => !preDark)}>Toggle theme</button>
    <List getItems={getItems}/>
  </div>
)
}