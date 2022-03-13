import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { Context } from '../pages/index';
import Link from 'next/link';
import styled from 'styled-components';
import CategoryNav from './CategoryNav';


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
    li:first-child, .topTrack {
      border-top: 2px solid #999;
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
  const {categoryName, setCategoryName} = useContext(Context);
  const [pageParam, setPageParam] = useState(null);


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
    for (let i = 0; i < pageInfo['pageLength']; i++) {
      const pageNum = i +1;
      const checkCurrent = () => {
        if (pageNum === pageInfo['thisPage']) {
          return 'currentPage';
        } else {
          return '';
        }
      };
      const thisPage = checkCurrent();
      pagination.push({
        pageNum: pageNum,
        thisPage: thisPage
      });
    }

    return (
      <ul className="pagination">
        {pagination.map((data, index) =>
          <li key={index}><Link href={'/?page=' + data.pageNum}><a className={data.thisPage}>{data.pageNum}</a></Link></li>
        )}
      </ul>
    );
  };


  // Get Top Track
  const getTopTrack = (thisOrder, index) => {
    const beforeIndex =  index - 1;
    const beforeOrder = beforeIndex >= 0 ? tracksData[index - 1].order : null;
    // console.log('beforeOrder', beforeIndex, beforeOrder);
    // console.log('thisOrder', index, thisOrder);
    if (thisOrder !== beforeOrder) {
      return 'topTrack';
    } else {
      return '';
    }
  }


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
              <li key={index} className={getTopTrack(data.order, index)} data-order={data.order}>
                <figure><p className="icon">{data.icon}</p></figure>
                <dl>
                  <dt>
                    <Link href={"track/" + data.id}>
                      <a>
                        <p className="num">{data.number}</p>
                        <p className="song">{data.track}</p>
                      </a>
                    </Link>
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
      <CategoryNav />
      <Section>
        <h2>「{categoryName}」の楽曲一覧</h2>
        <p className="pageInfo">全{pageInfo['trackLength']}件 - {pageInfo['thisPage']}ページ目（{pageInfo['pageLength']}ページ中）</p>
        <Pagination />
        <TrackList />
        <Pagination />
      </Section>
    </>
  );
}

export default InnerIndex;
