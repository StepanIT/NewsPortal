// import {api} from './createElements.js';
// import {selectedCountry} from './controls.js';

export const fetchHeadlines = async (limit = 8) => {
  try {
    const response = await fetch('./headlines.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

 

    const data = await response.json();
    console.log(data);

    return data.articles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching headlines:', error);
    return [];
  }
};


export const searchNews = async (query) => {
  try {
    const response = await fetch('./search.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data);
    return data.articles.slice(0, 8);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
