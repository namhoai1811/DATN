import { memo, useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Filter } from "./components/Filter";
import { Main } from "./components/Main";
import { getAllPost } from "../../store/slice/postSlice";
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

    const data = useSelector((state) => state.post.listItem);
    const totalPages = useSelector((state) => state.post.totalPages);
    const pageNumber = useSelector((state) => state.post.pageNumber);

    const pages = Array(totalPages);

    const handleChangeDataFilter = useCallback(
        (keyName, value) => {
            setDataFilter((state) => {
                return {
                    ...state,
                    [keyName]: value,
                };
            });
        },
        [dataFilter.keyName]
    );

    const handleSubmit = useCallback(
        (event) => {
            console.log("write code submit");
        },
        [dataFilter]
    );

    const handleNextPage = useCallback(() => {
        if (pageNumber < totalPages) {
            dispatch(
                getAllPost({
                    page: pageNumber + 1,
                    limit: 10,
                })
            );
        }
    }, [pageNumber]);

    const handlePreviousPage = useCallback(() => {
        if (pageNumber > 1) {
            dispatch(
                getAllPost({
                    page: pageNumber - 1,
                    limit: 10,
                })
            );
        }
    }, [pageNumber]);

    const handleNavigatePage = useCallback(
        (page) => {
            return () => {
                dispatch(
                    getAllPost({
                        page: page,
                        limit: 10,
                    })
                );
            };
        },
        [pageNumber]
    );

    useEffect(() => {
        dispatch(
            getAllPost({
                page: 1,
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
                handleSubmit={handleSubmit}
            />
            <div className="content">
                <Main data={data} />
            </div>
            <div className="foooter my-5">
                <nav aria-label="..." className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className={
                                    "page-link" +
                                    (pageNumber == 1 ? " disabled" : "")
                                }
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </button>
                        </li>
                        {pageNumber > 1 && (
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    onClick={handleNavigatePage(1)}
                                >
                                    1
                                </button>
                            </li>
                        )}

                        {pageNumber > 2 && (
                            <>
                                {pageNumber > 3 && (
                                    <li className="page-item">
                                        <button className="page-link">
                                            ...
                                        </button>
                                    </li>
                                )}
                                <li className="page-item ">
                                    <button
                                        className="page-link"
                                        onClick={handleNavigatePage(
                                            pageNumber - 1
                                        )}
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
                                        onClick={handleNavigatePage(
                                            pageNumber + 1
                                        )}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                                {pageNumber < totalPages - 2 && (
                                    <li className="page-item ">
                                        <button className="page-link">
                                            ...
                                        </button>
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
                                    "page-link" +
                                    (pageNumber == totalPages
                                        ? " disabled"
                                        : "")
                                }
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
});
