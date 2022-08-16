import React, { useState }  from 'react';
import { categoryContext } from '../context/categoryContext';
import Header from '../components/Header';
import InnerIndex from '../components/InnerIndex';
import Footer from '../components/Footer';


const pageTitle = '楽曲一覧';
const pageText = 'アーティスト名、アルバム名、人名などで絞り込みができます。';


function Home() {
  const [isCategory, setIsCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('All');
  const [categoryPath, setCategoryPath] = useState('');

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

export default Home;