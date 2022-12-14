// export const Types = {
//   GET_NEWS_START: 'news/get_news_start',
//   GET_NEWS_REQUEST: 'news/get_news_request',
//   GET_NEWS_SUCCESS: 'news/get_news_success',
//   NEWS_ERROR: 'news/news_error'
// };
import Types from '../constants/Types';

// console.log(Types);
// console.log('in actions Types.GET_NEWS_START is ', Types.GET_NEWS_START);

export const getNewsStart = () => ({
  type: Types.GET_NEWS_START,
});

export const setNewsDisplayTimestamp = (displayTime) => ({
  type: Types.SET_NEWS_DISPLAY_TIMESTAMP,
  payload: {
    displayTime,
  },
});

export const getNewsRequest = () => ({
  type: Types.GET_NEWS_REQUEST,
});

export const getNewsSuccess = ({ items, fetchTime }) => ({
  type: Types.GET_NEWS_SUCCESS,
  payload: {
    items,
    fetchTime,
  },
});

export const newsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.NEWS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});
