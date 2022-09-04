import React, { useContext }  from 'react';
import Link from 'next/link';
import { categoryContext } from '../context/categoryContext';
import { indexContext } from '../context/indexContext';


// Index Bread Crumb
const IndexBreadcrumb = () => {
    // Hooks
    const {isCategory, setIsCategory} = useContext(categoryContext);
    const {categoryPath, setCategoryPath} = useContext(categoryContext);
    const {categoryName, setCategoryName} = useContext(categoryContext);
    const {queryInfo, setQueryInfo} = useContext(indexContext);
    const {hierarchy, setHierarchy} = useContext(indexContext);


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


export default IndexBreadcrumb;