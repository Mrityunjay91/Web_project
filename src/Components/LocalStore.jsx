import React, { useEffect, useState } from 'react'

const LocalStore = () => {


const name = 'abcd'
    const [counter,setCounter]=useState(0)
    const inc = ()=>{
        setCounter(counter+1)
    }

    const setData = ()=>{
        localStorage.setItem('data',name)
    }
     

    const getData = ()=>{
      const res =  localStorage.getItem('data' )
      console.log(res);
    }
     
    const removeData = ()=>{
       localStorage.removeItem('data' )
     
    }
     
    useEffect(()=>{
        getData()
    },[])

  return (
    <div> 
{counter}
<button onClick={setData}>set data</button>
<button onClick={getData}>getData data</button>
<button onClick={removeData}>removeData data</button>
    </div>
  )
}

export default LocalStore