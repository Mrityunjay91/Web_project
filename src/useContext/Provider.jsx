import React, { useEffect, useReducer } from 'react'
import MyContext from './Store'

const Provider = ({children}) => {

    
  const initialState = {
    name: '',
    email: '',
    firstname: '',
    lastname: '',
    age: '',
    password: '',
    array: [],
    editIndex:null,
    errors: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.field]: action.value
            }
        case 'addArray':
localStorage.setItem('arraysave',JSON.stringify([
...state.array,
action.value
]))

            return {
                ...state,
                array: [
                    ...state.array,
                    action.value
                ],
                name: '',
                email: '',
                firstname: '',
                lastname: '',
                age: '',
                password: ''
            }
        case 'EditArray':

        const updateArray = state.array

         updateArray[state.editIndex]=action?.value
         localStorage.setItem('arraysave',JSON.stringify(updateArray))
            return {
                ...state,
                array:updateArray,
                name: '',
                email: '',
                firstname: '',
                lastname: '',
                age: '',
                password: '',
                editIndex:null
            }
        case 'setError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.value
                }
            }
        case 'editEntry':
            return {
                 ...state,
                 ...action.value,
                 editIndex:action?.index
                }
             
        case 'deleteEntry':

        const filterData = state.array.filter((i,index)=>index !== action?.index)
        localStorage.setItem('arraysave',JSON.stringify(filterData))

            return {
                 ...state,
                  array:filterData
                }
             
        case 'localdata':

         
            return {
                 ...state,
                  array:action?.value
                }
             
        default:
            return state
    }
}

const [state, dispatch] = useReducer(reducer, initialState)

const change = (e) => {
    dispatch({
        type: 'change',
        value: e.target.value,
        field: e.target.name
    })
}

const submitArray = (e) => {
    e.preventDefault()

    if (state.editIndex === null) {
      
      dispatch({
        type: 'addArray',
        value: {
          name: state.name,
          email: state.email,
          firstname: state.firstname,
          lastname: state.lastname,
          age: state.age,
          password: state.password,
        }
      })
    }
    else{
      dispatch({
        type: 'EditArray',
        value: {
          name: state.name,
          email: state.email,
          firstname: state.firstname,
          lastname: state.lastname,
          age: state.age,
          password: state.password,
        }
      })
    }
  }

const handleEdit = (index) => {
  dispatch({
      type: 'editEntry',
      value: state.array[index],
      index: index
  });
};

const handleDelete = (index) => {
  dispatch({
      type: 'deleteEntry',
      index: index
  });
};

const nameValid = () => {
    if (state.name.length <= 6 || state.name.length >= 20) {
        dispatch({
            type: 'setError',
            field: 'name',
            value: 'Name must be between 7 and 14 characters'
        })
    } else {
        dispatch({
            type: 'setError',
            field: 'name',
            value: ''
        })
    }
}

const firstnameValid = () => {
    if (state.firstname.length <= 4 || state.firstname.length >= 15) {
        dispatch({
            type: 'setError',
            field: 'firstname',
            value: 'First name must be between 5 and 9 characters'
        })
    } else {
        dispatch({
            type: 'setError',
            field: 'firstname',
            value: ''
        })
    }
}

const lastnameValid = () => {
    if (state.lastname.length <= 4 || state.lastname.length >= 10) {
        dispatch({
            type: 'setError',
            field: 'lastname',
            value: 'Last name must be between 5 and 9 characters'
        })
    } else {
        dispatch({
            type: 'setError',
            field: 'lastname',
            value: ''
        })
    }
}

const validateAge = () => {
  const age = parseInt(state.age, 10)
  if (isNaN(age) || age < 18 || age > 60) {
      dispatch({
          type: 'setError',
          field: 'age',
          value: 'Age must be a number between 18 and 60'
      })
  } else {
      dispatch({
          type: 'setError',
          field: 'age',
          value: ''
      })
  }
}

const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(state.email)) {
        dispatch({
            type: 'setError',
            field: 'email',
            value: 'Email must be valid'
        })
    } else {
        dispatch({
            type: 'setError',
            field: 'email',
            value: ''
        })
    }
}

const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    if (!pattern.test(state.password)) {
        dispatch({
            type: 'setError',
            field: 'password',
            value: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character'
        })
    } else {
        dispatch({
            type: 'setError',
            field: 'password',
            value: ''
        })
    }
}


useEffect(() => {
const res=JSON.parse(localStorage.getItem('arraysave'));
if (res) {
    dispatch({
        type:'localdata',
        value:res
    })
}
}, [ ]);


  return (
    <MyContext.Provider value={{initialState,reducer,
      state, dispatch,change,submitArray,handleEdit,handleDelete,
      nameValid,firstnameValid,lastnameValid,validateAge,validateEmail,validatePassword
    }}>{children}</MyContext.Provider>
  )
}

export default Provider