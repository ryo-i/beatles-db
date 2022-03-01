import React, { useEffect, useState, createContext }  from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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


// Style
const Nav = styled.nav`
  ul {
    padding: 0;
    display: flex;
    list-style: none;
    font-size: 12px;
    li {
        margin-right: 0.5em;
        :not(:last-child)::after {
            content: " >"
        }
    }
  }
`;


// Component
const Track = ({ trackInfo }) => {
    const [trackNumber, setTrackNumber] = useState('');
    const [trackName, setTrackName] = useState('楽曲情報');

    const router = useRouter();
    const thisQuery = router.query.number;

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
    const headTitle = pageTitle + ' | ' + headerTitle;

    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageTitle } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageTitle } />
        </Head>

        <Header />
        <main>
            <h1>楽曲情報</h1>
            <Nav>
                <ul>
                    <li><a href="/">ホーム</a></li>
                    <li>楽曲情報</li>
                    <li>{pageTitle}</li>
                </ul>
            </Nav>
            <p>{ trackInfo }</p>
            <Context.Provider value={{trackNumber, setTrackNumber, trackName, setTrackName}} >
                <InnerTrack />
            </Context.Provider>
        </main>
        <Footer />
        </>
    );
}

export default Track;


/*
// この関数はビルド時に呼ばれる
export async function getStaticPaths() {
    // 記事を取得する外部APIのエンドポイントをコール
    const res = await fetch('https://beatles-db.vercel.app/api/beatles');
    const track = await res.json();

    // 記事にもとづいてプリレンダするパスを取得
    const paths = track.trackList.map(post => `/track/${post}`);

    // 設定したパスのみ、ビルド時にプリレンダ
    // { fallback: false } は、他のルートが404になるという意味
    return { paths, fallback: false };
}

// この関数もビルド時に呼ばれる
export async function getStaticProps({ params }) {
    // `params`は`id`の記事内容を含む
    // ルートが/posts/1とすると、params.idは1となる
    const res = await fetch(`/track/${params}`);
    const trackInfo = await res.json();

    console.log('trackInfo', trackInfo);

    // propsを通じてpostをページに渡す
    return { props: { trackInfo } };
}
*/