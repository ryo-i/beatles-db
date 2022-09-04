import React, { useContext }  from 'react';
import { indexContext } from '../context/indexContext';


// Information
const Information = () => {
    // Hooks
    const {queryInfo, setQueryInfo} = useContext(indexContext);
    const {pageInfo, setPageInfo} = useContext(indexContext);

    return (
        <>
        <p className="queryInfo">{queryInfo !== "" && queryInfo}</p>
        <p className="pageInfo">
            全{pageInfo['trackLength']}件 - {pageInfo['thisPage']}ページ目（{pageInfo['pageLength']}ページ中）
        </p>
        </>
    );
};

export default Information;