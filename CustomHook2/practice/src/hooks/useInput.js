import { useState, useCallback } from "react";

function useInput(initalState){
    const [data, setValue] = useState(initalState);
    const handleChange = useCallback( (e) => {
        // input에서 name값과 value값 불러옴
        const { name, value } = e.target; 
          
        //input이 여러개일때 ...data로 상태관리
        setValue({ ...data, [name]: value }); 
    },[data]);

    return [data, handleChange];
};

// function useInput(initalState){
//     const [value, setValue] = useState(initalState);
//     const handleChange = (e) => {
//         setValue(e.target.value); 
//     };

//     return {
//         value,
//         onChange: handleChange
//     };
// };

export default useInput;