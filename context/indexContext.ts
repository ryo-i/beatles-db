import React, { createContext }  from 'react';

export const indexContext = createContext({} as {
    queryInfo: string
    setQueryInfo: React.Dispatch<React.SetStateAction<string>>
    hierarchy: string
    setHierarchy: React.Dispatch<React.SetStateAction<string>>
});