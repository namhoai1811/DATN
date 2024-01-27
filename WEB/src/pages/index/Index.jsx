import { memo, useCallback, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Header } from "../../components/Header";
import { Filter } from "./components/Filter";
import { Main } from "./components/Main";
import dataDe from "../../utils/data/data.json";
import { Select } from "../../components/Select";
import { TextField } from "@mui/material";

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
  const [title, setTitle] = useState("");

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

  const handleSubmit = useCallback((event) => {
    // alert("aa");
    console.log("write code submit");
    console.log(title);
    dispatch(
      getFindPost({
        title: title,
        page: 0,
        limit: 10,
      })
    );
  }, []);

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
      {/* <Filter
        dataFilter={dataFilter}
        handleChangeDataFilter={handleChangeDataFilter}
        handleSubmit={handleSubmit}
      /> */}
      <div className="filter p-4">
        <div className="form row">
          <div className="search col-4 px-0">
            <input
              type="text"
              placeholder="enter for keyword search"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              autoFocus
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="row col-6">
            <div className="row my-1">
              <div className="col-4">
                <Select
                  defaultName="Price"
                  defaultValue={0}
                  listItems={dataDe.price}
                  changeSelect={handleChangeDataFilter}
                  keyName="price"
                />
              </div>
              <div className="col-4">
                <Select
                  defaultName="Square"
                  defaultValue={0}
                  listItems={dataDe.square}
                  changeSelect={handleChangeDataFilter}
                  keyName="square"
                />
              </div>
              <div className="col-4">
                <Select
                  defaultName="Direct"
                  defaultValue=""
                  listItems={dataDe.direct}
                  changeSelect={handleChangeDataFilter}
                  keyName="direct"
                />
              </div>
            </div>
            <div className="row my-1">
              <div className="col-4">
                <Select
                  defaultName="City/Province"
                  defaultValue=""
                  listItems={dataDe.province}
                  changeSelect={handleChangeDataFilter}
                  keyName="province"
                />
              </div>
              {/* <div className="col-4">
                                <Select
                                    defaultName="District"
                                    defaultValue=""
                                    listItems={data.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Ward"
                                    defaultValue=""
                                    listItems={data.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div> */}
            </div>
          </div>
          <button
            className="btn btn-primary btn-search col-2"
            onClick={handleSubmit}
          >
            <div>Search</div>
          </button>
        </div>
      </div>
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
