export interface iItems {
  name: string;
  quantity: number;
  price: number;
  condition: string;
  category: string;
  stockedDate: string;
  meta: iMeta;
  $loki: string;
}

export interface iMeta {
  revision: number;
  created: number;
  version: number;
}

export interface iPagination {
  page: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
}

export interface iItemList {
  loading: boolean;
  items: iItems[] | undefined;
}

export interface ModalProps {
  show: boolean;
  title?: string;
}

export interface IModalForm {
  modalProps: ModalProps;
  children: JSX.Element;
}

export interface iPaginationComponent {
  pagination: iPagination;
  handlePageChange: (page: number) => void;
}

export interface iCategories {
  name: string;
  meta: {
    revision: number;
    created: number;
    version: number;
  };
  $loki: number;
}

export interface iForm {
  callback?: (boolean: boolean) => void;
  handleCancel ?: ()=>void
}
