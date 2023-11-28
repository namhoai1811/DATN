import { memo } from "react";
import { Carousel, Card, Stack, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { filterPrice } from "../service/filter";

export const SuggestPost = memo(() => {
    const reviews = useSelector((state) => state.post.listRecommendation);

    return (
        <div className="suggest-post">
            <h6>Maybe you are interested</h6>
            <div className="bg-dark bg-opacity-25 container-fluid">
                <Carousel style={{ height: 400 }}>
                    {reviews.map((review, index) => (
                        <Carousel.Item style={{ height: 400 }} key={index}>
                            <Stack
                                direction="horizontal"
                                className="h-100 justify-content-center align-items-center"
                                gap={4}
                            >
                                <Card
                                    style={{
                                        height: 350,
                                        width: "25%",
                                        fontSize: "16px",
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Img
                                            variant="top"
                                            src={
                                                review.link_image.split(",")[0]
                                            }
                                        />
                                        <a
                                            href={review.url_page}
                                            className="title-suggest truncate"
                                        >
                                            {review.title.substring(0, 60) +
                                                "..."}
                                        </a>
                                        <Card.Text>
                                            {filterPrice(review.price)} -{" "}
                                            {review.square}
                                        </Card.Text>
                                        <Card.Text>
                                            {`${
                                                review.ward == "None"
                                                    ? ""
                                                    : review.ward + " Ward, "
                                            } ${
                                                review.district == "None"
                                                    ? ""
                                                    : review.district +
                                                      " District, "
                                            }  ${
                                                review.province == "None"
                                                    ? ""
                                                    : review.province + " City"
                                            }`}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Stack>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
});
