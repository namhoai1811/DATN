package com.datn.api.dto;
@lombok.Getter
@lombok.Setter
@lombok.ToString
public class SearchDto {
    private String title;
    private int limit;
    private int page;
}