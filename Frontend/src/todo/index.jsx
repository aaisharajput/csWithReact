import { useState } from "react";
import Input from '../component/input/index';
import Button from '../component/button/index';
// let name='';

export default function Todo(){
    const [todos,setTodos]=useState([]);
    const [value,setValue]=useState("");

    function addTodo(){
        setTodos([...todos,value]);
        setValue("");
    }

    function onInputChange(event){
        setValue(event.target.value);
    }

    function deleteTodo(index){
        return function(){
            setTodos(todos.filter(function(item,i){
                return i!==index;
            }));
        }
    }
console.log('first');
return(
    <>
    <Input placeholder='name' value={value} onChange={onInputChange}/>
    {/* <Input /> */}
    {/* <input value={value} onChange={onInputChange} placeholder="Enter text" /> */}
    <button onClick={addTodo}>Save</button>
    <Button>Click</Button>

    <ul>
        {
        todos.map(function(item,index){
            return <li onDoubleClick={deleteTodo(index)} key={index}>{item}</li>
            })
        }
    </ul>
    <p id='a'>hello world {value}</p>
    </>
);
}