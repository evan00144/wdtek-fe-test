import { useCallback, useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";
import { Button, Container } from "react-bootstrap";
import AddItemsForm from "../components/Form/AddItemsForm";
import axios from "axios";
import Itemlist from "../page-components/Itemlist";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { ModalProps, iItems, iPagination } from "../interface";

export default function ItemsPage() {
  axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
    "token"
  )}`;
  const [items, setItems] = useState<iItems[]>();
  const [pagination, setPagination] = useState<iPagination>({
    page: 1,
    pageSize: 5,
    totalData: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalProps>({
    show: false,
  });

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/items?page=${pagination?.page}&size=${pagination?.pageSize}`
      );
      setItems(res?.data?.payload?.data);
      setPagination({
        page: res?.data?.payload?.page,
        pageSize: res?.data?.payload?.size,
        totalData: res?.data?.payload?.total,
        totalPages: Math.ceil(
          res?.data?.payload?.total / res?.data?.payload?.size
        ),
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [pagination?.page, pagination?.pageSize]);
  useEffect(() => {
    getItems();
  }, [getItems]);

  const callbackAddForm = (callback: boolean) => {
    if (callback) {
      getItems();
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
  };

  const handleAddItems = () => {
    setModal((prev) => {
      return {
        ...prev,
        show: true,
      };
    });
  };


  const handleCancel = () => {
    setModal((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
  };
  const handlePageChange = (pageNumber: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        page: pageNumber,
      };
    });
  };
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between mb-5">
        <h1 className="m-0">Item List</h1>
        <Button
          className="text-white py-2 px-3"
          variant="secondary"
          onClick={handleAddItems}
        >
          + Add Item
        </Button>
      </div>
      <Itemlist loading={loading} items={items} />
      <PaginationComponent
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
      <ModalForm modalProps={modal}>
        <AddItemsForm handleCancel={handleCancel} callback={callbackAddForm} />
      </ModalForm>
    </Container>
  );
}
