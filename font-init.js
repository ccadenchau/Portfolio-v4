try {
  if (localStorage.getItem('portfolio-font') === 'original') {
    document.documentElement.dataset.font = 'original';
  }
} catch (e) {}
