const products = require('../_data/products.json');

module.exports = {
  video: function(id) {
    return `<div style="--aspect-ratio: 16/9;">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>`;
  },

  figure: function({ filename, alt = '', caption = '', ratio = '16/9' }) {
    return `<figure>
              <div style="--aspect-ratio: ${ratio};">
                <img src="/assets/images/${filename}" alt="${alt ? alt : ''}" />
              </div>
              ${caption ? `<figcaption>${caption}</figcaption>` : ''}
            </figure>`;
  },

  getProducts: function(ids = []) {
    const filteredProducts = products.filter(x => ids.includes(x.id));
    return `
        <div class="o-grid" style="--min-column: 220px;">
          ${filteredProducts
            .map(
              item =>
                `<article class="c-card" id="product-${item.id}">
                  <div style="--aspect-ratio: 1/1;"><img src="${item.thumbnail}" alt="Photo of ${item.name}" loading="lazy" /></div>
                  <h3 class="c-card__heading"><a href="${item.link}">${item.name}</a></h3>
                  <p class="c-card__description">${item.description}</p>
                  <span class="c-card__faux-anchor">
                    Buy on Amazon
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentcolor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                  </span>
                </article>
              `,
            )
            .join('')}
        </div>
      `;
  },
};
