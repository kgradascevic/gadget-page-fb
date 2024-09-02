import { useContext } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { GadgetsContext } from '../contexts';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DeleteGadgetModal from "./DeleteGadgetModal";

const GadgetsList = () => {

  const {gadgets, gadgetsLoading, setGadgetToDelete, gadgetToUpdate, setGadgetToUpdate, } = useContext(GadgetsContext);
  const navigate = useNavigate();

  if (gadgetsLoading) {
    return <CircularProgress />;
  }

  if (!gadgets || gadgets.length === 0) {
    return <div>No gadgets available</div>;
  }

  return <>
  <Table>
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Cover Photo</TableCell>
      <TableCell/>
    </TableRow>
  </TableHead>
  <TableBody>
    {gadgets.map(gadget => (
      <TableRow key={gadget.id}>
        <TableCell>{gadget.name}</TableCell>
        <TableCell>{gadget.price + ' km'}</TableCell>
        <TableCell>
          <img src={gadget.coverUrl} alt={gadget.name} className="w-8 h-8 object-cover" />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-7 justify-end">
              <Visibility style={{fontSize: 24}} color="primary" className="cursor-pointer" onClick={() => navigate("/gadgets/" + gadget.id)}/>
              <Edit className="cursor-pointer" onClick={() => setGadgetToUpdate(gadget)} style={{fontSize: 24}} color="warning"/>
              <Delete className="cursor-pointer" onClick={() => setGadgetToDelete(gadget)} style={{fontSize: 24}} color="error"/>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<DeleteGadgetModal/>
</>
};

export default GadgetsList;
