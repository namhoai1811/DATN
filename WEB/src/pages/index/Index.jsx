import { memo, useCallback, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Header } from "../../components/Header";
import { Filter } from "./components/Filter";
import { Main } from "./components/Main";
import dataDe from "../../utils/data/data.json";
import { Select } from "../../components/Select";
import { TextField, Button } from "@mui/material";

import { getAllPost, getFindPost } from "../../store/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";

export const Index = memo(() => {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({
    title: "",
    price: 0,
    square: 0,
    direct: "",
    province: "",
  });
  const [title, setTitle] = useState("2");
  const [text, setText] = useState("");

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    handlePage(value);
  };

  const data = useSelector((state) => state.post.listItem);
  const totalPages = useSelector((state) => state.post.totalPages);
  // const pageNumber = useSelector((state) => state.post.pageNumber);

  // const pages = Array(totalPages);

  const handlePage = useCallback((value) => {
    // console.log(page);
    dispatch(
      getAllPost({
        page: value - 1,
        limit: 10,
      })
    );
  });

  const handleChangeDataFilter = useCallback((keyName, value) => {
    setDataFilter((state) => {
      return {
        ...state,
        [keyName]: value,
      };
    });
    console.log(dataFilter);
  });

  // const searchPost = useCallback(() => {
  //   alert(text);
  //   console.log("write code submit");
  //   console.log(text);
  //   dispatch(
  //     getFindPost({
  //       title: "Hà Nội",
  //       page: 0,
  //       limit: 10,
  //     })
  //   );
  // }, []);

  const searchPost = async () => {
    console.log("write code submit");
    console.log(dataFilter);
    dispatch(
      getFindPost({
        title: dataFilter.title,
        page: 0,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllPost({
        page: 0,
        limit: 10,
      })
    );
  }, []);

  return (
    <div className="index">
      <Header />
      <Filter
        dataFilter={dataFilter}
        handleChangeDataFilter={handleChangeDataFilter}
        handleSubmit={searchPost}
      />

      <div className="content">
        <Main data={data} />
      </div>
      <div className="foooter my-5">
        <nav aria-label="..." className="d-flex justify-content-center">
          <Stack spacing={2}>
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
          {/* <ul className="pagination">
            <li className="page-item">
              <button
                className={"page-link" + (pageNumber == 1 ? " disabled" : "")}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            </li>
            {pageNumber > 1 && (
              <li className="page-item">
                <button className="page-link" onClick={handleNavigatePage(1)}>
                  1
                </button>
              </li>
            )}

            {pageNumber > 2 && (
              <>
                {pageNumber > 3 && (
                  <li className="page-item">
                    <button className="page-link">...</button>
                  </li>
                )}
                <li className="page-item ">
                  <button
                    className="page-link"
                    onClick={handleNavigatePage(pageNumber - 1)}
                  >
                    {pageNumber - 1}
                  </button>
                </li>
              </>
            )}
            <li className="page-item active">
              <button
                className="page-link"
                onClick={handleNavigatePage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>

            {pageNumber < totalPages - 1 && (
              <>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handleNavigatePage(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
                {pageNumber < totalPages - 2 && (
                  <li className="page-item ">
                    <button className="page-link">...</button>
                  </li>
                )}
              </>
            )}

            {pageNumber < totalPages && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNavigatePage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            )}

            <li className="page-item">
              <button
                className={
                  "page-link" + (pageNumber == totalPages ? " disabled" : "")
                }
                onClick={handleNextPage}
              >
                Next
              </button>
            </li>
          </ul> */}
        </nav>
      </div>
    </div>
  );
});
