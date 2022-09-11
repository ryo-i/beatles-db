import React, { useState, useEffect }  from 'react';
import { categoryContext } from '../../context/categoryContext';
import Header from '../../components/Header';
import InnerIndex from '../../components/InnerIndex';
import Footer from '../../components/Footer';
import { getCaterogyInfo } from '../../modules/trackList/getCaterogyInfo';


const pageTitle = '楽曲一覧';
const pageText = 'アーティスト名、アルバム名、人名などで絞り込みができます。';


function Home({ categoryInfo }) {
  const [isCategory, setIsCategory] = useState(true);
  const [categoryName, setCategoryName] = useState(categoryInfo.name);
  const [categoryPath, setCategoryPath] = useState(categoryInfo.path);


  // Set Category Info
  useEffect(() => {
    setCategoryName(categoryInfo.name);
    setCategoryPath(categoryInfo.path);
    // console.log('categoryName', categoryName);
    // console.log('categoryPath', categoryPath);
  }, [categoryInfo]);


  return (
    <>
      <Header />
      <main>
        <h1>{ pageTitle }</h1>
        <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
        <categoryContext.Provider value={{isCategory, setIsCategory, categoryName, setCategoryName, categoryPath, setCategoryPath}} >
          <InnerIndex />
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


// Get CategoryInfo
export async function getStaticProps({ params }) {
  const category = params.category;
  const categoryInfo = getCaterogyInfo(category);
  // console.log('category', category);
  // console.log('categoryInfo', categoryInfo);
  return { props: { categoryInfo } };
}

export default Home;