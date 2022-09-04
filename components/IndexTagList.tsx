import React, { useContext }  from 'react';
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

  const tagListPath = isCategory ? 'category/' + categoryPath : '';
  const yearTagList = getTagList(yearList, currentYear);
  const formatTagList = getTagList(formatList, currentFormat);

  return (
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