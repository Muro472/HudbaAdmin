import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

import ItemsTable from "../../components/tables/ItemsTable.tsx";
import TableSkeletonLoaderLayout from "../../components/general/TableSkeletonLoaderLayout.tsx";

import { api } from "../../utils/api.ts";
import { IProductFromList } from "../../types/responses";
import { categories } from "../../utils/categories.ts";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";

import "../../scss/pages/_items-page.scss";

const drawerActive = (isActive: boolean) =>
  (isActive ? "items-page__main-nav-item-active " : "") +
  "items-page__main-nav-item";

export default function ItemsPage() {
  const loadingLength = 20;

  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<IProductFromList[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeParams = (value: string) => {
    setSearchParams({ category: value });
    setRows([]);
    setTotalPages(1);
    setPaginationPage(1);
    getData(1, value);
  };

  const handlePaginationPageChange = (value: number) => {
    setPaginationPage(value);
    getData(value, String(searchParams.get("category")));
  };

  const getData = async (page: number, categoryParam: string) => {
    setLoading(true);
    const response = (
      await api.getProducts({
        category: categoryParam,
        limit: loadingLength,
        page: page,
      })
    )[1];

    if (response) {
      setTotalPages(response.totalPages);
      setRows(response.products);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    handleChangeParams(String(searchParams.get("category")));
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    handleChangeParams(categoryParam ? String(categoryParam) : categories[0]);
  }, []);

  return (
    <div className="items-page__main">
      <nav className="items-page__main-nav">
        {categories.map((category) => (
          <div
            key={category}
            className={drawerActive(
              String(searchParams.get("category")) === category
            )}
            onClick={() => handleChangeParams(category)}
          >
            {capitalizeFirstLetter(category)}
          </div>
        ))}
      </nav>

      {/* main content start */}
      <main className="items-page__main-main">
        <div className="items-page__main-main-head">
          <Button variant="outlined">Outlined</Button>
        </div>

        <div className="items-page__main-main-main">
          <TableSkeletonLoaderLayout
            loading={loading}
            loadedContentLength={rows.length}
            length={loadingLength}
          >
            <ItemsTable rows={rows} onRefresh={onRefresh} />
          </TableSkeletonLoaderLayout>
        </div>

        <div className="items-page__main-main-pagination">
          {totalPages > 1 ? (
            <Pagination
              count={totalPages}
              size="large"
              page={paginationPage}
              onChange={(_, page) => handlePaginationPageChange(page)}
            />
          ) : null}
        </div>
      </main>
      {/* main content end */}
    </div>
  );
}
