import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { Context } from '../pages/index';
import Link from 'next/link';
import CategoryNav from './CategoryNav';
import Section from './Section';
import { getPagination } from '../modules/trackList/getPagination';
import { getTopTrack } from '../modules/trackList/getTopTrack';
import { getQueryParam } from '../modules/trackList/getQueryParam';


// Component
function InnerIndex() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [tracksData, setTracksData] = useState([]);
  const {categoryName, setCategoryName} = useContext(Context);
  const [queryText, setQeuryText] = useState('');


  // Get Query Param
  const router = useRouter();
  const queryParam = router.query;


  useEffect(() => {
    const getQueryText = getQueryParam(queryParam);
    setQeuryText(getQueryText);
    console.log('queryText', queryText);
  }, [queryParam]);


  useEffect(() => {
    // fetch
    const url = 'api/beatles' + queryText;
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

    if (router.isReady && queryText !== null) {
      getTracksData(url);
    }
  }, [queryText]);


  // Pagination
  const Pagination = () => {
    const pagination = getPagination(pageInfo);

    return (
      <ul className="pagination">
        {pagination.map((data, index) =>
          <li key={index}><Link href={'/?page=' + data.pageNum}><a className={data.thisPage}>{data.pageNum}</a></Link></li>
        )}
      </ul>
    );
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
              <li key={index} className={getTopTrack(data.order, index, tracksData)} data-order={data.order}>
                <figure>
                  <p className="icon">
                    <Link href={"category/" + data.path}>
                      <a>{data.icon}</a>
                    </Link>
                  </p>
                </figure>
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
