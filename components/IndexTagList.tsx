import React, { useState, useEffect, useContext }  from 'react';
import Link from 'next/link';
import { categoryContext } from '../context/categoryContext';
import { indexContext } from '../context/indexContext';
import styled from 'styled-components';
import tagStyle from './style/tagStyle';
import { getTagList } from '../modules/trackList/getTagList';


// CSS in JS
const Nav = styled.nav`
  .tag {
    padding: 0;
    margin: 0 0 30px;
    li {
      display: inline;
    }
    .year,
    .format {
      a {
        ${tagStyle}
      }
      .currentTag {
        background: #c26772;
      }
    }
  }
`;


// Tag List
const TagList = () => {
  // Hooks
  const {isCategory, setIsCategory} = useContext(categoryContext);
  const {categoryPath, setCategoryPath} = useContext(categoryContext);
  const {yearList, setYearList} = useContext(indexContext);
  const {hierarchy, setHierarchy} = useContext(indexContext);
  const {formatList, setFormatList} = useContext(indexContext);
  const {currentYear, setCurrentYear} = useContext(indexContext);
  const {currentFormat, setCurrentFormat} = useContext(indexContext);
  const [tagListPath, setTagListPath] = useState('');
  const [yearTagList, setYearTagList] = useState([]);
  const [formatTagList, setFormatTagList] = useState([]);
  const [isSettings, setIsSettings] = useState(false);


  useEffect(() => {
    if (isCategory) {
      setTagListPath('category/' + categoryPath);
    } else {
      setTagListPath('');
    }

    const getYearTagList = getTagList(yearList, currentYear);
    setYearTagList(getYearTagList);

    const getFormatTagList = getTagList(formatList, currentFormat);
    setFormatTagList(getFormatTagList);

    setIsSettings(true);
  }, [isCategory, yearList, formatList]);


  return (
    isSettings &&
    <Nav>
      <ul className="tag">
        {yearList.map((data, index) =>
          <li key={index} className="year">
            <Link href={hierarchy + tagListPath + "?year=" + data}>
              <a className={yearTagList[index]}>{data}</a>
            </Link>
          </li>
        )}
        {formatList.map((data, index) =>
          <li key={index} className="format">
            <Link href={hierarchy + tagListPath + "?format=" + data}>
              <a className={formatTagList[index]}>{data}</a>
            </Link>
          </li>
        )}
      </ul>
    </Nav>
  );
};

export default TagList;