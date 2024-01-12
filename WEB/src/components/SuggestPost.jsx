import { memo, useCallback, useEffect, useState } from "react";
import { Carousel, Card, Stack, Button } from "react-bootstrap";
import { filterPrice } from "../service/filter";
import { getAllPost } from "../store/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
export const SuggestPost = memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllPost({
        page: 1,
        limit: 10,
      })
    );
  }, []);
  const reviews = useSelector((state) => state.post.listItem);
//   const reviews = useSelector((state) => state.post.listItem);
  console.log(reviews);

  return (
    <div className="suggest-post">
      <h6>Maybe you are interested</h6>
      <div className="suggest-post1 bg-opacity-25 container-fluid">
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
                      src={review.link_image.split(",")[0]}
                    />
                    <a
                      href={review.url_page}
                      className="title-suggest truncate"
                    >
                      {review.title.substring(0, 60) + "..."}
                    </a>
                    <Card.Text>
                      {review.price} - {review.square}
                    </Card.Text>
                    <Card.Text>
                      {`${
                        review.ward == "None" ? "" : review.ward + " Ward, "
                      } ${
                        review.district == "None"
                          ? ""
                          : review.district + " District, "
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
