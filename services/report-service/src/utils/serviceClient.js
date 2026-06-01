import { ApiError } from './ApiError.js';

export const parseJson = async (res) => {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, body.message || `Request failed: ${res.status}`);
  }
  return body.data ?? body;
};

export const fetchAllPages = async (baseUrl, path, listKey, authorization, query = {}) => {
  const items = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const params = new URLSearchParams({ ...query, page: String(page), limit: String(limit) });
    const res = await fetch(`${baseUrl}${path}?${params}`, {
      headers: { Authorization: authorization },
    });

    const data = await parseJson(res);
    items.push(...(data[listKey] ?? []));

    const { totalPages } = data.pagination ?? {};
    if (!totalPages || page >= totalPages) break;
    page += 1;
  }

  return items;
};
