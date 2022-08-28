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
      .peapleList {
        margin: 0 0 5px;
        .peaples {
          margin: 0;
          padding: 0;
          li {
            display: inline;
            :not(:last-child)::after {
              content: ", "
            }
          }
        }
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
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      return (
        <ul className="breadcrumb">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href={"/category/" + trackData.path}><a>{trackData.category}</a></Link></li>
          <li>{trackName}</li>
        </ul>
      );
    }
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
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (props.name === '-' || props.name === '') {
      return null;
    } else if (!props.name) {
      return (
        <p>読み込み中...</p>
      );
    }

    const delimiterSlash = ' / ';
    const delimiterColon = ' : ';
    const delimiterComma = ', ';
    const isMultipleColon = props.name.indexOf(delimiterColon) !== -1;

    const peapleSplit = (resultArray) => {
      let peapleSplitArray = resultArray[0].split(delimiterComma);
      console.log('peapleSplitArray', peapleSplitArray);
      resultArray[0] = peapleSplitArray;
      return resultArray;
    };

    let peopleArray = props.name.split(delimiterSlash).map((item) => {
      if (isMultipleColon) {
        let resultArray = item.split(delimiterColon);
        const isMultipleComma = resultArray[0].indexOf(delimiterComma) !== -1;
        if (isMultipleComma) {
          peapleSplit(resultArray);
        }
        return resultArray;
      } else {
        return item;
      }
    });

    return (
      <>
        {peopleArray.map((data, index) =>
          <li key={index} className="peapleList">
            {
              isMultipleColon && Array.isArray(data[0]) ? <>
                <ul className="peaples">
                  {data[0].map((data, index) => <>
                    <li key={index}>
                      <Link href={"../?" + props.paramKey + "=" + data}>
                        <a>{data}</a>
                      </Link>
                    </li>
                  </>)}{": " + data[1]}
                </ul>
              </> :
              isMultipleColon ? <>
                <Link href={"../?" + props.paramKey + "=" + data[0]}>
                  <a>{data[0]}</a>
                </Link>{": " + data[1]}
              </> : <>
                <Link href={"../?" + props.paramKey + "=" + data}>
                  <a>{data}</a>
                </Link>
              </>
            }
          </li>
        )}
      </>
    );
  }


  // Playing
  function Playing (props) {
    return (
      props.part !== '-' && <>
        <li className="peapleList">
          <Link href={"../?playing=" + props.paramKey}>
            <a>{props.paramKey}</a>
          </Link> : {props.part}
        </li>
      </>
    );
  }


  // Remarks
  function Remarks (props) {
    if (error) {
      return <p>エラー: {error.text}</p>;
    } else if (props.text === '-' || props.text === '') {
      return null;
    } else if (!props.text) {
      return (
        <p>読み込み中...</p>
      );
    }

    let remarksArray = [];
    const delimiterSlash = ' / ';
    const isMultipleSlash = props.text.indexOf(delimiterSlash) !== -1;

    if (isMultipleSlash) {
      remarksArray = props.text.split(delimiterSlash).map((item) => {
      return item;
      });
    } else {
      return props.text;
    }

    return (
      <ul>
        {remarksArray.map((data, index) =>
          <li key={index}>{data}</li>
        )}
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
      const isCover = trackData.artist !== trackData.original;
      return (
        <>
          <dl>
            <dt>アーティスト</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.artist} paramKey={'artist'} />
              </ul>
            </dd>
            {isCover && <>
              <dt>オリジナル</dt>
              <dd>
                <ul>
                  <PeapleArray name={trackData.original} paramKey={'original'} />
                </ul>
              </dd>
            </>}
          </dl>
          <dl>
            <dt>作者</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.songwriter} paramKey={'songwriter'} />
              </ul>
            </dd>
            <dt>リードボーカル</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.vocal} paramKey={'vocal'} />
              </ul>
            </dd>
            <dt>演奏</dt>
            <dd>
              <ul>
                <Playing part={trackData.john} paramKey={'John Lennon'} />
                <Playing part={trackData.paul} paramKey={'Paul McCartney'} />
                <Playing part={trackData.george} paramKey={'George Harrison'} />
                <Playing part={trackData.ringo} paramKey={'Ringo Starr'} />
                <PeapleArray name={trackData.musician} paramKey={'musician'} />
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>プロデューサー</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.producer} paramKey={'producer'} />
              </ul>
            </dd>
            <dt>エンジニア</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.engineer} paramKey={'engineer'} />
              </ul>
            </dd>
            <dt>アートワーク</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.artwork} paramKey={'artwork'} />
              </ul>
            </dd>
            <dt>ディレクター（映画）</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.film} paramKey={'film'} />
              </ul>
            </dd>
            <dt>ディレクター（MV）</dt>
            <dd>
              <ul>
                <PeapleArray name={trackData.mv} paramKey={'mv'} />
              </ul>
            </dd>
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
              <Link href={"../?date=" + trackData.date}>
                <a>{trackData.date}</a>
              </Link>
              （<Link href={"../?year=" + trackData.year}>
                <a>{trackData.year}年</a>
              </Link>）
            </dd>
            <dt>レーベル</dt>
            <dd>
              <Link href={"../?label=" + trackData.label}>
                <a>{trackData.label}</a>
              </Link>
              （<Link href={"../?country=" + trackData.country}>
                <a>{trackData.country}</a>
              </Link>）
            </dd>
            <dt>曲順</dt>
            <dd>
              Disc {trackData.disc}, Side {trackData.side}, No. {trackData.number}
            </dd>
          </dl>
          <dl>
            <dt>備考</dt>
            <dd><Remarks text={trackData.remarks} /></dd>
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
