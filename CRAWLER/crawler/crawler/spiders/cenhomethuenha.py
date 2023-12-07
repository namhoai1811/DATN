import scrapy
from scrapy.selector import Selector
from ..items import CrawlCenhome

class CenhomeSpider(scrapy.Spider):
    i=1
    name = "cenhome1"
    base_url="https://cenhomes.vn/thue-nha/page-"
    def start_requests(self):
        start_urls=[
            "https://cenhomes.vn/thue-nha"
        ]
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.cen-col')
        for product in products:
            link_detail = product.css(' div.b__mainImage > div.b_main-image-head > a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 10:
            self.i += 1
            path_next = self.base_url +str(self.i)
            yield response.follow(path_next, callback=self.parse)

    def parse_detail(self, response):
        item = CrawlCenhome()

        def covertString(string):
            if string == '--- ' or string == '---':
                return None
            else:
                return string


        item['title'] = response.css('.page-title::text').extract_first()
        item['type'] = response.css('body > div.b__mainContent > div.container > div > div.left-content > div.head-content > nav > ol > li:nth-child(2) > a::text').extract_first()
        item['description'] = response.css('.description::text').extract_first()
        # item['link_image'] = response.css('.leftCol > .post-images > img::attr(data-src)').extract_first()
        item['url_page'] = response.request.url
        item['price'] = response.css('.total-price ::text').extract_first()
        bedroom = response.css('.icon-bedroom::text').extract_first()
        item['bedroom'] = covertString(bedroom)
        # if bedroom == '--- ' or bedroom == '---':
        #     item['bedroom'] = None
        # else: item['bedroom'] = bedroom

        bathroom = response.css('.icon-bathroom::text').extract_first()
        item['bathroom'] = covertString(bathroom)
        # if bathroom == '--- ' or bathroom == '---':
        #     item['bathroom'] = None
        # else:
        #     item['bathroom'] = bathroom
        # item['bathroom'] = response.css('.icon-bathroom::text').extract_first()
        item['acreage'] = response.css('.item-attribute icon-area::text').extract_first()
        # item['address'] = response.css('.post-address > span::text').extract_first()
        item['direction'] = response.css('.icon-direction::text').extract_first()
        # item['code'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(1) > td:nth-child(2)::text').extract_first()
        # item['date'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(5) > td:nth-child(2) time::text').extract_first()
        item['name_contact'] = response.css('.fullname::text').extract_first()
        # item['project'] = response.css('.leftCol .table-wrap > table > tbody > tr:nth-child(3) > td:nth-child(2)::text').extract_first()
        item['phone_contact'] = response.css('.inner-right-info > a::text').extract_first()

        street = response.css('.block-location > .address > p:nth-child(1) > span::text').extract_first()
        item['street'] = covertString(street)
        # if street == '--- ' or street == '---':
        #     item['street'] = None
        # else: item['street'] = street

        ward = response.css('.block-location > .address > p:nth-child(2) > span::text').extract_first()
        # if ward == '--- ' or ward == '---':
        #     item['ward'] = None
        # else: item['ward'] = street
        item['ward'] = covertString(ward)

        district = response.css('.block-location > .address > p:nth-child(3) > span::text').extract_first()
        item['district'] = covertString(district)
        # if district == '--- ' or district == '---':
        #     item['district'] = None
        # else: item['district'] = district

        province = response.css('.block-location > .address > p:nth-child(4) > span::text').extract_first()
        item['province'] = covertString(province)
        # if province == '--- ' or province == '---':
        #     item['province'] = None
        # else: item['province'] = province

        yield item



