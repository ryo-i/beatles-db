import React, { useState, useEffect, useContext }  from 'react';
import { Context } from '../pages/track/[number]';
import Link from 'next/link';
import styled from 'styled-components';


// CSS in JS
const Section = styled.section`
  h2 {
    margin-bottom: 1.5em;
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0;
    border-bottom : 1px solid #ccc;
    dt, dd {
      padding: 0.5em 0;
      margin: 0;
    }
    dt {
      width: 20%;
      padding-right: 1em;
      ::after {
        content: "："
      }
    }
    dd {
      width: 80%;
    }
  }
  .prevNextNav ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 20px 0 0;
    padding: 15px;
    background: #eee;
    border-radius: 5px;
    .non {
      color: #aaa;
    }
  }
`;

const Nav = styled.nav`
  ul {
    padding: 0;
    display: flex;
    list-style: none;
    font-size: 12px;
    li {
      line-height: 1.5;
      :not(:last-child) {
        margin-right: 1.5em;
        position: relative;
        ::after {
          content: ">";
          position: absolute;
          top: 0;
          right: -1em;
        }
      }
    }
  }
`;

// Component
function InnerTrack() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const {trackNumber, setTrackNumber} = useContext(Context);
  const [prevNumber, setPrevNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const {trackName, setTrackName} = useContext(Context);
  const [trackData, setTrackData] = useState<{[key: string]: string}>({});
  const [allTracksLength, setAllTracksLength] = useState(0);


  //  Get Tracks Data
  useEffect(() => {
    const url: string = '../api/beatles/track/' + trackNumber;

    async function getTracksData (url: string) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        const data = resJson;
        // console.log('data', data);
        // console.log('data.track', data.track);
        setTrackData(data);
        setTrackName(data.track);
      } catch(error) {
        setIsLoaded(true);
        setError(error);
        console.log('err', error);
      }
    };

    if (trackNumber) {
      console.log('trackNumber', trackNumber);
      getTracksData(url);
      setNextNumber(Number(trackNumber) + 1);
      setPrevNumber(Number(trackNumber) - 1);
    }
  }, [trackNumber]);


  // Get All Tracks Length
  useEffect(() => {
    const url: string = '../api/beatles/tracklength';

    async function getAllTracksLength (url: string) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        const data = resJson;
        const allTracksLength = data.trackInfo.allTrackLength;
        console.log('data', data);
        console.log('allTracksLength', allTracksLength);
        setAllTracksLength(allTracksLength);
      } catch(error) {
        console.log('err', error);
      }
    };

    getAllTracksLength(url);
  }, []);


  // PrevNextNav
  function PrevNextNav() {
    if (Number(trackNumber) <= 1) {
      return (
        <ul>
          <li className="non">◀︎ 前の曲</li>
          <li><Link href="/track/[nextNumber]" as={`/track/${nextNumber}`}><a>次の曲</a></Link> ▶︎</li>
        </ul>
      );
    } else if (Number(trackNumber) >= allTracksLength) {
      return (
        <ul>
          <li>◀︎ <Link href="/track/[prevNumber]" as={`/track/${prevNumber}`}><a>前の曲</a></Link></li>
          <li className="non">次の曲 ▶︎</li>
        </ul>
      );
    }

    return (
      <ul>
        <li>◀︎ <Link href="/track/[prevNumber]" as={`/track/${prevNumber}`}><a>前の曲</a></Link></li>
        <li><Link href="/track/[nextNumber]" as={`/track/${nextNumber}`}><a>次の曲</a></Link> ▶︎</li>
      </ul>
    );
  }


  // Track Info
  const TrackInfo = () => {
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      return (
        <>
          <dl>
            <dt>アーティスト名</dt>
            <dd>{trackData.artist}</dd>
            <dt>カテゴリ</dt>
            <dd>{trackData.category}</dd>
            <dt>オリジナル</dt>
            <dd>{trackData.original}</dd>
          </dl>
          <dl>
            <dt>作者</dt>
            <dd>{trackData.songwriter}</dd>
            <dt>リードボーカル</dt>
            <dd>{trackData.vocal}</dd>
            <dt>演奏</dt>
            <dd>
              <ul>
                <li>John Lennon : {trackData.john}</li>
                <li>Paul McCartney : {trackData.paul}</li>
                <li>George Harrison : {trackData.george}</li>
                <li>Ringo Starr : {trackData.ringo}</li>
                <li>{trackData.others}</li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>プロデューサー</dt>
            <dd>{trackData.producer}</dd>
            <dt>エンジニア</dt>
            <dd>{trackData.engineer}</dd>
            <dt>アートワーク</dt>
            <dd>{trackData.artwork}</dd>
            <dt>ディレクター（映画）</dt>
            <dd>{trackData.film}</dd>
            <dt>ディレクター（MV）</dt>
            <dd>{trackData.musicvideo}</dd>
          </dl>
          <dl>
            <dt>収録作品</dt>
            <dd>{trackData.title}</dd>
            <dt>発売年</dt>
            <dd>{trackData.year}</dd>
            <dt>発売日</dt>
            <dd>{trackData.date}</dd>
            <dt>販売国</dt>
            <dd>{trackData.country}</dd>
            <dt>レーベル</dt>
            <dd>{trackData.label}</dd>
            <dt>形態</dt>
            <dd>{trackData.format}</dd>
            <dt>枚数</dt>
            <dd>{trackData.disc}</dd>
            <dt>面</dt>
            <dd>{trackData.side}</dd>
            <dt>曲順</dt>
            <dd>{trackData.number}</dd>
          </dl>
          <dl>
            <dt>備考</dt>
            <dd>{trackData.remarks}</dd>
          </dl>
          <nav className="prevNextNav">
              <PrevNextNav />
          </nav>
        </>
      );
    }
  };


  // JSX
  return (
    <>
        <Nav>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href={"/category/" + trackData.path}><a>{trackData.category}</a></Link></li>
            <li>{trackName}</li>
          </ul>
        </Nav>
        <Section>
          <h2>曲名：{trackName}</h2>
          <TrackInfo />
        </Section>
    </>
  );
}

export default InnerTrack;
