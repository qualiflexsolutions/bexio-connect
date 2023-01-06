import { Injectable } from '@nestjs/common';
import axios from 'axios';

async function createArticle(
  articleNumber: string,
  articleName: string,
  articleprice: number,
  apiKey: string,
) {
  const options = {
    method: 'POST',
    url: 'https://api.bexio.com/2.0/article',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      user_id: 1,
      article_type_id: 1,
      intern_code: articleNumber,
      intern_name: articleName,
      purchase_price: articleprice,
      delivery_price: null,
      article_group_id: null,
    },
  };

  try {
    const response = await axios(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getArticles(apiKey: string): Promise<any[]> {
  const options = {
    method: 'GET',
    url: 'https://api.bexio.com/2.0/article',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function getArticlesAsString(apiKey: string): string {
  return JSON.stringify(getArticles(apiKey));
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  addArticle(): string {
    //API Token to find in Bexio (Einstellungen -> API)
    const apiKey = 'XXX';

    createArticle('Z-888', 'Artikel Liri', 29.99, apiKey);
    return 'Article created';

    // const articles = getArticlesAsString(apiKey);
    // return articles;
  }
}
