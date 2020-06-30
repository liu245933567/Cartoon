import { post } from './axios';
import {
    addCrawlerURL,
    getCrawlerListURL
} from './url';

// 添加爬虫
export function addCrawler(params) {
    return post(addCrawlerURL, params);
}

// 爬虫列表
export function getCrawlerList(params) {
    return post(getCrawlerListURL, params);
}
