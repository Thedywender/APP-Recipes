import React, { useState } from 'react';
import recipeContext from './recipeContext';

type ContextProviderProps = {
  children: React.ReactNode,
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [searchInput, setSearchInput] = useState<string>('');

  const value = {
    searchInput,
    setSearchInput,
  };

  return (
    <recipeContext.Provider value={ value }>
      {children}
    </recipeContext.Provider>
  );
}
