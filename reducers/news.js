// import { Types } from '../actions/news';
import Types from '../constants/Types';
import { getDateOfLatestCriticalNewsItem } from '../helpers/news';
import { isDateAfter } from '../helpers/dates';

const INITIAL_STATE = {
  newsItems: [],
  viewCount: 0,
  redCount: 0,
  lastUpdate: null,
  latestCriticalItemDate: null,
  unseenCriticalNews: 0,
  previousUpdate: null,
  isLoading: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  displayTimestamp: null,
};

const countCriticalItems = (items) => {
  let count = 0;

  if (items && items.length > 0) {
    items.map((item) => {
      if (
        item.businessCritical &&
        item.businessCritical.length > 0 &&
        (item.businessCritical.toLowerCase() === 'y' ||
          item.businessCritical.toLowerCase() === 'yes' ||
          item.businessCritical.toLowerCase() === 'true')
      ) {
        count++;
      }
    });
  }

  return count;
};

const checkunseenCriticalNews = (
  latestCriticalItemDate = null,
  displayTimestamp = null
) => {
  //   console.log(
  //     'in checkunseenCriticalNews',
  //     'latestCriticalItemDate',
  //     latestCriticalItemDate,
  //     'displayTimestamp',
  //     displayTimestamp
  //   );
  const isSeen = isDateAfter(
    displayTimestamp,
    latestCriticalItemDate,
    'news reducer'
  );
  //   console.log(
  //     'in checkunseenCriticalNews',
  //     'isSeen',
  //     isSeen,
  //     'latestCriticalItemDate',
  //     latestCriticalItemDate,
  //     'displayTimestamp',
  //     displayTimestamp
  //   );

  const unseenCriticalNews = isSeen ? 0 : 1;

  return unseenCriticalNews;
};

export default function news(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_NEWS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.SET_NEWS_DISPLAY_TIMESTAMP: {
      //   console.log(
      //     'date in state is',
      //     state.displayTimestamp,
      //     'setting to',
      //     Date.now()
      //   );
      const itemsList = state.newsItems;
      const displayTime =
        action.payload && action.payload.displayTime
          ? action.payload.displayTime
          : null;

      //   console.log(
      //     'in news reducer set display',
      //     action.payload && action.payload
      //   );

      const dateOfLatestCriticalNewsItem =
        getDateOfLatestCriticalNewsItem(itemsList);
      const redCount = countCriticalItems(itemsList);
      const unseenCriticalNews = state.displayTimestamp
        ? redCount
          ? dateOfLatestCriticalNewsItem
            ? checkunseenCriticalNews(
                dateOfLatestCriticalNewsItem,
                state.displayTimestamp
              )
            : 0
          : 0
        : 1;

      //   console.log(
      //     'in news reducer setting timestamp',
      //     'redCount',
      //     redCount,
      //     'dateOfLatestCriticalNewsItem',
      //     dateOfLatestCriticalNewsItem,
      //     'state.displayTimestamp',in appnav useEffect
      //     state.displayTimestamp,
      //     'unseenCriticalNews',
      //     unseenCriticalNews
      //   );
      return {
        ...state,
        unseenCriticalNews: unseenCriticalNews,
        displayTimestamp: displayTime,
      };
    }
    case Types.GET_NEWS_SUCCESS: {
      //   console.log(action.payload.items && action.payload.items);

      const fetchTime =
        action.payload && action.payload.fetchTime
          ? action.payload.fetchTime
          : null;

      const newlastUpdate =
        (action.payload.items &&
          action.payload.items[0] &&
          action.payload.items[0].lastUpdated &&
          action.payload.items[0].lastUpdated) ||
        null;

      //   const newPreviousUpdated =
      //     (state.previousUpdated &&
      //       state.lastUpdated &&
      //       state.previousUpdated !== newlastUpdated &&
      //       state.lastUpdated) ||
      //     null;
      const itemsList = (action.payload.items && action.payload.items) || [];
      const dateOfLatestCriticalNewsItem =
        getDateOfLatestCriticalNewsItem(itemsList);
      const redCount = countCriticalItems(itemsList);
      const unseenCriticalNews = redCount
        ? dateOfLatestCriticalNewsItem
          ? state.displayTimestamp
            ? checkunseenCriticalNews(
                dateOfLatestCriticalNewsItem,
                state.displayTimestamp
              )
            : 0
          : 1
        : 0;
      //   console.log(
      //     'in news reducer, saving news',
      //     'redCount',
      //     redCount,
      //     'dateOfLatestCriticalNewsItem',
      //     dateOfLatestCriticalNewsItem,
      //     'state.displayTimestamp',
      //     state.displayTimestamp,
      //     'unseenCriticalNews',
      //     unseenCriticalNews
      //   );
      return {
        ...state,
        // newsItems: [],
        newsItems: itemsList,
        latestCriticalItemDate: dateOfLatestCriticalNewsItem,
        redCount: redCount,
        unseenCriticalNews: unseenCriticalNews,
        previousUpdate: (state.lastUpdate && state.lastUpdate) || newlastUpdate,
        lastUpdate: newlastUpdate,
        fetchTime,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.INCREMENT_NEWS_VIEW_COUNT: {
      //   console.log('in odis reducer increment view couunt ');
      let oldViewCount = (state && state.viewCount) || 0;

      return {
        ...state,
        viewCount: oldViewCount + 1,
      };
    }
    case Types.RESET_NEWS_VIEW_COUNT: {
      return {
        ...state,
        viewCount: 0,
      };
    }
    case Types.NEWS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
