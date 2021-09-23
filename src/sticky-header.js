const targetElem = document.querySelector('.filters-bar');
const header = document.querySelector('.header');

const options = {
  // root: default to viewport
  // rootMargin: '0px 0px 0px 0px',
  threshold: 1,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    header.classList.toggle('sticky', !entry.isIntersecting);
  });
}, options);

observer.observe(targetElem);
