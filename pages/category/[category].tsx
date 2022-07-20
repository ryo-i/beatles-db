import React, { useState, useEffect }  from 'react';
import { categoryContext } from '../../context/categoryContext';
import Head from 'next/head';
import Header from '../../components/Header';
import InnerCategory from '../../components/InnerCategory';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


function Home({ categoryInfo }) {
  const [isCategory, setIsCategory] = useState(true);
  const [categoryName, setCategoryName] = useState(categoryInfo.name);
  const [categoryPath, setCategoryPath] = useState(categoryInfo.path);

  const headerTitle = Data.header.title;
  const headTitle = categoryName + 'の楽曲一覧 | ' + headerTitle;
  const headText = categoryName + 'の楽曲一覧です。'
  const pageTitle = '楽曲一覧';
  const pageText = 'アーティスト名、アルバム名、人名などで絞り込みができます。';


  // Set Category Info
  useEffect(() => {
    setCategoryName(categoryInfo.name);
    setCategoryPath(categoryInfo.path);
    // console.log('categoryName', categoryName);
    // console.log('categoryPath', categoryPath);
  }, [categoryInfo]);


  return (
    <>
      <Head>
        <title>{ headTitle }</title>
        <meta name="description" content={ headText } />
        <meta property="og:title" content={ headTitle } />
        <meta property="og:description" content={ headText } />
      </Head>
      <Header />
      <main>
        <h1>{ pageTitle }</h1>
        <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
        <categoryContext.Provider value={{isCategory, setIsCategory, categoryName, setCategoryName, categoryPath, setCategoryPath}} >
          <InnerCategory />
        </categoryContext.Provider>
      </main>
      <Footer />
    </>
  )
}


// Get Path
export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'beatles' } },
      { params: { category: 'john-yoko' } },
      { params: { category: 'paul' } },
      { params: { category: 'george' } },
      { params: { category: 'ringo' } },
      { params: { category: 'tony-beatles' } }
    ],
    fallback: false
  };
}


// This Category Info
const thisCaterogyInfo = (category) => {
  const categoryInfo = {
    path: '',
    name: ''
  };

  if (category === 'beatles') {
    categoryInfo.path = 'beatles';
    categoryInfo.name = 'Beatles';
  } else if (category === 'john-yoko') {
    categoryInfo.path = 'john-yoko';
    categoryInfo.name = 'John & Yoko';
  } else if (category === 'paul') {
    categoryInfo.path = 'paul';
    categoryInfo.name = 'Paul McCartney';
  } else if (category === 'george') {
    categoryInfo.path = 'george';
    categoryInfo.name = 'George Harrison';
  } else if (category === 'ringo') {
    categoryInfo.path = 'ringo';
    categoryInfo.name = 'Ringo Starr';
  } else if (category === 'tony-beatles') {
    categoryInfo.path = 'tony-beatles';
    categoryInfo.name = 'Tony & Beatles';
  }

  return categoryInfo;
}


// Get CategoryInfo
export async function getStaticProps({ params }) {
  const category = params.category;
  const categoryInfo = thisCaterogyInfo(category);
  // console.log('category', category);
  // console.log('categoryInfo', categoryInfo);
  return { props: { categoryInfo } };
}

export default Home;