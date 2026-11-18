(() => {
  const product = {
    title: 'Forge K75',
    price: 7490,
    discountPercent: 10,
    isAvailable: true,
    stock: 8,
  };

  const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  function formatPrice(price) {
    return priceFormatter.format(price);
  }

  function calculateDiscount(price, discountPercent) {
    return price * discountPercent / 100;
  }

  function calculateFinalPrice(price, discountPercent) {
    return price - calculateDiscount(price, discountPercent);
  }

  function getProductStatus(item) {
    if (item.isAvailable === true && item.stock > 0) {
      return 'В наличии';
    }

    return 'Нет в наличии';
  }

  function createProductSummary(item) {
    const finalPrice = calculateFinalPrice(item.price, item.discountPercent);
    return `${item.title}: ${formatPrice(finalPrice)}. Статус: ${getProductStatus(item)}.`;
  }

  const originalPrice = formatPrice(product.price);
  const discount = formatPrice(calculateDiscount(product.price, product.discountPercent));
  const summary = createProductSummary(product);

  const demo = document.getElementById('product-demo');
  const output = document.getElementById('product-demo-output');

  if (demo && output) {
    output.textContent = `${summary} Исходная цена: ${originalPrice}. Учебная скидка: ${discount} (${product.discountPercent}%).`;
    demo.hidden = false;
  }

  console.table(product);
  console.log('Цена:', originalPrice);
  console.log('Скидка:', discount);
  console.log('Краткое описание:', summary);
})();
