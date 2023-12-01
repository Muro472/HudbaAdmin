import {
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
} from "@mui/material";

import IconButtonComponent from "../general/IconButtonComponent.tsx";

import { Visibility, DeleteOutline } from "@mui/icons-material";

import { IOrderItem } from "../../types/responses.ts";
import { timestamp } from "../../utils/timestamp.ts";

interface IComponentProps {
  rows: IOrderItem[];
  handleSettingsClick: (item: IOrderItem) => void;
  handleDeleteClick: (item: IOrderItem) => void;
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
          <TableCell align="left">Čas objednávky</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Meno/Priezvisko</TableCell>
          <TableCell align="left">Krajina/Mesto</TableCell>
          <TableCell align="left">Celková cena</TableCell>
          <TableCell align="left">Status</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">{timestamp(row.createdAt)}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="left">{`${row.name} ${row.surname}`}</TableCell>
            <TableCell align="left">{`${row.country} ${row.city}`}</TableCell>
            <TableCell align="left">{row.amount}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="right">
              <IconButtonComponent
                icons={[
                  {
                    icon: <Visibility />,
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
