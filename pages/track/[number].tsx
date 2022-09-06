import React, { useState }  from 'react';
import { numberContext } from '../../context/numberContext';
import Head from 'next/head';
import Header from '../../components/Header';
import InnerTrack from '../../components/InnerTrack';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


// Component
const Track = ({ trackInfo }) => {
    const [trackNumber, setTrackNumber] = useState(trackInfo.id);
    const [trackName, setTrackName] = useState(trackInfo.track);

    const headerTitle = Data.header.title;
    const pageTitle = trackName;
    const headTitle = pageTitle + ' | ' + headerTitle;
    const pageText = trackInfo.artist + 'の楽曲「' + trackName + '」の詳細情報です。';

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
            <h1>楽曲情報</h1>
            <numberContext.Provider value={{trackNumber, setTrackNumber, trackName, setTrackName}} >
                <InnerTrack />
            </numberContext.Provider>
        </main>
        <Footer />
        </>
    );
}


// Get Path
export async function getStaticPaths() {
    const res = await fetch(`https://beatles-db.vercel.app/api/beatles/tracklist`);
    const track = await res.json();
    const paths = track.trackList.map((track) => `/track/${track.id}`);
    // console.log('track', track);
    // console.log('paths', paths);
    return { paths, fallback: false };
}


// Get TrackInfo
export async function getStaticProps({ params }) {
    const number = params.number;
    const res = await fetch(`https://beatles-db.vercel.app/api/beatles/track/${number}`);
    const trackInfo = await res.json();
    // console.log('number', number);
    // console.log('trackInfo', trackInfo);
    return { props: { trackInfo } };
}

export default Track;