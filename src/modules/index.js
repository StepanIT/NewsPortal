import {fetchHeadlines} from './fetchRequest.js';
import preload from './preload.js';
import {displayArticlesTrends} from './render.js';


const init = async () => {
  preload.show();
  const headlines = await fetchHeadlines('us', 8);
  displayArticlesTrends(headlines);
  preload.remove();
};

document.addEventListener('DOMContentLoaded', init);
