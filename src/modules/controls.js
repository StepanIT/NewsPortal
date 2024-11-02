import {countryDropdown, countryInput, headerListBtn}
  from './createElements.js';
import {fetchHeadlines, searchNews} from './fetchRequest.js';
import preload from './preload.js';
import {displayArticles, displayArticlesTrends} from './render.js';

export const clearResults = () => {
  document.querySelectorAll('.search__news, .news__search').forEach(element =>
    element.remove());
};
export const clearResultsTrends = () => {
  document.querySelectorAll('.news, .result__search').forEach(element =>
    element.remove());
};


headerListBtn.addEventListener('click', () => {
  const isVisible = countryDropdown.style.display === 'block';
  countryDropdown.style.display = isVisible ? 'none' : 'block';
});

export let selectedCountry = 'us';

countryDropdown.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    selectedCountry = e.target.dataset.country;
    countryInput.value = e.target.textContent;
    countryDropdown.style.display = 'none';

    clearResultsTrends();
    preload.show();

    try {
      const headlines = await fetchHeadlines(selectedCountry, 8);
      displayArticlesTrends(headlines);
    } catch (error) {
      console.error('Error fetching news for selected country:', error);
    } finally {
      preload.remove();
    }
  }
});

document.querySelector('.header__search-form').addEventListener(
  'submit', async (e) => {
    e.preventDefault();
    const query = e.target.elements[0].value;
    try {
      clearResultsTrends();
      preload.show();
      const [headlines, searchResults] =
       await Promise.all([fetchHeadlines(selectedCountry, 4),
         searchNews(query)]);
      displayArticlesTrends(headlines);
      displayArticles(searchResults, query);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    preload.remove();
  });
