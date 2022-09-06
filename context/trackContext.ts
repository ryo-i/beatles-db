import React, { createContext }  from 'react';

export const trackContext = createContext({} as {
    trackData: {[key: string]: string};
    setTrackData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
});