import React, { useContext }  from 'react';
import { indexContext } from '../context/indexContext';
import styled from 'styled-components';


// CSS in JS
const Div = styled.div`
  .queryInfo {
    font-weight: bold;
    margin: 0px;
  }
  .pageInfo {
    font-size: 12px;
  }
`;


// Information
const Information = () => {
    // Hooks
    const {queryInfo, setQueryInfo} = useContext(indexContext);
    const {pageInfo, setPageInfo} = useContext(indexContext);

    return (
        <>
            <Div>
                <p className="queryInfo">{queryInfo !== "" && queryInfo}</p>
                <p className="pageInfo">
                    全{pageInfo['trackLength']}件 - {pageInfo['thisPage']}ページ目（{pageInfo['pageLength']}ページ中）
                </p>
            </Div>
        </>
    );
};

export default Information;