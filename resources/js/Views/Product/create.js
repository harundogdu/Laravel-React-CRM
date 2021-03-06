import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import Select from "react-select";
import axios from "axios";
import ImageUploader from "react-images-upload";
import CKEditor from "ckeditor4-react";
import swal from "sweetalert";

const Create = (props) => {
    const [category, setCategories] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [property, setProperty] = useState([]);

    useEffect(() => {
        axios
            .get("/api/product/create", {
                headers: {
                    Authorization:
                        "Bearer " + props.AuthStore.appState.user.access_token,
                },
            })
            .then((res) => {
                setCategories(res.data.categories);
            })
            .catch((err) => console.log(err));
    }, [pictures]);

    const handleSubmit = (values, { resetForm }) => {
        const data = new FormData();

        pictures.forEach((picture) => {
            data.append("file[]", picture);
        });

        data.append("categoryId", values.categoryId);
        data.append("name", values.name);
        data.append("modelCode", values.modelCode);
        data.append("brand", values.brand);
        data.append("barcode", values.barcode);
        data.append("buyingPrice", values.buyingPrice);
        data.append("sellingPrice", values.sellingPrice);
        data.append("tax", values.tax);
        data.append("stock", values.stock);
        data.append("description", values.description);
        data.append("property", JSON.stringify(property));

        const config = {
            headers: {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization:
                    "Bearer " + props.AuthStore.appState.user.access_token,
            },
        };
        axios
            .post("/api/product", data, config)
            .then((res) => {
                if (res.data.success) {
                    resetForm({});
                    setPictures([]);
                    setProperty([]);
                    swal(
                        "????lem Ba??ar??l??!",
                        "??r??n ba??ar??yla kaydedildi.",
                        "success"
                    ).then(() => {
                        props.history.push("/urunler");
                    });
                } else {
                    swal("????lem Ba??ar??s??z!", res.data.message, "error");
                }
            })
            .catch((e) => console.log(e));
    };

    const newProperty = () => {
        setProperty([...property, { property: "", value: "" }]);
    };

    const removeProperty = (index) => {
        const oldProperty = property;
        oldProperty.splice(index, 1);
        setProperty([...oldProperty]);
    };

    const changeTextInput = (event, index) => {
        property[index][event.target.name] = event.target.value;
        setProperty([...property]);
    };
    return (
        <Layout>
            <Formik
                initialValues={{
                    categoryId: "",
                    name: "",
                    modelCode: "",
                    brand: "",
                    barcode: "",
                    buyingPrice: "",
                    sellingPrice: "",
                    tax: "",
                    stock: "",
                    description: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("??r??n Ad?? alan?? zorunludur."),
                    modelCode: Yup.string().required(
                        "Model Kodu alan?? zorunludur."
                    ),
                    barcode: Yup.string().required("Barkod alan?? zorunludur."),
                    brand: Yup.string().required("Marka alan?? zorunludur."),
                    description: Yup.string(),
                    stock: Yup.number()
                        .required("Stok alan?? zorunludur.")
                        .positive()
                        .integer(),
                    buyingPrice: Yup.number().positive().integer(),
                    sellingPrice: Yup.number().positive().integer(),
                    tax: Yup.number().positive().integer(),
                })}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    isValid,
                }) => (
                    <div className="container mt-5">
                        <h3>??r??n Ekle</h3>
                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="??r??n Ad??"
                                    placeholder="??r??n Ad??"
                                    value={values.name}
                                    handleBlur={handleBlur("name")}
                                    handleChange={handleChange("name")}
                                />
                                {errors.name && touched.name && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Marka"
                                    placeholder="Marka"
                                    value={values.brand}
                                    handleBlur={handleBlur("brand")}
                                    handleChange={handleChange("brand")}
                                />
                                {errors.brand && touched.brand && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.brand}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-12">
                                <Select
                                    onChange={(e) =>
                                        setFieldValue("categoryId", e.id)
                                    }
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    placeholder="Kategori Se??iniz"
                                    options={category}
                                />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Model Kodu"
                                    placeholder="Model Kodu"
                                    value={values.modelCode}
                                    handleBlur={handleBlur("modelCode")}
                                    handleChange={handleChange("modelCode")}
                                />
                                {errors.modelCode && touched.modelCode && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.modelCode}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Barkod"
                                    placeholder="Barkod"
                                    value={values.barcode}
                                    handleBlur={handleBlur("barcode")}
                                    handleChange={handleChange("barcode")}
                                />
                                {errors.barcode && touched.barcode && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.barcode}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title="Al???? Fiyat??"
                                    placeholder="Al???? Fiyat??"
                                    value={values.buyingPrice}
                                    handleBlur={handleBlur("buyingPrice")}
                                    handleChange={handleChange("buyingPrice")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title="Sat???? Fiyat??"
                                    placeholder="Sat???? Fiyat??"
                                    value={values.sellingPrice}
                                    handleBlur={handleBlur("sellingPrice")}
                                    handleChange={handleChange("sellingPrice")}
                                />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title="KDV"
                                    placeholder="KDV"
                                    value={values.tax}
                                    handleBlur={handleBlur("tax")}
                                    handleChange={handleChange("tax")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title="Stok"
                                    placeholder="Stok"
                                    value={values.stock}
                                    handleBlur={handleBlur("stock")}
                                    handleChange={handleChange("stock")}
                                />
                                {errors.stock && touched.stock && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.stock}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-12">
                                <label>??r??n Foto??raf??</label>
                                <ImageUploader
                                    fileTypeError="Desteklenmeyen format"
                                    fileSizeError="Dosya ??ok b??y??k"
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText="Resim Se??"
                                    onChange={(pictureFiles) => {
                                        setPictures(pictureFiles);
                                    }}
                                    imgExtension={[
                                        ".jpg",
                                        ".gif",
                                        ".png",
                                        ".gif",
                                    ]}
                                    maxFileSize={5242880}
                                />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-12">
                                <label>??r??n A????klamas??</label>
                                <CKEditor
                                    data={values.description}
                                    onChange={(evt) => {
                                        const data = evt.editor.getData();
                                        setFieldValue("description", data);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row my-3">
                            <div className="col-md-12">
                                <button
                                    onClick={newProperty}
                                    className="btn btn-dark w-5"
                                >
                                    Yeni ??zellik Ekle
                                </button>

                                {/* items */}

                                {property.map((item, index) => (
                                    <div key={index} className="row my-3">
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="??zellik ismi"
                                                name="property"
                                                value={item.property}
                                                onChange={(event) =>
                                                    changeTextInput(
                                                        event,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="??zellik De??eri"
                                                name="value"
                                                value={item.value}
                                                onChange={(event) =>
                                                    changeTextInput(
                                                        event,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <button
                                                onClick={() =>
                                                    removeProperty(index)
                                                }
                                                className="btn btn-dark"
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* items end */}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            className="w-100 btn btn-primary mb-2"
                            type="submit"
                        >
                            ??r??n?? Ekle
                        </button>

                        {/* end items */}
                    </div>
                )}
            </Formik>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Create));
