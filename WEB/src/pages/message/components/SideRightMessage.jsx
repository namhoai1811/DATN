import { memo } from "react";
import { IC_DOC, IC_MP3, IC_PDF, IC_PPTX, IC_XLS } from "../../../images";

export const SideRightMessage = memo(({ name, time }) => {
    return (
        <div className="side-right-message">
            <div className="header-side-right d-flex justify-content-center align-items-center">
                <div className="label">Thông tin hội thoại</div>
            </div>
            <div className="content-side-right d-flex align-items-center flex-column">
                <div className="avatar d-flex justify-content-center align-content-center mx-2 my-2">
                    M
                </div>
                <div className="label">Trần Bá Mạnh</div>
                <div className="status mb-4">Hoạt động 3h trước</div>
                <div className="storage-message">
                    <div
                        className="accordion"
                        id="accordionPanelsStayOpenExample"
                    >
                        {/* <div className="accordion-item">
                            <div
                                className="accordion-header"
                                id="id-headerImageVideo"
                            >
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseOne"
                                    aria-expanded="true"
                                    aria-controls="panelsStayOpen-collapseOne"
                                >
                                    <h6>Ảnh/Video</h6>
                                </button>
                            </div>
                            <div
                                id="panelsStayOpen-collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="id-headerImageVideo"
                            >
                                <div className="accordion-body">
                                    <img
                                        src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/5/13/photo-1652375164814-16523751651981801480136.jpg"
                                        alt=""
                                        className="image-video"
                                    />
                                    <img
                                        src="https://znews-photo.zingcdn.me/w660/Uploaded/qoswae/2022_11_04/jisoo_3_1.jpg"
                                        alt=""
                                        className="image-video"
                                    />
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="accordion-item">
                            <div
                                className="accordion-header"
                                id="id-headerfile"
                            >
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseTwo"
                                >
                                    <h6>File</h6>
                                </button>
                            </div>
                            <div
                                id="panelsStayOpen-collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="id-headerfile"
                            >
                                <div className="accordion-body">
                                    <div className="file d-flex">
                                        <img
                                            src={IC_DOC}
                                            alt="not-found"
                                            className="ic-type-file my-1 mx-2"
                                        />
                                        <div className="info-file d-flex flex-column justify-content-center">
                                            <div className="title-file">
                                                test.docx
                                            </div>
                                            <div className="size-file">
                                                {" "}
                                                150 kb
                                            </div>
                                        </div>
                                    </div>
                                    <div className="file d-flex">
                                        <img
                                            src={IC_XLS}
                                            alt="not-found"
                                            className="ic-type-file my-1 mx-2"
                                        />
                                        <div className="info-file d-flex flex-column justify-content-center">
                                            <div className="title-file">
                                                test.xls
                                            </div>
                                            <div className="size-file">
                                                {" "}
                                                150 kb
                                            </div>
                                        </div>
                                    </div>
                                    <div className="file d-flex">
                                        <img
                                            src={IC_PPTX}
                                            alt="not-found"
                                            className="ic-type-file my-1 mx-2"
                                        />
                                        <div className="info-file d-flex flex-column justify-content-center">
                                            <div className="title-file">
                                                test.pptx
                                            </div>
                                            <div className="size-file">
                                                {" "}
                                                150 kb
                                            </div>
                                        </div>
                                    </div>
                                    <div className="file d-flex">
                                        <img
                                            src={IC_PDF}
                                            alt="not-found"
                                            className="ic-type-file my-1 mx-2"
                                        />
                                        <div className="info-file d-flex flex-column justify-content-center">
                                            <div className="title-file">
                                                test.pdf
                                            </div>
                                            <div className="size-file">
                                                {" "}
                                                150 kb
                                            </div>
                                        </div>
                                    </div>
                                    <div className="file d-flex">
                                        <img
                                            src={IC_MP3}
                                            alt="not-found"
                                            className="ic-type-file my-1 mx-2"
                                        />
                                        <div className="info-file d-flex flex-column justify-content-center">
                                            <div className="title-file">
                                                test.mp3
                                            </div>
                                            <div className="size-file">
                                                {" "}
                                                150 kb
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
});
