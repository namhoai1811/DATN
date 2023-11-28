import { memo, useEffect } from "react";
import { Header } from "../../components/Header";
import { SuggestPost } from "../../components/SuggestPost";
import { MainDetailPost } from "./components/MainDetailPost";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListRecommendation, getPost } from "../../store/slice/postSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const DetailPost = memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(id))
            .then(unwrapResult)
            .then((res) => {
                dispatch(getListRecommendation(res.data));
            });
    }, []);

    return (
        <div className="detail-post">
            <Header />
            <div className="main-detail">
                <SuggestPost />
                <MainDetailPost />
            </div>
        </div>
    );
});
