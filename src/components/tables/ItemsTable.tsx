import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButtonComponent from "../general/IconButtonComponent.tsx";

import { Settings, DeleteOutline } from "@mui/icons-material";

import { textShortener } from "../../utils/textShortener.ts";
import { timestamp } from "../../utils/timestamp.ts";
import { IProductFromList } from "../../types/responses";

interface IComponentProps {
  rows: IProductFromList[];
  handleSettingsClick: (item: IProductFromList) => void;
  handleDeleteClick: (item: IProductFromList) => void;
}

export default function ItemsTable({
  rows,
  handleSettingsClick,
  handleDeleteClick,
}: IComponentProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Titul</TableCell>
          <TableCell align="left">Vytvorené dňa</TableCell>
          <TableCell align="left">Aktualizované dňa</TableCell>
          <TableCell align="left">značka</TableCell>
          <TableCell align="left">Charakteristika</TableCell>
          <TableCell align="left">Cena</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">{textShortener(row.title, 30)}</TableCell>
            <TableCell align="left">{timestamp(row.createdAt)}</TableCell>
            <TableCell align="left">{timestamp(row.updatedAt)}</TableCell>
            <TableCell align="left">{textShortener(row.brand, 30)}</TableCell>
            <TableCell align="left">{textShortener(row.desc, 30)}</TableCell>
            <TableCell align="left">{row.price}</TableCell>
            <TableCell align="right">
              <IconButtonComponent
                icons={[
                  {
                    icon: <Settings />,
                    onClick: () => handleSettingsClick(row),
                  },
                  {
                    icon: <DeleteOutline sx={{ color: "red" }} />,
                    onClick: () => handleDeleteClick(row),
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
