const api = 'f072880e4d084243895d992f59d6aaf7';
const newsBlock = document.querySelector('.news__block');
const newsBlockTrends = document.getElementById('news-block');


const fetchHeadlines = async () => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`);
    
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Fetched Headlines Data:", data);
    
    return data.articles.slice(0, 4);
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
}


const searchNews = async (query) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api}`);
  const data = await response.json();
  console.log("searchNews Data:", data);
  return data.articles.slice(0, 8);
}



const displayArticles = (articles) => {
  newsBlock.innerHTML = '';
  articles.forEach(article => {
    const articleCard = document.createElement('div');
    articleCard.classList.add('news__card');

    articleCard.innerHTML = `
                    <div class="news__card-image">
                <img class="news__card-img" src="${article.urlToImage}" alt="${article.title}">
              </div>
              <div class="news__card-main">
                <div class="news__card-main-text">
                  <a href="${article.url}" target="_blank">${article.title}</a>
                </div>
                <button class="news__card-main-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
              <div class="news__card-text-description">
                ${article.description || 'Описание недоступно'}
              </div>
              <div class="news__card-text-signature">
                <div class="news__card-text-signature-block">
                  <p class="news__card-text-signature-date">
                    ${new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p class="news__card-text-signature-time">
                    ${new Date(article.publishedAt).toLocaleTimeString()}
                  </p>
                </div>
                <p class="news__card-text-signature-name">
                  ${article.author || 'Unknown'}
                </p>
              </div>
    `;

    newsBlock.appendChild(articleCard);
  });
}
const displayArticlesTrends = (data) => {
  newsBlockTrends.innerHTML = '';
  data.forEach(article => {
    const articleCardTrends = document.createElement('div');
    articleCardTrends.classList.add('news__card');

    articleCardTrends.innerHTML = `
                    <div class="news__card-image">
                <img class="news__card-img" src="${article.urlToImage}" alt="${article.title}">
              </div>
              <div class="news__card-main">
                <div class="news__card-main-text">
                  <a href="${article.url}" target="_blank">${article.title}</a>
                </div>
                <button class="news__card-main-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
              <div class="news__card-text-description">
               ${article.description || 'Описание недоступно'}
              </div>
              <div class="news__card-text-signature">
                <div class="news__card-text-signature-block">
                  <p class="news__card-text-signature-date">
                    ${new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p class="news__card-text-signature-time">
                    ${new Date(article.publishedAt).toLocaleTimeString()}
                  </p>
                </div>
                <p class="news__card-text-signature-name">
                  ${article.author || 'Unknown'}
                </p>
              </div>
    `;

    newsBlockTrends.appendChild(articleCardTrends);
  });
}

document.querySelector('.header__search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements[0].value;

  try {
    const [searchResults, headlines] = await Promise.all([searchNews(query), fetchHeadlines()]);
    displayArticles([...searchResults, ...headlines]);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});

export const init = async () => {
  const headlines = await fetchHeadlines();
  displayArticlesTrends(headlines);
};

document.addEventListener('DOMContentLoaded', init);