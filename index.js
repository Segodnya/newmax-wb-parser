const axios = require('axios');
const cheerio = require('cheerio');

async function getIDsbyColor() {
  const response = await fetch('https://basket-12.wbbasket.ru/vol1827/part182770/182770058/info/ru/card.json', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,sv-SE;q=0.6,sv;q=0.5',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    referrer: 'https://www.wildberries.ru/catalog/182770058/detail.aspx?targetUrl=EX',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  });

  const items = await response.json();
  const idsByColor = items.colors;
  return idsByColor;
}

async function getStoreItems(id) {
  const response = await fetch('https://static-basket-01.wbbasket.ru/vol0/data/stores-data.json', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,sv-SE;q=0.6,sv;q=0.5',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    referrer: `https://www.wildberries.ru/catalog/${id}/detail.aspx`,
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  });

  const items = await response.json();
  const kazanWBItems = items.filter((item) => item.name === 'Казань WB');
  console.log(kazanWBItems.length);
}

getIDsbyColor().then((items) => {
  items.forEach((id) => {
    getStoreItems(id);
  });
});
