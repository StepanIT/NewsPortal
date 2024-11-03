import {api} from './createElements.js';

export const fetchHeadlines = async (country, limit = 8) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${api}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data);
    return data.sources.slice(0, limit);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.articles.slice(0, 8);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
