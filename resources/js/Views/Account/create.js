import { inject, observer } from "mobx-react";
import Layout from "../../Components/Layout/front.layout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Components/Form/CustomInput";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import CKEditor from "ckeditor4-react";

const Create = (props) => {
    const handleSubmit = (values, { resetForm, setSubmitting }) => { 
        const config = {
            headers: {
                Authorization:
                    "Bearer " + props.AuthStore.appState.user.access_token,
            },
        };
        axios
            .post("/api/account", { ...values }, config)
            .then((res) => {
                if (res.data.success) {
                    resetForm({});
                    swal(
                        "İşlem Başarılı!",
                        "Kategori başarıyla kaydedildi.",
                        "success"
                    ).then(() => {
                        props.history.push("/hesaplar");
                    });
                } else {
                    swal("İşlem Başarısız!", res.data.message, "error");
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <Layout>
            <Formik
                initialValues={{
                    name: "",
                    accountType: "",
                    phone: "",
                    email: "",
                    address: "",
                    note: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("Hesap Adı alanı zorunludur."),
                    accountType: Yup.string().required(
                        "Hesap Türü alanı zorunludur."
                    ),
                    phone: Yup.string().required(
                        "Telefon Numarası alanı zorunludur."
                    ),
                    email: Yup.string()
                        .email()
                        .required("E-mail alanı zorunludur."),
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
                        <h3>Hesap Ekle</h3>
                        <div className="row my-3">
                            <div className="col-md-12">
                                <Select
                                    onChange={(e) =>
                                        setFieldValue("accountType", e.id)
                                    }
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    placeholder="Hesap Türü Seçiniz"
                                    options={[
                                        { id: 0, name: "Tedarikçi" },
                                        { id: 1, name: "Müşteri" },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Hesap Adı"
                                    placeholder="Hesap Adı"
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
                                    title="Telefon Numarası"
                                    placeholder="Telefon Numarası"
                                    value={values.phone}
                                    handleBlur={handleBlur("phone")}
                                    handleChange={handleChange("phone")}
                                />
                                {errors.phone && touched.phone && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                        </div>{" "}
                        <div className="row my-3">
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="E Posta Adresi"
                                    placeholder="E Posta Adresi"
                                    value={values.email}
                                    handleBlur={handleBlur("email")}
                                    handleChange={handleChange("email")}
                                />
                                {errors.email && touched.email && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <CustomInput
                                    type="text"
                                    title="Adres"
                                    placeholder="Adres"
                                    value={values.address}
                                    handleBlur={handleBlur("address")}
                                    handleChange={handleChange("address")}
                                />
                                {errors.address && touched.address && (
                                    <div
                                        id="passwordHelpBlock"
                                        className="form-text my-2 text-left text-danger"
                                    >
                                        {errors.address}
                                    </div>
                                )}
                            </div>
                        </div>{" "}
                        <div className="row my-3">
                            <div className="col-md-12">
                                <label>Hesap Notu</label>
                                <CKEditor
                                    data={values.note}
                                    onChange={(evt) => {
                                        const data = evt.editor.getData();
                                        setFieldValue("note", data);
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            className="w-100 btn btn-primary mb-2"
                            type="submit"
                        >
                            Hesap Ekle
                        </button>
                        {/* end items */}
                    </div>
                )}
            </Formik>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Create));
