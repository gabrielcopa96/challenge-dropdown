// import { createContext, useState } from "react";

// export const DropdownContext = createContext( {} );

// export const DataProvider = ({ children }) => {

//     const [ datos, setDatos ] = useState( [] );

//     return (
//         <DropdownContext.Provider value={ {
//             misDatos: [],
//             type: "",
//             open: false,
//             handleClickDrop: () => {},
//             handleSelectProp: () => {}
//         } }>
//             { children }
//         </DropdownContext.Provider>

// }

// const handleClickDrop = () => {

//     const { value, selectionEnd = 0 } = inputRef.current;
//     const { word } = getActive(value, selectionEnd);

//     const shouldOpenDropDown = /^[a-zA-Z]{1,254}$/.test(word);

//     setOpen(shouldOpenDropDown);

//     // 
// }