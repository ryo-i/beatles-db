import React, { useEffect, useState, createContext }  from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import InnerTrack from '../../components/InnerTrack';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


export const Context = createContext({} as {
    trackNumber: string
    setTrackNumber: React.Dispatch<React.SetStateAction<string>>
    trackName: string
    setTrackName: React.Dispatch<React.SetStateAction<string>>
});


// Component
const Track = () => {
    const [trackNumber, setTrackNumber] = useState('');
    const [trackName, setTrackName] = useState('');

    const router = useRouter();
    const thisQuery = router.query.no;

    useEffect(() => {
        if (thisQuery) {
            const thisNumber: string = String(thisQuery);
            console.log('thisQuery', thisQuery);
            console.log('thisNumber', thisNumber);
            setTrackNumber(thisNumber);
        }
    }, [thisQuery]);


    const headerTitle = Data.header.title;
    const pageTitle = trackName;
    const pageText = trackName + 'の詳細情報';
    const headTitle = pageTitle + ' | ' + headerTitle;

    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageText } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageText } />
        </Head>

        <Header />
        <main>
            <h1>{ pageTitle }</h1>
            <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
            <Context.Provider value={{trackNumber, setTrackNumber, trackName, setTrackName}} >
                <InnerTrack />
            </Context.Provider>
        </main>
        <Footer />
        </>
    );
}

export default Track;