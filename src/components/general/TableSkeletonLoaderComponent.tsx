import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

interface IComponentProps {
  length: number;
}

export default function TableSkeletonLoaderComponent({
  length,
}: IComponentProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
          <TableCell align="left">
            <Skeleton />
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {[...Array(length).keys()].map((i) => (
          <TableRow
            key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
            <TableCell align="left">
              <Skeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
