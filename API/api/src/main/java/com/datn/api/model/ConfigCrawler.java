package com.datn.api.model;

import com.datn.api.facade.ProductFaceImpl;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("configCrawler")
public class ConfigCrawler {
    @Id
    private String id;
    private String titlePage;
    private String urlPage;
    private  String namePage;
    private  boolean modeSchedule;
    private  boolean modePublic;
    private  boolean modeCookies;
    private  boolean modeRobotsParser;
    private  int timeOutCrawl;
    private  int timeRetryCrawl;
    private  int timeDelayCrawl;
    private  String cookies;
    private  String userAgent;
    private  String httpHeader;
//  Querry
    private  int numberPageQuery;
    private  String titleQuery;

    private  String descriptionQuery;
    private  String imageUrlQuery;
    private  String priceQuery;
    private  String addressQuery;
    private  String acreageQuery;
    private  String directionQuery;
    private  String dateQuery;
    private  String nameContactQuery;
    private  String phoneContactQuery;
    private  String bedRoomQuery;
    private  String bathRoomQuery;
    private String urlQuery;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrlQuery() {
        return urlQuery;
    }

    public void setUrlQuery(String urlQuery) {
        this.urlQuery = urlQuery;
    }

    public String getTitlePage() {
        return titlePage;
    }

    public void setTitlePage(String titlePage) {
        this.titlePage = titlePage;
    }

    public String getUrlPage() {
        return urlPage;
    }

    public void setUrlPage(String urlPage) {
        this.urlPage = urlPage;
    }

    public String getNamePage() {
        return namePage;
    }

    public void setNamePage(String namePage) {
        this.namePage = namePage;
    }

    public boolean isModeSchedule() {
        return modeSchedule;
    }

    public void setModeSchedule(boolean modeSchedule) {
        this.modeSchedule = modeSchedule;
    }

    public boolean isModePublic() {
        return modePublic;
    }

    public void setModePublic(boolean modePublic) {
        this.modePublic = modePublic;
    }

    public boolean isModeCookies() {
        return modeCookies;
    }

    public void setModeCookies(boolean modeCookies) {
        this.modeCookies = modeCookies;
    }

    public boolean isModeRobotsParser() {
        return modeRobotsParser;
    }

    public void setModeRobotsParser(boolean modeRobotsParser) {
        this.modeRobotsParser = modeRobotsParser;
    }

    public int getTimeOutCrawl() {
        return timeOutCrawl;
    }

    public void setTimeOutCrawl(int timeOutCrawl) {
        this.timeOutCrawl = timeOutCrawl;
    }

    public int getTimeRetryCrawl() {
        return timeRetryCrawl;
    }

    public void setTimeRetryCrawl(int timeRetryCrawl) {
        this.timeRetryCrawl = timeRetryCrawl;
    }

    public int getTimeDelayCrawl() {
        return timeDelayCrawl;
    }

    public void setTimeDelayCrawl(int timeDelayCrawl) {
        this.timeDelayCrawl = timeDelayCrawl;
    }

    public String getCookies() {
        return cookies;
    }

    public void setCookies(String cookies) {
        this.cookies = cookies;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getHttpHeader() {
        return httpHeader;
    }

    public void setHttpHeader(String httpHeader) {
        this.httpHeader = httpHeader;
    }

    public int getNumberPageQuery() {
        return numberPageQuery;
    }

    public void setNumberPageQuery(int numberPageQuery) {
        this.numberPageQuery = numberPageQuery;
    }

    public String getTitleQuery() {
        return titleQuery;
    }

    public void setTitleQuery(String titleQuery) {
        this.titleQuery = titleQuery;
    }

    public String getDescriptionQuery() {
        return descriptionQuery;
    }

    public void setDescriptionQuery(String descriptionQuery) {
        this.descriptionQuery = descriptionQuery;
    }

    public String getImageUrlQuery() {
        return imageUrlQuery;
    }

    public void setImageUrlQuery(String imageUrlQuery) {
        this.imageUrlQuery = imageUrlQuery;
    }

    public String getPriceQuery() {
        return priceQuery;
    }

    public void setPriceQuery(String priceQuery) {
        this.priceQuery = priceQuery;
    }

    public String getAddressQuery() {
        return addressQuery;
    }

    public void setAddressQuery(String addressQuery) {
        this.addressQuery = addressQuery;
    }

    public String getAcreageQuery() {
        return acreageQuery;
    }

    public void setAcreageQuery(String acreageQuery) {
        this.acreageQuery = acreageQuery;
    }

    public String getDirectionQuery() {
        return directionQuery;
    }

    public void setDirectionQuery(String directionQuery) {
        this.directionQuery = directionQuery;
    }

    public String getDateQuery() {
        return dateQuery;
    }

    public void setDateQuery(String dateQuery) {
        this.dateQuery = dateQuery;
    }

    public String getNameContactQuery() {
        return nameContactQuery;
    }

    public void setNameContactQuery(String nameContactQuery) {
        this.nameContactQuery = nameContactQuery;
    }

    public String getPhoneContactQuery() {
        return phoneContactQuery;
    }

    public void setPhoneContactQuery(String phoneContactQuery) {
        this.phoneContactQuery = phoneContactQuery;
    }

    public String getBedRoomQuery() {
        return bedRoomQuery;
    }

    public void setBedRoomQuery(String bedRoomQuery) {
        this.bedRoomQuery = bedRoomQuery;
    }

    public String getBathRoomQuery() {
        return bathRoomQuery;
    }

    public void setBathRoomQuery(String bathRoomQuery) {
        this.bathRoomQuery = bathRoomQuery;
    }
    public ConfigCrawler(){}
    public ConfigCrawler(String titlePage, String urlPage, String namePage, boolean modeSchedule, boolean modePublic, boolean modeCookies, boolean modeRobotsParser, int timeOutCrawl, int timeRetryCrawl, int timeDelayCrawl, String cookies, String userAgent, String httpHeader, int numberPageQuery, String titleQuery, String descriptionQuery, String imageUrlQuery, String priceQuery, String addressQuery, String acreageQuery, String directionQuery, String dateQuery, String nameContactQuery, String phoneContactQuery, String bedRoomQuery, String bathRoomQuery) {
        this.titlePage = titlePage;
        this.urlPage = urlPage;
        this.namePage = namePage;
        this.modeSchedule = modeSchedule;
        this.modePublic = modePublic;
        this.modeCookies = modeCookies;
        this.modeRobotsParser = modeRobotsParser;
        this.timeOutCrawl = timeOutCrawl;
        this.timeRetryCrawl = timeRetryCrawl;
        this.timeDelayCrawl = timeDelayCrawl;
        this.cookies = cookies;
        this.userAgent = userAgent;
        this.httpHeader = httpHeader;
        this.numberPageQuery = numberPageQuery;
        this.titleQuery = titleQuery;
        this.descriptionQuery = descriptionQuery;
        this.imageUrlQuery = imageUrlQuery;
        this.priceQuery = priceQuery;
        this.addressQuery = addressQuery;
        this.acreageQuery = acreageQuery;
        this.directionQuery = directionQuery;
        this.dateQuery = dateQuery;
        this.nameContactQuery = nameContactQuery;
        this.phoneContactQuery = phoneContactQuery;
        this.bedRoomQuery = bedRoomQuery;
        this.bathRoomQuery = bathRoomQuery;
        this.urlQuery = urlQuery;
    }
}
