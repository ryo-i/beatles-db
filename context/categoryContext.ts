import React, { createContext }  from 'react';

export const categoryContext = createContext({} as {
    isCategory: boolean;
    setIsCategory: React.Dispatch<React.SetStateAction<boolean>>;
    categoryName: string;
    setCategoryName: React.Dispatch<React.SetStateAction<string>>;
    categoryPath: string;
    setCategoryPath: React.Dispatch<React.SetStateAction<string>>;
});