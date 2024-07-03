import React from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const GadgetsList = ({ gadgets, loading }) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (!gadgets || gadgets.length === 0) {
    return <div>No gadgets available</div>;
  }

  return <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Cover Photo</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gadgets.map(gadget => (
          <TableRow key={gadget.id}>
            <TableCell>{gadget.name}</TableCell>
            <TableCell>{gadget.price}</TableCell>
            <TableCell>
              <img src={gadget.coverUrl} alt={gadget.name} className="w-8 h-8 object-cover" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  
};

export default GadgetsList;
