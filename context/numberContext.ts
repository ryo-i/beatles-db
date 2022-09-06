import React, { createContext }  from 'react';

export const numberContext = createContext({} as {
    trackNumber: string;
    setTrackNumber: React.Dispatch<React.SetStateAction<string>>;
    trackName: string;
    setTrackName: React.Dispatch<React.SetStateAction<string>>;
});