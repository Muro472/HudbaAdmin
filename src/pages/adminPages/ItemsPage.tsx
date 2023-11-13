import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";

import { api } from "../../utils/api.ts";
import { textShortener } from "../../utils/textShortener.ts";
import { timestamp } from "../../utils/timestamp.ts";
import { IProductFromList } from "../../types/responses";

import "../../scss/pages/_items-page.scss";

export default function ItemsPage() {
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rows, setRows] = useState<IProductFromList[]>([]);

  const handlePaginationPageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPaginationPage(value);
    getData(value);
  };

  const getData = async (page: number) => {
    const response = (
      await api.getProducts({
        category: "vinyl",
        limit: 20,
        page: page,
      })
    )[1];

    if (response) {
      setTotalPages(response.totalPages);
      setRows(response.products);
    }
  };

  useEffect(() => {
    getData(paginationPage);
  }, []);

  return (
    <div className="items-page__main">
      <nav className="items-page__main-nav"></nav>

      <main className="items-page__main-main">
        <div className="items-page__main-main-main">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Titul</TableCell>
                <TableCell align="left">Vytvorené dňa</TableCell>
                <TableCell align="left">Aktualizované dňa</TableCell>
                <TableCell align="left">značka</TableCell>
                <TableCell align="left">Charakteristika</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{timestamp(row.createdAt)}</TableCell>
                  <TableCell align="left">{timestamp(row.updatedAt)}</TableCell>
                  <TableCell align="left">{row.brand}</TableCell>
                  <TableCell align="left">
                    {textShortener(row.desc, 20)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="items-page__main-main-pagination">
          <Pagination
            count={totalPages}
            size="large"
            page={paginationPage}
            onChange={handlePaginationPageChange}
          />
        </div>
      </main>
    </div>
  );
}
