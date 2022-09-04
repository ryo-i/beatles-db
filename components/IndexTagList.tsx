import React, { useContext }  from 'react';
import Link from 'next/link';
import { categoryContext } from '../context/categoryContext';
import { indexContext } from '../context/indexContext';


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
              currentYear === data ? "currentTag" : ""
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
              currentFormat === data ? "currentTag" : ""
            }>{data}</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default TagList;