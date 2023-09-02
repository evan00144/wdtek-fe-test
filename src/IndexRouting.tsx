import { Route, Routes } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";

export default function IndexRouting() {

  return (
    <>
      <Routes>
        <Route path="" element={<ItemsPage />} />
      </Routes>
    </>
  );
}
