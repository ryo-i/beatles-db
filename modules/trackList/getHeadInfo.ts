import Data from '../../data/data.json';



// getHeadInfo
const getHeadInfo = (isCategory, queryInfo, categoryName) => {
    const headerTitle = Data.header.title;
    const headerText = Data.header.text;

    // console.log('isCategory', isCategory);
    // console.log('queryInfo', queryInfo);
    // console.log('categoryName', categoryName);

    let resultHeadTitle = '';
    let resultHeadText = '';

    if (!isCategory && !queryInfo) {
      resultHeadTitle = headerTitle;
      resultHeadText = headerText;
      // console.log('!isCategory && !queryInfo');
    } else if (!isCategory && queryInfo) {
      resultHeadTitle = queryInfo + ' の楽曲一覧 | ' + headerTitle;
      resultHeadText = queryInfo + ' の楽曲一覧です。';
      // console.log('!isCategory && queryInfo');
    } else if (isCategory && !queryInfo) {
      resultHeadTitle = categoryName + 'の楽曲一覧 | ' + headerTitle;
      resultHeadText= categoryName + 'の楽曲一覧です。';
      // console.log('isCategory && !queryInfo');
    } else if (isCategory && queryInfo) {
      resultHeadTitle = queryInfo + '（' + categoryName + '）' + 'の楽曲一覧 | ' + headerTitle;
      resultHeadText = queryInfo + '（' + categoryName + '）' + 'の楽曲一覧です。';
      // console.log('isCategory && queryInfo');
    }

    const result = {
      headTitle:resultHeadTitle,
      headText: resultHeadText
    }

    return result;
};

export { getHeadInfo };