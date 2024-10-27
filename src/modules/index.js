const api = 'f072880e4d084243895d992f59d6aaf7';
const footer = document.getElementById('footer');
const header = document.getElementById('header');

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
  const resultSearch = document.createElement('div')
  resultSearch.classList.add('result__search', 'section');

  resultSearch.innerHTML = `
    <hr class="result__search-line">
        <div class="container">
          <p class="result__search-text">
            По вашему запросу “Россия” найдено 8 результатов
          </p>
        </div>
        <hr class="result__search-line">
  `
  const news = document.createElement('div')
  news.classList.add('news', 'section');
  const container = document.createElement('div')
  container.classList.add('container');
  const newsBlock = document.createElement('div')
  newsBlock.classList.add('news__block');

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
    container.appendChild(newsBlock);
    news.appendChild(container);
    header.insertAdjacentElement('afterend', resultSearch);
    resultSearch.insertAdjacentElement('afterend', news);
  });
}
const displayArticlesTrends = (data) => {
  const resultSearchTrends = document.createElement('div')
  resultSearchTrends.classList.add('result__search', 'section');

  resultSearchTrends.innerHTML = `
    <hr class="result__search-line">
        <div class="container">
          <p class="result__search-text">
            Свежие новости
          </p>
        </div>
        <hr class="result__search-line">
  `
  const newsTrends = document.createElement('div')
  newsTrends.classList.add('news', 'section');
  const container = document.createElement('div')
  container.classList.add('container');
  const newsBlockTrends = document.createElement('div')
  newsBlockTrends.classList.add('news__block');

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
    container.appendChild(newsBlockTrends);
    newsTrends.appendChild(container);
    document.body.insertBefore(resultSearchTrends, footer);
    document.body.insertBefore(newsTrends, footer);
  });
}

document.querySelector('.header__search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements[0].value;
  try {
    const [searchResults, headlines] = await Promise.all([searchNews(query), fetchHeadlines()]);
    displayArticles([...searchResults]);
    displayArticlesTrends([...headlines]);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});

export const init = async () => {
  const headlines = await fetchHeadlines();
  displayArticlesTrends(headlines);
};

document.addEventListener('DOMContentLoaded', init);