import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Custom/CustomInput";
import Select from "react-select";
import axios from "axios";
import ImageUploader from "react-images-upload";

const Index = (props) => {
    const [category, setCategories] = useState([]);
    const [pictures, setPictures] = useState([]);

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
    }, []);

    const handleSubmit = () => {};

    return (
        <Layout>
            <Formik
                initialValues={{
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
                    name: Yup.string().required("Ürün Adı alanı zorunludur."),
                    modelCode: Yup.string().required(
                        "Model Kodu alanı zorunludur."
                    ),
                    barcode: Yup.string().required("Barkod alanı zorunludur."),
                    brand: Yup.string().required("Marka alanı zorunludur."),
                    stock: Yup.number()
                        .required("Stok alanı zorunludur.")
                        .positive()
                        .integer(),
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
                        <h3>Ürün Ekle</h3>
                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Ürün Adı"
                                    placeholder="Ürün Adı"
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
                                    placeholder="Kategori Seçiniz"
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
                                    title="Alış Fiyatı"
                                    placeholder="Alış Fiyatı"
                                    value={values.buyingPrice}
                                    handleBlur={handleBlur("buyingPrice")}
                                    handleChange={handleChange("buyingPrice")}
                                />
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="number"
                                    title="Satış Fiyatı"
                                    placeholder="Satış Fiyatı"
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
                                <label>Resim Ekle</label>
                                <ImageUploader
                                    fileTypeError="Desteklenmeyen format"
                                    fileSizeError="Dosya çok büyük"
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText="Resim Seç"
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
                                <CustomInput
                                    title="Açıklama"
                                    placeholder="Açıklama"
                                    value={values.description}
                                    handleBlur={handleBlur("description")}
                                    handleChange={handleChange("description")}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            className="w-100 btn btn-lg btn-primary mb-2"
                            type="submit"
                        >
                            Ürünü Ekle
                        </button>

                        {/* end items */}
                    </div>
                )}
            </Formik>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
