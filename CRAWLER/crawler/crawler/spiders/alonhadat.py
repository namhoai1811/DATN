import scrapy
from scrapy.selector import Selector
from ..items import CrawlAlonhadatItem

class BatdongsanSpider(scrapy.Spider):
    i=1
    name = "alonhadat"
    base_url="https://alonhadat.com.vn/nha-dat/can-ban/"
    def start_requests(self):
        start_urls=[
            "https://alonhadat.com.vn/nha-dat/can-ban.html"
        ]
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.content-item')
        for product in products:
            link_detail = product.css('.thumbnail > a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 500:
            self.i += 1
            path_next = self.base_url + "trang--"+str(self.i)+".html"
            yield response.follow(path_next, callback=self.parse)

    def parse_detail(self, response):
        item = CrawlAlonhadatItem()
        item['title'] = response.css('.property > .title > h1::text').extract_first()
        item['date'] = response.css('.property > .title > span::text').extract_first()
        item['price'] = response.css('.property > .moreinfor > .price > .value::text').extract_first()
        item['square'] = response.css('.property > .moreinfor > .square > .value::text').extract_first()
        item['width'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(4) > td:nth-child(2)::text ').extract_first()
        item['length'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(5) > td:nth-child(2)::text').extract_first()
        item['code'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(1) > td:nth-child(2)::text').extract_first()
        item['direct'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(1) > td:nth-child(4)::text').extract_first()
        item['project'] = response.css(
            '.property > .moreinfor1 > .infor > table  > tr:nth-child(6) > td:nth-child(2) > .project > a::text').extract_first()
        item['description'] = response.css('.property > .detail::text').extract_first()
        item['road_width'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(2) > td:nth-child(4)::text').extract_first()
        item['floor'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(4) > td:nth-child(4)::text').extract_first()
        item['bedroom'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(5) > td:nth-child(4)::text').extract_first()
        item['kitchen'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(2) > td:nth-child(6) > img::attr(src)').extract_first()
        item['diningroom'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(1) > td:nth-child(6) > img::attr(src)').extract_first()
        item['terrace'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(3) > td:nth-child(6) > img::attr(src)').extract_first()
        item['parking'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(4) > td:nth-child(6) > img::attr(src)').extract_first()
        item['address'] = response.css('.property > .address > .value::text').extract_first()
        item['juridical'] = response.css(
            '.property > .moreinfor1 > .infor > table > tr:nth-child(3) > td:nth-child(4)::text').extract_first()
        # item['type'] = response.css(
        #     '.property > .moreinfor1 > .infor > table > tr:nth-child(3) > td:nth-child(2)::text').extract_first()
        item['link_image'] = response.css('.property > .images > .imageview > img::attr(src)').extract_first()
        item['name_contact'] = response.css('.contact > .contact-info > .content > .name::text').extract_first()
        item['phone_contact'] = response.css('.contact > .contact-info > .content > .fone > a::text').extract_first()
        item['introduce_contact'] = response.css('.contact > .contact-info > .content > .introduce::text').extract_first()
        item['url_page'] = response.request.url
        item['type'] = '0'

        yield item


