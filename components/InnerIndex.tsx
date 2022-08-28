import React, { useState, useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { categoryContext } from '../context/categoryContext';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import CategoryNav from './CategoryNav';
import Nav from './style/Nav';
import Data from '../data/data.json';
import { getPagination } from '../modules/trackList/getPagination';
import { getPageKey } from '../modules/trackList/getPageKey';
import { getTopTrack } from '../modules/trackList/getTopTrack';
import { getQueryParam } from '../modules/trackList/getQueryParam';
import { getHeadInfo } from '../modules/trackList/getHeadInfo';
import { getQueryInfo } from '../modules/trackList/getQueryInfo';
import { deleteParam } from '../modules/trackList/deleteParam';


const headerTitle = Data.header.title;
const headerText = Data.header.text;


// CSS in JS
const tabStyle = `{
  background: #888;
  color: #fff;
  margin: 0 5px 5px 0;
  padding : 3px;
  font-size: 10px;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
}`;


// CSS in JS
const Section = styled.section`
  h2 {
    color: #333;
    margin: 0 0 10px;
  }
  .tag {
    padding: 0;
    margin: 0 0 30px;
    li {
      display: inline;
    }
    .year,
    .format {
      a {
        ${tabStyle}
      }
      .currentTag {
        background: #c26772;
      }
    }
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
      .icon a {
        display: block;
        text-decoration: none;
        background: #c26772;
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
            margin: 0;
          }
          .title {
            font-weight: bold;
          }
          .title a,
          .artist a {
            color: #666;
          }
          .year a,
          .format a ${tabStyle}
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
  .queryInfo {
    font-weight: bold;
    margin: 0px;
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
        background: #c26772;
      }
    }
  }
`;


// Component
function InnerIndex() {
  // Hooks
  const [headTitle, setHeadTitle] = useState(headerTitle);
  const [headText, setHeadText] = useState(headerText);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [yearList, setYearList] = useState([]);
  const [formatList, setFormatList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [tracksData, setTracksData] = useState([]);
  const {isCategory, setIsCategory} = useContext(categoryContext);
  const {categoryName, setCategoryName} = useContext(categoryContext);
  const {categoryPath, setCategoryPath} = useContext(categoryContext);
  const [isQueryInfo, setIsQueryInfo] = useState(false);
  const [queryInfo, setQueryInfo] = useState('');
  const [hierarchy, setHierarchy] = useState('/');

  // Get Query Param
  const router = useRouter();
  const queryParam = router.query;
  const { category, page } = router.query;


  useEffect(() => {
    const thisQueryInfo = getQueryInfo(queryParam);
    setQueryInfo(thisQueryInfo);

    if (thisQueryInfo !== '') {
      setIsQueryInfo(true);
    }

    if (category) {
      queryParam.category = category;
      setHierarchy('../');
      setIsCategory(true);
    } else if (isCategory) {
      queryParam.category = categoryPath;
      setHierarchy('../');
    }

    if (page) {
      queryParam.page = page;
    }

    const queryText = getQueryParam(queryParam);
    const headINfo = getHeadInfo(isCategory, thisQueryInfo, categoryName);
    setHeadTitle(headINfo.headTitle);
    setHeadText(headINfo.headText);

    // fetch
    const url: string = isCategory ? '../api/beatles' + queryText : 'api/beatles' + queryText;
    console.log('url', url);
    async function getTracksData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        const data = resJson;
        console.log('data', data);
        setTracksData(data.trackList);
        setYearList(data.yearList);
        setFormatList(data.formatList);
        setPageInfo(data.pageInfo);
        setIsLoaded(true);
      } catch(error) {
        setError(error);
        console.log('err', error);
        setIsLoaded(true);
      }
    };

    if (router.isReady && queryText !== null) {
      getTracksData(url);
    }
  }, [router, queryParam, categoryName]);


  // Breadcrumb
  const Breadcrumb = () => {
    if (!isCategory && !queryInfo) {
      return (
        <ul className="breadcrumb">
        </ul>
      );
    } else if (!isCategory && queryInfo) {
      return (
        <ul className="breadcrumb">
          <li><Link href="/"><a>Home</a></Link></li>
          <li>{queryInfo}</li>
        </ul>
      );
    } else if (isCategory && !queryInfo) {
      return (
        <ul className="breadcrumb">
          <li><Link href="/"><a>Home</a></Link></li>
          <li>{categoryName}</li>
        </ul>
      );
    } else if (isCategory && queryInfo) {
      return (
        <ul className="breadcrumb">
          <li><Link href="/"><a>Home</a></Link></li>
          <li>
            <Link href={hierarchy + "category/" + categoryPath}>
              <a>{categoryName}</a>
            </Link>
          </li>
          <li>{queryInfo}</li>
        </ul>
      );
    }
  };


  // Tag
  const Tag = () => {
    return (
      <ul className="tag">
          {yearList.map((data, index) =>
            <li key={index} className="year">
              <Link href={
                isCategory ?
                hierarchy + "category/" + categoryPath + "?year=" + data :
                hierarchy + "?year=" + data
              }>
                <a className={
                  queryParam.year === data ? "currentTag" : ""
                }>{data}</a>
              </Link>
            </li>
          )}
          {formatList.map((data, index) =>
            <li key={index} className="format">
              <Link href={
                isCategory ?
                hierarchy + "category/" + categoryPath + "?format=" + data :
                hierarchy + "?format=" + data
              }>
                <a className={
                  queryParam.format === data ? "currentTag" : ""
                }>{data}</a>
              </Link>
            </li>
          )}
      </ul>
    );
  };


  // Information
  const Information = () => {
    return (
      <>
        <p className="queryInfo">{queryInfo !== "" && queryInfo}</p>
        <p className="pageInfo">
          全{pageInfo['trackLength']}件 - {pageInfo['thisPage']}ページ目（{pageInfo['pageLength']}ページ中）
        </p>
      </>
    );
  };


  // Pagination
  const Pagination = () => {
    const pagination = getPagination(pageInfo);
    const paginationPath = isCategory ? '/category/' + categoryPath : '/';
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
  const TrackList = () => {
    if (error) {
      return <p>エラー: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>読み込み中...</p>;
    } else {
      return (
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
                    <span className="title">
                      <Link href={isCategory ?
                        hierarchy + "category/" + data.path + "?order=" + data.order + "&title=" + data.title :
                        hierarchy + "?order=" + data.order + "&title=" + data.title
                      }>
                        <a>{data.title}</a>
                      </Link>
                    </span>
                  </p>
                  <p className="artist">
                      <Link href={isCategory ?
                        hierarchy + "category/" + data.path + "?artist=" + data.artist :
                        hierarchy + "?artist=" + data.artist
                      }>
                        <a>{data.artist}</a>
                      </Link>
                  </p>
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
      <Head>
        <title>{ headTitle }</title>
        <meta name="description" content={ headText } />
        <meta property="og:title" content={ headTitle } />
        <meta property="og:description" content={ headText } />
      </Head>
      <CategoryNav />
      <Nav>
        <Breadcrumb />
      </Nav>
      <Section>
        <h2>{categoryName}</h2>
        <Tag />
        <Information />
        <Pagination />
        <TrackList />
        <Pagination />
      </Section>
    </>
  );
}

export default InnerIndex;
