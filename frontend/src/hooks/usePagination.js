import { useState } from 'react';

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const updateFromResponse = (pagination) => {
    if (pagination) {
      setPage(pagination.page);
      setTotalPages(pagination.totalPages);
    }
  };

  return { page, setPage, totalPages, setTotalPages, updateFromResponse };
}
