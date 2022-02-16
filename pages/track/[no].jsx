import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


// Component
const Post = () => {
  const router = useRouter();
  const { no } = router.query;

  const headerTitle = Data.header.title;
  const pageTitle = no;
  const pageText = no + 'の詳細情報';
  const headTitle = pageTitle + ' | ' + headerTitle;

    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageText } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageText } />
        </Head>

        <Header />
        <main>
            <h1>{ pageTitle }</h1>
            <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
            <section>
                <h2>「{no}」について</h2>
                <p>説明です。説明です。説明ですったら説明です。</p>
            </section>
        </main>
        <Footer />
        </>
    );
}

export default Post;