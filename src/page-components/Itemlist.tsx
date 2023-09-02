import { Spinner, Table } from "react-bootstrap";
import { iItemList } from "../interface";

export default function Itemlist({ loading, items }: iItemList) {
  return (
    <div
      style={{
        minHeight: "250px",
      }}
      className=" w-100"
    >
      <Table striped className="h-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Condition</th>
            <th>Category</th>
            <th>Stocked Date</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((e, index: number) => (
            <tr key={index}>
              <td>{e?.name}</td>
              <td>{e?.quantity}</td>
              <td>{e?.price}</td>
              <td>{e?.condition}</td>
              <td>{e?.category}</td>
              <td>{e?.stockedDate}</td>
            </tr>
          ))}
        </tbody>
        {loading && (
          <div className="loadingBox">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Table>
    </div>
  );
}
