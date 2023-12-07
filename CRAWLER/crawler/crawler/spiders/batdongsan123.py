import scrapy
from scrapy.selector import Selector
from ..items import CrawlBatdongsan123

class BatdongsanSpider(scrapy.Spider):
    i=1
    name = "bds123"
    base_url="https://bds123.vn/ban-nha.html?page="
    def start_requests(self):
        start_urls=[
            "https://bds123.vn/ban-nha.html"
        ]
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.item')
        for product in products:
            link_detail = product.css('a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 10:
            self.i += 1
            path_next = self.base_url +str(self.i)
            yield response.follow(path_next, callback=self.parse)

    def parse_detail(self, response):
        item = CrawlBatdongsan123()
        item['title'] = response.css('.page-h1::text').extract_first()
        item['description'] = response.css('.post-section > div > p::text').extract()
        item['link_image'] = response.css('.leftCol > .post-images > img::attr(data-src)').extract_first()
        item['url_page'] = response.request.url
        item['price'] = response.css('.post-price::text').extract() + response.css('.post-price > i::text').extract()
        item['bedroom'] = response.css('.post-bedroom::text').extract()
        item['bathroom'] = response.css('.post-bathroom::text').extract()
        item['acreage'] = response.css('.post-acreage::text').extract()
        item['address'] = response.css('.post-address > span::text').extract_first()
        item['direction'] = response.css('.post-direction::text').extract()
        item['code'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text').extract_first()
        item['date'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(5) > td:nth-child(2) time::text').extract_first()
        item['name_contact'] = response.css('.rightCol > .aside-box > .aside-box-content > a  .author-name::text').extract_first()
        item['project'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(3) > td:nth-child(2)::text').extract_first()
        item['phone_contact'] = response.css('.rightCol > .aside-box-author > .aside-box-content .btn-phone::text').extract()
        item['type'] = '0'
        yield item



