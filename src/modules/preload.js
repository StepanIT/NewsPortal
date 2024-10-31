const preload = {
  circle: `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M143 60L113 90H135.5C135.5 114.825 115.325 135 90.5
   135C82.925 135 75.725 133.125 69.5 129.75L58.55
   140.7C67.775 146.55 78.725 150 90.5 150C123.65
    150 150.5 123.15 150.5 90H173L143 60ZM45.5 90C45.5
     65.175 65.675 45 90.5 45C98.075 45 105.275 46.875
      111.5 50.25L122.45 39.3C113.225 33.45 102.275 30 90.5
       30C57.35 30 30.5 56.85 30.5 90H8L38 120L68 90H45.5Z" fill="black" />
</svg>`,
  overlay: document.createElement('div'),

  show() {
    this.overlay.classList.add('overlay');
    this.overlay.innerHTML = this.circle;
    document.body.append(this.overlay);
  },
  remove() {
    this.overlay.remove();
  },
};

export default preload;
