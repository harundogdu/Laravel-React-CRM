import React, { useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import Layout from "../../Components/Layout/front.layout";
import DataTable from "react-data-table-component";
import { useState } from "react";
import SubHeaderComponent from "../../Components/Form/SubHeaderComponent";
import ExpandableComponent from "../../Components/Form/ExpandableComponent";
import swal from "sweetalert";

const Index = (props) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        filteredData: [],
        text: "",
        isFilter: false,
    });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios
            .get("api/product", {
                headers: {
                    Authorization:
                        "Bearer " + props.AuthStore.appState.user.access_token,
                },
            })
            .then((response) => {
                setData(response.data.data.product);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [refresh]);

    const filterItems = (event) => {
        const filterText = event.target.value;
        if (filterText != "") {
            const filteredItems = data.filter(
                (item) =>
                    (item.name &&
                        item.name
                            .toLowerCase()
                            .includes(filterText.toLowerCase())) ||
                    (item.modelCode &&
                        item.modelCode
                            .toLowerCase()
                            .includes(filterText.toLowerCase())) ||
                    (item.barcode &&
                        item.barcode
                            .toLowerCase()
                            .includes(filterText.toLowerCase()))
            );
            setFilter({
                filteredData: filteredItems,
                text: filterText,
                isFilter: true,
            });
        } else {
            setFilter({
                filteredData: [],
                text: "",
                isFilter: false,
            });
        }
    };

    const deleteItem = (item) => {
        swal({
            title: "Silmek istediğinize emin misiniz?",
            text: "Kalıcı olarak silinecektir",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((res) => {
                if (res) {
                    axios
                        .delete(`api/product/${item.id}`, {
                            headers: {
                                Authorization:
                                    "Bearer " +
                                    props.AuthStore.appState.user.access_token,
                            },
                        })
                        .then((response) => {
                            if (response.data.success) {                               
                                swal(
                                    "İşlem Başarılı",
                                    response.data.message,
                                    "success"
                                ).then(() => {
                                    setRefresh(true);
                                })
                            } else {
                                swal(
                                    "İşlem Başarısız",
                                    response.data.message,
                                    "error"
                                ).then(() => {
                                    setRefresh(false);
                                })
                            }
                        })
                        .catch((e) => console.log(e));
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <DataTable
                            columns={[
                                {
                                    name: "Model Kodu",
                                    selector: (row) => `${row.modelCode}`,
                                    sortable: true,
                                },
                                {
                                    name: "Ürün Adı",
                                    selector: (row) => `${row.name}`,
                                    sortable: true,
                                },
                                {
                                    name: "Barkod",
                                    selector: (row) => `${row.barcode}`,
                                    sortable: true,
                                },
                                {
                                    name: "Stok",
                                    selector: (row) => `${row.stock}`,
                                    sortable: true,
                                },
                                {
                                    name: "Satış Fiyatı",
                                    selector: (row) => `${row.sellingPrice}`,
                                    sortable: true,
                                },
                                {
                                    name: "Eylemler",
                                    sortable: true,
                                    cell: (item) => (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    props.history.push({
                                                        pathname: `/urunler/duzenle/${item.id}`,
                                                    })
                                                }
                                                className="btn btn-secondary mx-1"
                                            >
                                                Düzenle{" "}
                                            </button>{" "}
                                            <button
                                                onClick={() => deleteItem(item)}
                                                className="btn btn-danger mx-1"
                                            >
                                                Sil{" "}
                                            </button>{" "}
                                        </div>
                                    ),
                                },
                            ]}
                            subHeader={true}
                            responsive={true}
                            hover={true}
                            fixedHeader
                            pagination
                            expandableRows
                            expandableRowsComponent={<ExpandableComponent />}
                            data={filter.isFilter ? filter.filteredData : data}
                            subHeaderComponent={
                                <SubHeaderComponent
                                    filter={filterItems}
                                    action={{
                                        uri: () => {
                                            props.history.push("/urunler/ekle");
                                        },
                                        title: "Yeni Ürün Ekle",
                                        className: "btn btn-success",
                                    }}
                                />
                            }
                        />{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
