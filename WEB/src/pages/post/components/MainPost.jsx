import { memo, useCallback, useState } from "react";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import { TextArea } from "../../../components/TextArea";
import { storage } from "../../../firebase";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import data from "../../../utils/data/data.json";

export const MainPost = memo(() => {
    const listItems = [
        {
            value: "",
        },
    ];
    const [postInfo, setPostInfo] = useState({
        title: "",
        square: 0,
        width: 0,
        length: 0,
        direct: "",
        price: 0,
        juridical: "",
        province: "",
        ward: "",
        district: "",
        province: "",
        bedroom: 0,
        kitchen: 0,
        bathroom: 0,
        floor: 0,
        description: "",
        images: [],
    });
    const [images, setImages] = useState(null);
    const [addressDisable, setAddressDisable] = useState({
        district: false,
        ward: false,
        street: false,
    });

    const changePostInfo = useCallback(
        (keyName, val) => {
            setPostInfo((prev) => {
                return {
                    ...prev,
                    [keyName]: val,
                };
            });
        },
        [postInfo]
    );

    const uploadFile = async () => {
        if (images.length == 0) return;
        let urls = [];
        const temp = Object.values(images);
        for await (const item of temp) {
            let imageRef = ref(storage, `images/${item.name}`);
            const url = await uploadBytes(imageRef, item).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            });
            urls.push(url);
        }
        changePostInfo("images", [...postInfo.images, ...urls]);
        setImages([]);
    };

    const chooseFile = (event) => {
        setImages(event.target.files);
    };

    const deleteAllFile = () => {
        if (postInfo.images.length == 0) return;
        postInfo.images.forEach((item) => {
            deleteObject(ref(storage, item))
                .then(() => {
                    console.log("delete success");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        changePostInfo("images", []);
    };

    const changeAddressDisable = useCallback(
        (keyName, val) => {
            setAddressDisable((prev) => {
                return {
                    ...prev,
                    [keyName]: val,
                };
            });
        },
        [addressDisable]
    );

    return (
        <div className="main-post">
            <div className="left-post">
                <label className="text-uppercase">real estate posting</label>
                <div className="form-group">
                    <TextArea
                        type="text"
                        placeholder="Enter title ..."
                        id="id-title"
                        label="Title"
                        changeTextArea={changePostInfo}
                        keyName="title"
                        rows="4"
                        val={postInfo.title}
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>
                        Address <span className="require">*</span>
                    </label>
                    <div className="row">
                        <div className="form-group col-3">
                            <Select
                                defaultValue=""
                                defaultName="City/Province"
                                listItems={listItems}
                                changeSelect={changePostInfo}
                                keyName="province"
                            />
                        </div>
                        <div className="form-group col-3">
                            <Select
                                defaultValue=""
                                defaultName="District"
                                listItems={listItems}
                                changeSelect={changePostInfo}
                                keyName="district"
                                disable={addressDisable.district}
                            />
                        </div>
                        <div className="form-group col-3">
                            <Select
                                defaultValue=""
                                defaultName="Ward"
                                listItems={listItems}
                                changeSelect={changePostInfo}
                                keyName="ward"
                                disable={addressDisable.ward}
                            />
                        </div>
                        <div className="form-group col-3">
                            <Select
                                defaultValue=""
                                defaultName="Street"
                                listItems={listItems}
                                changeSelect={changePostInfo}
                                keyName="street"
                                disable={addressDisable.street}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number price"
                            id="id-price"
                            label="Price (VNĐ)"
                            val={postInfo.price}
                            changeInput={changePostInfo}
                            keyName="price"
                            min="0"
                            required={true}
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number square"
                            id="id-square"
                            label="Square (m2)"
                            val={postInfo.square}
                            changeInput={changePostInfo}
                            keyName="square"
                            min="0"
                            required={true}
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number length"
                            id="id-length"
                            label="Length (m)"
                            val={postInfo.length}
                            changeInput={changePostInfo}
                            keyName="length"
                            min="0"
                            required={true}
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number width"
                            id="id-width"
                            label="Width (m)"
                            val={postInfo.width}
                            changeInput={changePostInfo}
                            keyName="width"
                            min="0"
                            required={true}
                        />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number bedroom"
                            id="id-bedroom"
                            label="Bedroom (room)"
                            val={postInfo.bedroom}
                            changeInput={changePostInfo}
                            keyName="bedroom"
                            min="0"
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number kitchen"
                            id="id-kitchen"
                            label="Kitchen (room)"
                            val={postInfo.kitchen}
                            changeInput={changePostInfo}
                            keyName="kitchen"
                            min="0"
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            placeholder="Enter number floor"
                            id="id-floor"
                            label="Floor"
                            val={postInfo.floor}
                            changeInput={changePostInfo}
                            keyName="floor"
                            min="1"
                        />
                    </div>
                    <div className="form-group col-3">
                        <Input
                            type="number"
                            id="id-parking"
                            label="Parking"
                            val={postInfo.parking}
                            changeInput={changePostInfo}
                            keyName="parking"
                            min="1"
                        />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="form-group col-3">
                        <label>Juridical</label>
                        <Select
                            defaultValue=""
                            defaultName="All"
                            listItems={data.juridical}
                            changeSelect={changePostInfo}
                            keyName="juridical"
                        />
                    </div>
                    <div className="form-group col-3">
                        <label>Direction</label>
                        <Select
                            defaultValue=""
                            defaultName="All"
                            listItems={data.direct}
                            changeSelect={changePostInfo}
                            keyName="direct"
                        />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="form-group">
                        <TextArea
                            type="text"
                            placeholder="Enter description ..."
                            id="id-description"
                            label="Description"
                            changeTextArea={changePostInfo}
                            keyName="description"
                            rows="4"
                            val={postInfo.description}
                        />
                    </div>
                </div>
                <hr />
                <br />
                <button className="btn btn-primary">Post</button>
            </div>
            <div className="right-post">
                <div className="form-group">
                    <label htmlFor="id-images">Image attached</label>
                    <input
                        type="file"
                        id="id-images"
                        onChange={chooseFile}
                        className="form-control"
                        multiple
                    />
                    {postInfo.length > 0 &&
                        postInfo.images.map((item, key) => (
                            <img
                                src={item}
                                alt="not-found"
                                key={key}
                                className="image-post m-2"
                            />
                        ))}
                </div>
                <button className="btn btn-primary mt-4" onClick={uploadFile}>
                    Upload
                </button>
                <button className="btn btn-danger mt-4" onClick={deleteAllFile}>
                    Delete
                </button>
            </div>
        </div>
    );
});
