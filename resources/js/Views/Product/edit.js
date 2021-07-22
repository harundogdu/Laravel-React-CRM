import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import Select from "react-select";
import axios from "axios";
import ImageUploader from "react-images-upload";
import CKEditor from "ckeditor4-react";
import swal from "sweetalert";
import { difference } from "lodash";

const Edit = (props) => {
    const [loading, setLoading] = useState(true);
    const [category, setCategories] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [property, setProperty] = useState([]);
    const [product, setProduct] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/product/${props.match.params.id}/edit`, {
                headers: {
                    Authorization:
                        "Bearer " + props.AuthStore.appState.user.access_token,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    setCategories(res.data.categories);
                    setProduct(res.data.product);
                    setPictures(res.data.product.images);
                    setProperty(res.data.product.property);
                    res.data.product.images
                        .filter((x) => !x.isRemove)
                        .map((item) => {
                            defaultImages.push(item.path);
                        });
                    setLoading(false);
                } else {
                    swal(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (values, { resetForm,setSubmitting }) => {
        const data = new FormData();

        newImages.forEach((picture) => {
            if (typeof picture.id != "number") {
                data.append("newFile[]", picture);
            }
        });
        data.append("file", JSON.stringify(pictures));
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
        data.append('_method','put');

        const config = {
            headers: {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization:
                    "Bearer " + props.AuthStore.appState.user.access_token,
            },
        };
        axios
            .post(`/api/product/${product.id}`, data, config)
            .then((res) => {
                if (res.data.success) {
                    setSubmitting(false);
                    swal('İşlem Başarılı',res.data.message,'success').then(()=>{
                        props.history.push('/urunler');
                    });
                    
                } else {
                    swal(res.data.message);
                    setSubmitting(false);
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

    const onChange = (picturesImage, allPictures) => {
        if (picturesImage.length > 0) {
            setNewImages(newImages.concat(picturesImage));
        }
        const diffrence = defaultImages.filter((x) => !allPictures.includes(x));
        diffrence.map((item) => {
            const findIndex = defaultImages.findIndex(
                (picture) => picture == item
            );
            if (findIndex != -1) {
                const findIndexImage = pictures.findIndex(
                    (image) => image.path == item
                );
                pictures[findIndexImage]["isRemove"] = true;
                setPictures([...pictures]);
            }
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            <Formik
                initialValues={{
                    categoryId: product.categoryId,
                    name: product.name,
                    modelCode: product.modelCode,
                    brand: product.brand,
                    barcode: product.barcode,
                    buyingPrice: product.buyingPrice,
                    sellingPrice: product.sellingPrice,
                    tax: product.tax,
                    stock: product.stock,
                    description: product.description,
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("Ürün Adı alanı zorunludur."),
                    modelCode: Yup.string().required(
                        "Model Kodu alanı zorunludur."
                    ),
                    barcode: Yup.string().required("Barkod alanı zorunludur."),
                    brand: Yup.string().required("Marka alanı zorunludur."),
                    description: Yup.string(),
                    stock: Yup.number()
                        .required("Stok alanı zorunludur.")
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
                        <h3>Ürün Güncelle</h3>
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
                                    value={category.find(
                                        (item) => item.id === values.categoryId
                                    )}
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
                                <label>Ürün Fotoğrafı</label>
                                <ImageUploader
                                    defaultImages={defaultImages}
                                    withPreview={true}
                                    fileTypeError="Desteklenmeyen format"
                                    fileSizeError="Dosya çok büyük"
                                    withIcon={true}
                                    buttonText="Resim Seç"
                                    onChange={(pictureFiles, allPictures) =>
                                        onChange(pictureFiles, allPictures)
                                    }
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
                                <label>Ürün Açıklaması</label>
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
                                    Yeni Özellik Ekle
                                </button>

                                {/* items */}

                                {property.map((item, index) => (
                                    <div key={index} className="row my-3">
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Özellik ismi"
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
                                                placeholder="Özellik Değeri"
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
                            className="w-100 btn btn-info mb-2"
                            type="submit"
                        >
                            Ürünü Güncelle
                        </button>

                        {/* end items */}
                    </div>
                )}
            </Formik>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Edit));
