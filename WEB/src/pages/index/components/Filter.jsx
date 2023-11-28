import { memo } from "react";
import data from "../../../utils/data/data.json";
import { Select } from "../../../components/Select";

export const Filter = memo(
    ({ handleSubmit, handleChangeDataFilter, dataFilter }) => {
        return (
            <div className="filter p-4">
                <form className="form row" onSubmit={handleSubmit}>
                    <div className="search col-4 px-0">
                        <input
                            type="text"
                            placeholder="enter for keyword search"
                            className="form-control"
                            value={dataFilter["title"]}
                            onChange={(event) =>
                                handleChangeDataFilter(
                                    "title",
                                    event.target.value
                                )
                            }
                        />
                    </div>
                    <div className="row col-6">
                        <div className="row my-1">
                            <div className="col-4">
                                <Select
                                    defaultName="Price"
                                    defaultValue={0}
                                    listItems={data.price}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="price"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Square"
                                    defaultValue={0}
                                    listItems={data.square}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="square"
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    defaultName="Direct"
                                    defaultValue=""
                                    listItems={data.direct}
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
                                    listItems={data.province}
                                    changeSelect={handleChangeDataFilter}
                                    keyName="province"
                                />
                            </div>
                            <div className="col-4">
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
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-search col-2"
                        type="submit"
                    >
                        <div>Search</div>
                    </button>
                </form>
            </div>
        );
    }
);
