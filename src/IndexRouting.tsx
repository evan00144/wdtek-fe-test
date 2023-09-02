import { Route, Routes } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import axios from "axios";
import SuccessPage from "./pages/SuccessPage";

export default function IndexRouting() {

  axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
    "token"
  )}`;
  return (
    <>
      <Routes>
        <Route path="" element={<ItemsPage />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}
