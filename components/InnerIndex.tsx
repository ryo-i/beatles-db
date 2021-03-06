import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { categoryContext } from '../context/categoryContext';
import Link from 'next/link';
import CategoryNav from './CategoryNav';
import Section from './Section';
import { getPagination } from '../modules/trackList/getPagination';
import { getPageKey } from '../modules/trackList/getPageKey';
import { getTopTrack } from '../modules/trackList/getTopTrack';
import { getQueryParam } from '../modules/trackList/getQueryParam';
import { getQueryInfo } from '../modules/trackList/getQueryInfo';
import { deleteParam } from '../modules/trackList/deleteParam';


// Component
function InnerIndex() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [tracksData, setTracksData] = useState([]);
  const {isCategory, setIsCategory} = useContext(categoryContext);
  const {categoryName, setCategoryName} = useContext(categoryContext);
  const {categoryPath, setCategoryPath} = useContext(categoryContext);
  const [queryInfo, setQueryInfo] = useState('');

  // Get Query Param
  const router = useRouter();
  const queryParam = router.query;
  const { category, page } = router.query;

  useEffect(() => {
    const thisQueryInfo = getQueryInfo(queryParam);
    setQueryInfo(thisQueryInfo);

    if (isCategory) {
      queryParam.category = category;
    }
    if (page) {
      queryParam.page = page;
    }
    console.log('queryParam', queryParam);
    const queryText = getQueryParam(queryParam);
    console.log('queryText', queryText);

    // fetch
    const url: string = isCategory ? '../api/beatles' + queryText : 'api/beatles' + queryText;
    console.log('url', url);
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
  }, [router]);


  // Pagination
  const paginationPath = isCategory ? '/category/' + categoryPath : '/';
  const Pagination = () => {
    const pagination = getPagination(pageInfo);
    const thisPageParam = deleteParam(queryParam);
    const queryText = getQueryParam(thisPageParam);
    const pageKey = getPageKey(queryText);

    return (
      <ul className="pagination">
        {pagination.map((data, index) =>
          <li key={index}>
            <Link href={paginationPath + queryText + pageKey + data.pageNum}>
              <a className={data.thisPage}>{data.pageNum}</a>
            </Link>
          </li>
        )}
      </ul>
    );
  };


  // Track List
  const hierarchy = isCategory ? '../' : '/';
  const TrackList = () => {
    if (error) {
      return <p>?????????: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>???????????????...</p>;
    } else {
      return (
        <>
          <ul className="trackList">
            {tracksData.map((data, index) =>
              <li key={index} className={getTopTrack(data.order, index, tracksData)} data-order={data.order}>
                <figure>
                  <p className="icon">
                    <Link href={hierarchy + "category/" + data.path}>
                      <a>{data.icon}</a>
                    </Link>
                  </p>
                </figure>
                <dl>
                  <dt>
                    <Link href={hierarchy + "track/" + data.id}>
                      <a>
                        <p className="num">{data.number}</p>
                        <p className="song">{data.track}</p>
                      </a>
                    </Link>
                  </dt>
                  <dd>
                    <p className="title-area">
                      <span className="year">
                      <Link href={
                          isCategory ?
                          hierarchy + "category/" + data.path + "?year=" + data.year :
                          hierarchy + "?year=" + data.year
                        }>
                          <a>{data.year}</a>
                        </Link>
                      </span>
                      <span className="format">
                      <Link href={isCategory ?
                          hierarchy + "category/" + data.path + "?format=" + data.format :
                          hierarchy + "?format=" + data.format
                        }>
                          <a>{data.format}</a>
                        </Link>
                      </span>
                      <span className="title">{data.title}</span>
                      </p>
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
        <h2>{categoryName + queryInfo}</h2>
        <p className="pageInfo">???{pageInfo['trackLength']}??? - {pageInfo['thisPage']}???????????????{pageInfo['pageLength']}???????????????</p>
        <Pagination />
        <TrackList />
        <Pagination />
      </Section>
    </>
  );
}

export default InnerIndex;
