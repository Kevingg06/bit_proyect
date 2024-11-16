import React, { createContext, useContext, useState } from 'react';

// Crear contexto
const PosteosContext = createContext();

// Proveedor del contexto
export const PosteosProvider = ({ children }) => {
    const [posteos, setPosteos] = useState([]);
  
    const agregarPosteo = (nuevoPosteo) => {
      setPosteos((prevPosteos) => [...prevPosteos, nuevoPosteo]);
    };
  
    return (
      <PosteosContext.Provider value={{ posteos, agregarPosteo }}>
        {children}
      </PosteosContext.Provider>
    );
  };
  
  export const usePosteos = () => useContext(PosteosContext);
  