import { Button, Card, CircularProgress, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { GadgetsContext } from "../contexts";
import { doc, deleteDoc } from "@firebase/firestore";
import { db } from '../config';

const DeleteGadgetModal = () => {

    const { setGadgets, gadgetToDelete, setGadgetToDelete, setGadgetsToUpdate} = useContext(GadgetsContext);
    const [loading, setLoading] = useState(false);

    const handleClickYes = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "gadgets", gadgetToDelete?.id);
            await deleteDoc(docRef);
            setGadgets(prevState =>[...prevState.filter(gadget => gadget.id !== gadgetToDelete?.id)]);
            setGadgetToDelete(null);
            setGadgetsToUpdate(null);
        } catch(e) {
            console.error("Error deleting gadget:", e);
        } finally {
            setLoading(false);
        }
    }

    return <Modal open={!!gadgetToDelete}>
    <div className="w-full h-full flex justify-center items-center">
        <Card className="flex flex-col gap-4 p-4">
            <span className="text-2xl">Are you sure you want to delete <strong>{gadgetToDelete?.name}</strong></span>
            <div className="flex justify-end gap-2">
                {loading ? <CircularProgress/>: <>
                    <Button variant="outlined" onClick={() => setGadgetToDelete(null)}>No</Button>
                    <Button variant="contained" onClick={handleClickYes}>Yes</Button>
                </>}
            </div>
        </Card>
    </div>
    </Modal>  
}
 
export default DeleteGadgetModal;