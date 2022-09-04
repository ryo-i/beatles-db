import React, { createContext }  from 'react';

export const indexContext = createContext({} as {
    queryInfo: string
    setQueryInfo: React.Dispatch<React.SetStateAction<string>>
    hierarchy: string
    setHierarchy: React.Dispatch<React.SetStateAction<string>>
    yearList: string[]
    setYearList: React.Dispatch<React.SetStateAction<string[]>>
    formatList: string[]
    setFormatList: React.Dispatch<React.SetStateAction<string[]>>
    currentYear: string
    setCurrentYear: React.Dispatch<React.SetStateAction<string>>
    currentFormat: string
    setCurrentFormat: React.Dispatch<React.SetStateAction<string>>
});