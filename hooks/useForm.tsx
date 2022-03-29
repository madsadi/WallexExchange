import {useState} from "react";

export default function useForm(initial:{mobile:string,password:string,word:string} = {mobile:'',password:'',word:''}) {
    //creat a state object for our inputs
    const [inputs,setInputs] = useState(initial)

    function handleChange(e:any) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }
    function reset(e:any) {
        setInputs({
            ...inputs,
            [e.target.name]: initial
        });
    }

    return {
        inputs,
        handleChange,
        reset
    }
}
