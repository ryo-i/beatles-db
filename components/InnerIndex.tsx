import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { Context } from '../pages/index';
import styled from 'styled-components';


// CSS in JS
const Section = styled.section`
  h2 {
    color: #333;
  }
  .trackList {
    padding: 10px 0;
    li {
      display: flex;
      align-items: center;
      border-top: #eee 2px solid;
      padding: 20px 0;
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
          text-decoration: none;
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
          }
          .song {
            font-size: 18px;
            line-height: 1.25;
            flex: 1;
            text-decoration: underline;
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
          .year, .format {
            background: #888;
            color: #fff;
            margin: 0 5px 0 0;
            padding : 3px;
            font-size: 10px;
            border-radius: 3px;
          }
        }
      }
    }
    li:last-child {
      border-bottom: 2px solid #ccc;
    }
    .trackTop {
      border-top: 2px solid #ccc;
    }
  }
  .pageInfo {
    font-size: 12px;
  }
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      border: none;
      margin: 0 10px 0 0;
      padding: 0;
      a {
        display: block;
        color: #333;
        text-decoration: none;
        background: #eee;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
      }
      .currentPage {
        color: #fff;
        background: #A63744;
      }
    }
  }
`;


// Component
function InnerIndex() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [tracksData, setTracksData] = useState([]);
  const {search, setSearch} = useContext(Context);
  const [pageParam, setPageParam] = useState(null);

  useEffect(() => {
    setSearch('すべて');
  }, []);

  // Get Query Param
  const router = useRouter();
  const pageQuery = router.query.page;

  useEffect(() => {
    // Set Query Param
    console.log('pageQuery', pageQuery);
    if (!router.isReady) {
      console.log('not isReady');
      return;
    } else if (pageQuery) {
      const thisNumber: string = String(pageQuery);
      console.log('thisNumber', thisNumber);
      setPageParam('?page=' + thisNumber);
    } else {
      setPageParam('');
    }


    // fetch
    const url = 'api/beatles' + pageParam;
    async function getTracksData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        const data = resJson;
        console.log('data', data);
        setTracksData(data.trackList);
        setPageInfo(data.pageInfo);
      } catch(error) {
        setIsLoaded(true);
        setError(error);
        console.log('err', error);
      }
    };

    if (router.isReady && pageParam !== null) {
      getTracksData(url);
    }
  }, [pageParam, router]);


  // Pagination
  const Pagination = () => {
  let pagination = [];
  for (let i = 1; i < pageInfo['pageLength']; i++) {
    const checkCurrent = () => {
      if (i === pageInfo['thisPage']) {
        return 'currentPage';
      } else {
        return '';
      }
    };
    const thisPage = checkCurrent();
    pagination.push(<li><a href={"/?page=" + i} className={thisPage}>{i}</a></li>);
  }

  if (error) {
    return <p>エラー: {error.message}</p>;
  } else if (!isLoaded) {
    return <p>読み込み中...</p>;
  } else {
    return (
      <>
        <ul className="pagination">
          {pagination}
        </ul>
      </>
    );
  }
   };


  // Track List
  const TrackList = () => {
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      return (
        <>
          <ul className="trackList">
            {tracksData.map((data, index) =>
              <li key={index} className={data.number === '1' ? 'trackTop' : ''}>
                <figure><p className="icon">{data.icon}</p></figure>
                <dl>
                  <dt>
                    <a href={"track/" + data.id}>
                      <p className="num">{data.number}</p>
                      <p className="song">{data.track}</p>
                    </a>
                  </dt>
                  <dd>
                    <p className="title-area"><span className="year">{data.year}</span><span className="format">{data.format}</span><span className="title">{data.title}</span></p>
                    <p className="artist">{data.artist}</p>
                  </dd>
                </dl>
              </li>
            )}
          </ul>
        </>
      );
    }
  };


  // JSX
  return (
    <>
      {
        <Section>
          <h2>「{search}」の楽曲一覧</h2>
          <p className="pageInfo">{pageInfo['trackLength']}件（{pageInfo['thisPage']}ページ / {pageInfo['pageLength']}ページ）</p>
          <Pagination />
          <TrackList />
          <Pagination />
        </Section>
      }
    </>
  );
}

export default InnerIndex;
