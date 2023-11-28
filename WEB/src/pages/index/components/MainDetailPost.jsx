import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IC_ADDRESS,
    IC_BEDROOM,
    IC_CONTACT,
    IC_DATE,
    IC_DESCRIPTION,
    IC_DIRECTION,
    IC_FLOOR,
    IC_JURIDICAL,
    IC_KITCHEN,
    IC_PARKING,
    IC_PRICE,
    IC_SIZE,
    IC_SQUARE,
} from "../../../images";
import { filterPrice } from "../../../service/filter";

export const MainDetailPost = memo(() => {
    const item = useSelector((state) => state.post.item);
    const images = useSelector((state) =>
        state.post.item.linkImage ? item.linkImage.split(",") : []
    );

    const [activeImage, setActiveImage] = useState(0);

    const handleNextImage = useCallback(() => {
        const length = images.length;
        if (activeImage < length - 1) {
            setActiveImage((prev) => prev + 1);
        }
    }, [activeImage, images]);

    const handlePreviousImage = useCallback(() => {
        if (activeImage > 1) {
            setActiveImage((prev) => prev - 1);
        }
    }, [activeImage]);

    return (
        <div className="main-detail-post d-flex flex-column">
            <h4 className="title">{item.title}</h4>
            <div className="d-flex info my-2">
                <div className=" flex-column left">
                    <div className="image-slide">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                {images.length > 0 &&
                                    Object.keys(images).map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                data-target="#carouselExampleIndicators"
                                                data-slide-to={item}
                                                className={
                                                    item == activeImage
                                                        ? "active"
                                                        : ""
                                                }
                                            ></li>
                                        );
                                    })}
                            </ol>
                            <div className="carousel-inner">
                                {images.length > 0 &&
                                    images.map((item, index) => (
                                        <div
                                            key={index}
                                            className={
                                                "carousel-item" +
                                                (activeImage == index
                                                    ? " active"
                                                    : "")
                                            }
                                        >
                                            <img
                                                className="d-block w-100 img-post"
                                                src={item}
                                                alt="Second slide"
                                            />
                                        </div>
                                    ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                data-slide="prev"
                                onClick={handlePreviousImage}
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                data-slide="next"
                                onClick={handleNextImage}
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="list-image d-flex justify-content-center">
                        {images.length > 0 &&
                            images.map(
                                (item, index) =>
                                    index > 0 && (
                                        <div
                                            className="item-image mx-2 my-2"
                                            key={index}
                                        >
                                            <img
                                                className="d-block w-100 img-post"
                                                src={item}
                                                alt="Second slide"
                                            />
                                        </div>
                                    )
                            )}
                    </div>
                    <a className="btn btn-primary" href={item.urlPage}>
                        News traceability
                    </a>
                </div>
                <div className="right">
                    <div className="top-info">
                        <div className="row my-3">
                            <div className="square col-4 font-weight-bold">
                                <img
                                    src={IC_SQUARE}
                                    alt="not-found"
                                    className="icon"
                                />
                                Square:{" "}
                                {item.square === "None" ? "__" : item.square}
                            </div>
                            <div className="size col-4 font-weight-bold">
                                <img
                                    src={IC_SIZE}
                                    alt="not-found"
                                    className="icon"
                                />
                                Size: {`${item.length}  x ${item.width}`}
                            </div>
                            <div className="price col-4 font-weight-bold">
                                <img
                                    src={IC_PRICE}
                                    alt="not-found"
                                    className="icon"
                                />
                                Price: {item.price}
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="direction col-6 font-weight-bold">
                                <img
                                    src={IC_DIRECTION}
                                    alt="not-found"
                                    className="icon"
                                />
                                Direction:{" "}
                                {item.direction === "None"
                                    ? "__"
                                    : " " + item.direction}
                            </div>
                            <div className="juridical col-6 font-weight-bold">
                                <img
                                    src={IC_JURIDICAL}
                                    alt="not-found"
                                    className="icon"
                                />
                                Juridical: {item.juridical}
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="address col-12 font-weight-bold">
                                <img
                                    src={IC_ADDRESS}
                                    alt="not-found"
                                    className="icon"
                                />
                                Address: {item.street} Street , {item.ward}{" "}
                                Ward, {item.district} District , {item.province}{" "}
                                City
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="bedroom col-3 font-weight-bold">
                                <img
                                    src={IC_BEDROOM}
                                    alt="not-found"
                                    className="icon"
                                />
                                {item.bedroom}
                            </div>
                            <div className="kitchen col-3 font-weight-bold">
                                <img
                                    src={IC_KITCHEN}
                                    alt="not-found"
                                    className="icon"
                                />
                                {" kitchen: " +
                                    (item.kitchen === ""
                                        ? "__"
                                        : item.kitchen == "có"
                                        ? "yes"
                                        : "no")}
                            </div>
                            <div className="parking col-3 font-weight-bold">
                                <img
                                    src={IC_PARKING}
                                    alt="not-found"
                                    className="icon"
                                />
                                {" parking: " +
                                    (item.bathroom === ""
                                        ? "__"
                                        : item.parking == "có"
                                        ? "yes"
                                        : "no")}
                            </div>
                            <div className="floor col-3 font-weight-bold">
                                <img
                                    src={IC_FLOOR}
                                    alt="not-found"
                                    className="icon"
                                />
                                {item.floor}
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="contact col-8 font-weight-bold">
                                <img
                                    src={IC_CONTACT}
                                    alt="not-found"
                                    className="icon"
                                />
                                {item.nameContact === ""
                                    ? " __"
                                    : " " + item.nameContact}{" "}
                                :
                                {item.phoneontact === ""
                                    ? " __"
                                    : " " + item.phoneContact}
                            </div>
                            <div className="date col-4 font-weight-bold">
                                <img
                                    src={IC_DATE}
                                    alt="not-found"
                                    className="icon"
                                />
                                Date: {item.date}
                            </div>
                        </div>
                    </div>

                    <div className="description  my-4">
                        <img
                            src={IC_DESCRIPTION}
                            alt="not-found"
                            className="icon"
                        />
                        <label className="font-weight-bold">Description:</label>{" "}
                        {item.description}
                    </div>
                </div>
            </div>
        </div>
    );
});
