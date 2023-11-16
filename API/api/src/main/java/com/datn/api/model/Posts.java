package com.datn.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.annotation.Reference;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document("posts")
@AllArgsConstructor
@Getter
@Setter
public class Posts {

    @Id
    private String id;
//    0: ban 1 :thue

    private String type;

    private String  userId;

//    query
    private  String title;
    private  String description;
    private  String price;
    private  String imageUrl;
    private String url;
    private  String address;
    private  String acreage;
    private  String direction;
    private  String date;
    private  String nameContact;
    private  String phoneContact;
    private  String bedRoom;
    private  String bathRoom;
    public Posts(){

    }
}
