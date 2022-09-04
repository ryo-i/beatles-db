import React, { useContext }  from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { categoryContext } from '../context/categoryContext';
import { indexContext } from '../context/indexContext';
import { getPagination } from '../modules/trackList/getPagination';


// CSS in JS
const Ul = styled.ul`
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
`;


// Pagination
const Pagination = () => {
    // Hooks
    const {isCategory, setIsCategory} = useContext(categoryContext);
    const {categoryPath, setCategoryPath} = useContext(categoryContext);
    const {pageInfo, setPageInfo} = useContext(indexContext);
    const {pageParam, setPageParam} = useContext(indexContext);
    const {pageKey, setPageKey} = useContext(indexContext);


    const pagination = getPagination(pageInfo);
    const paginationPath = isCategory ? '/category/' + categoryPath : '/';


    return (
      <Ul className="pagination">
        {pagination.map((data, index) =>
          <li key={index}>
            <Link href={paginationPath + pageParam + pageKey + data.pageNum}>
              <a className={data.thisPage}>{data.pageNum}</a>
            </Link>
          </li>
        )}
      </Ul>
    );
  };

  export default Pagination;