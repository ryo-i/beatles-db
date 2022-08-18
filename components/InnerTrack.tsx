import React, { useState, useEffect, useContext }  from 'react';
import { Context } from '../pages/track/[number]';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './style/Nav';


// CSS in JS
const Section = styled.section`
  h2 {
    margin-bottom: 1.5em;
    color: #333;
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    padding: 1em 0;
    border-bottom : 1px solid #ccc;
    @media(max-width: 600px) {
      display: block;
    }
    dt, dd {
      padding: 0.5em 0;
      margin: 0;
    }
    dt {
      width: 20%;
      padding-right: 1em;
      @media(max-width: 600px) {
        width: 100%;
        padding: 0;
      }
      ::after {
        content: "："
      }
    }
    dd {
      width: 80%;
      @media(max-width: 600px) {
        width: 100%;
        padding: 0 0 15px;
      }
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
        const data = resJson;
        console.log('data', data);
        // console.log('data.track', data.track);
        setTrackData(data);
        setTrackName(data.track);
        setIsLoaded(true);
      } catch(error) {
        setError(error);
        console.log('err', error);
        setIsLoaded(true);
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
        const data = resJson;
        const allTracksLength = data.trackInfo.allTrackLength;
        console.log('data', data);
        setAllTracksLength(allTracksLength);
        setIsLoaded(true);
      } catch(error) {
        console.log('err', error);
      }
    };

    getAllTracksLength(url);
  }, []);


  // Breadcrumb
  const Breadcrumb = () => {
    return (
      <ul className="breadcrumb">
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href={"/category/" + trackData.path}><a>{trackData.category}</a></Link></li>
        <li>{trackName}</li>
      </ul>
    );
  };


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


  // PeapleArray
  function PeapleArray (props) {
    const delimiter = ' / ';
    const isMultiple = props.name.indexOf(delimiter) !== -1;

      if (!props.name) {
        return (
          <p>読み込み中...</p>
        );
      } else if (isMultiple) {
      let peopleArray = props.name.split(delimiter);
      return (
        <ul>
          {peopleArray.map((data, index) =>
            <li key={index}>
              <Link href={"../?" + props.paramKey + "=" + data}>
                <a>{data}</a>
              </Link>
            </li>
          )}
        </ul>
      );
    } else {
      return (
        <p>
          <Link href={"../?" + props.paramKey + "=" + props.name}>
            <a>{props.name}</a>
          </Link>
        </p>
      );
    }
  }


  // Track Info
  const TrackInfo = () => {
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      const isCover = trackData.artist !== trackData.original;
      return (
        <>
          <dl>
            <dt>アーティスト</dt>
            <dd>
              <Link href={"../?artist=" + trackData.artist}>
                <a>{trackData.artist}</a>
              </Link>
            </dd>
            {isCover && <>
              <dt>オリジナル</dt>
              <dd>
                <PeapleArray name={trackData.original} paramKey={'original'} />
              </dd>
            </>}
          </dl>
          <dl>
            <dt>作者</dt>
            <dd>
              <PeapleArray name={trackData.songwriter} paramKey={'songwriter'} />
            </dd>
            <dt>リードボーカル</dt>
            <dd>
              <PeapleArray name={trackData.vocal} paramKey={'vocal'} />
            </dd>
            <dt>演奏</dt>
            <dd>
              <ul>
                <li>John Lennon : {trackData.john}</li>
                <li>Paul McCartney : {trackData.paul}</li>
                <li>George Harrison : {trackData.george}</li>
                <li>Ringo Starr : {trackData.ringo}</li>
                <li>{trackData.musician}</li>
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
            <dd>{trackData.mv}</dd>
          </dl>
          <dl>
            <dt>収録作品</dt>
            <dd>
              <Link href={"../?order=" + trackData.order + "&title=" + trackData.title}>
                <a>{trackData.title}</a>
              </Link>
              （<Link href={"../?format=" + trackData.format}>
                <a>{trackData.format}</a>
              </Link>）
            </dd>
            <dt>発売日</dt>
            <dd>
              {trackData.date}
              （<Link href={"../?year=" + trackData.year}>
                <a>{trackData.year}年</a>
              </Link>）
            </dd>
            <dt>レーベル</dt>
            <dd>{trackData.label}（{trackData.country}）</dd>
            <dt>曲順</dt>
            <dd>
              Disc {trackData.disc}, Side {trackData.side}, No. {trackData.number}
            </dd>
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
        <Breadcrumb />
      </Nav>
      <Section>
        <h2>{trackName}</h2>
        <TrackInfo />
      </Section>
    </>
  );
}

export default InnerTrack;
