import { Pagination } from "react-bootstrap";
import { iPaginationComponent } from "../../interface";

export default function PaginationComponent({
  pagination,
  handlePageChange,
}: iPaginationComponent) {
  return (
    <Pagination className="justify-content-end mt-4">
      {Array.from({ length: pagination?.totalPages||0 }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === pagination?.page}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}
