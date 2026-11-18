(() => {
  const form = document.getElementById('catalog-filters');
  const result = document.getElementById('catalog-result');
  const priceFrom = form.elements.namedItem('price-from');
  const priceTo = form.elements.namedItem('price-to');
  const products = Array.from(document.querySelectorAll('.product-card[data-category]'), (card) => ({
    card,
    name: card.querySelector('.product-card__title').textContent.trim().toLowerCase(),
    category: card.dataset.category,
    price: Number(card.querySelector('.product-card__price data').value),
  }));

  form.addEventListener('input', () => {
    priceTo.setCustomValidity('');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const minPrice = priceFrom.value === '' ? 0 : priceFrom.valueAsNumber;
    const maxPrice = priceTo.value === '' ? Infinity : priceTo.valueAsNumber;
    if (minPrice > maxPrice) {
      priceTo.setCustomValidity('Укажите верхнюю цену не ниже нижней.');
      priceTo.reportValidity();
      return;
    }

    const query = form.elements.namedItem('search').value.trim().toLowerCase();
    const category = form.elements.namedItem('category').value;
    let count = 0;

    for (const product of products) {
      const matches = product.name.includes(query)
        && (category === 'all' || product.category === category)
        && product.price >= minPrice
        && product.price <= maxPrice;
      product.card.hidden = !matches;
      count += Number(matches);
    }

    result.textContent = count === 0
      ? 'Ничего не найдено'
      : `Найдено: ${count} из ${products.length}`;
  });
})();
