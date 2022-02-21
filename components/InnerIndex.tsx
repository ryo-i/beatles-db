import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { Context } from '../pages/index';
import styled from 'styled-components';


// CSS in JS
const Section = styled.section`
  h2 {
    color: #333;
  }
  ul {
    padding: 0;
    li {
      display: flex;
      align-items: center;
      border-bottom: #ccc 1px solid;
      padding: 14px 0;
      dd, figure, p {
        margin: 0;
        line-height: 1.5;
      }
      .icon {
        background: #A63744;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        margin: 0 16px 0 0;
      }
      dl {
        margin: 0;
        flex: 1;
        dt a {
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          .num {
            margin: 0 8px 0 0;
            font-size: 10px;
            background: #ddd;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 3px;
            color: #000;
            text-decoration: none;
          }
          .song {
            font-size: 18px;
            line-height: 1.25;
            flex: 1;
          }
        }
        dd {
          font-size: 12px;
          color: #333;
          .title-area {
            margin: 0 0 5px;
          }
          .title {
            font-weight: bold;
          }
          .format {
            background: #999;
            color: #fff;
            margin: 0 8px 0 0;
            padding : 3px;
            font-size: 10px;
            border-radius: 3px;
          }
        }
      }
    }
  }
`;


// Component
function InnerIndex() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tracksData, setTracksData] = useState([]);
  const {search, setSearch} = useContext(Context);
  const [pageParam, setPageParam] = useState('');

  useEffect(() => {
    setSearch('すべて');
  });


  // Get Query Param
  const router = useRouter();
  const getPageParam = (pageQuery) => {
    if (isNaN(pageQuery)) {
      setPageParam('');
      return;
    }
    setPageParam('?page=' + pageQuery);
  };


  useEffect(() => {
    const pageQuery = Number(router.query.page);
    console.log('pageQuery', pageQuery);
    getPageParam(pageQuery);
    console.log('pageParam', pageParam);
  });


  useEffect(() => {
    // const url = 'api/beatles' + pageParam; test
    const url = 'api/beatles';
    async function getTracksData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        const data = resJson;
        console.log('data', data);
        setTracksData(data);
      } catch(error) {
        setIsLoaded(true);
        setError(error);
        console.log('err', error);
      }
    };
    getTracksData(url);
  // }, [pageParam]); // test
  }, []);


  // Track List
  const TrackList = () => {
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      return (
        <ul>
            {tracksData.map((data, index) =>
              <li key={index}>
                <figure><p className="icon">{data.icon}</p></figure>
                <dl>
                  <dt>
                    <a href={"track/" + data.id}>
                      <p className="num">{data.number}</p>
                      <p className="song">{data.track}</p>
                    </a>
                  </dt>
                  <dd>
                    <p className="title-area"><span className="format">{data.format}</span><span className="title">{data.title}</span> ({data.year})</p>
                    <p className="artist">{data.artist}</p>
                  </dd>
                </dl>
              </li>
            )}
          </ul>
      );
    }
  };


  // JSX
  return (
    <>
      {
        <Section>
          <h2>「{search}」の楽曲一覧</h2>
          <TrackList />
        </Section>
      }
    </>
  );
}

export default InnerIndex;
