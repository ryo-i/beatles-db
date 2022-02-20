import React, { useState, useEffect, useContext }  from 'react';
import { Context } from '../pages/track/[number]';
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
      width: 30%;
      padding-right: 1em;
    }
    dd {
      width: 70%;
    }
  }
`;


// Component
function InnerTrack() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const {trackNumber, setTrackNumber} = useContext(Context);
  const {trackName, setTrackName} = useContext(Context);
  const [trackData, setTrackData] = useState<{[key: string]: string}>({});

  //  Get Tracks Data
  useEffect(() => {
    const url: string = '../api/beatles/' + trackNumber;

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
    }
  }, [trackNumber]);


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
            <dt>作者</dt>
            <dd>{trackData.songwriter}</dd>
            <dt>リードボーカル</dt>
            <dd>{trackData.vocal}</dd>
            <dt>演奏</dt>
            <dd>
              <ul>
                <li>John Lennon: {trackData.john}</li>
                <li>Paul McCartney: {trackData.paul}</li>
                <li>George Harrison: {trackData.george}</li>
                <li>Ringo Starr: {trackData.ringo}</li>
                <li>others: {trackData.others}</li>
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
            <dt>備考</dt>
            <dd>{trackData.remarks}</dd>
          </dl>
        </>
      );
    }
  };


  // JSX
  return (
    <>
      {
        <Section>
          <h2>{trackName}</h2>
          <TrackInfo />
        </Section>
      }
    </>
  );
}

export default InnerTrack;
