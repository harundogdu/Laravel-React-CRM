import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import axios from "axios";
import swal from "sweetalert";

const Create = (props) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/category/${props.match.params.id}/edit`, {
                headers: {
                    Authorization:
                        "Bearer " + props.AuthStore.appState.user.access_token,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    setCategory(res.data.category);
                    setLoading(false);
                } else {
                    swal(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("_method", "put");

        const config = {
            headers: {
                Accept: "application/json",
                "content-type": "multipart/form-data",
                Authorization:
                    "Bearer " + props.AuthStore.appState.user.access_token,
            },
        };
        axios
            .post(`/api/category/${props.match.params.id}`, data, config)
            .then((res) => {               
                if (res.data.success) {
                    swal(
                        "İşlem Başarılı!",
                        "Kategori başarıyla kaydedildi.",
                        "success"
                    ).then(() => {
                        resetForm({});
                        props.history.push("/kategoriler");
                    });
                } else {
                    swal("İşlem Başarısız!", res.data.message, "error");
                }
            })
            .catch((e) => console.log(e));
    };
    if (loading) return <div>Yükleniyor</div>;
    return (
        <Layout>
            <Formik
                initialValues={{
                    name: category.name,
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required(
                        "Kategori Adı alanı zorunludur."
                    ),
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
                        <h3>Kategori Güncelle</h3>
                        <div className="row my-3">
                            <div className="col-md-12">
                                <CustomInput
                                    type="text"
                                    title="Kategori Adı"
                                    placeholder="Kategori Adı"
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
                        </div>{" "}
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

export default inject("AuthStore")(observer(Create));
