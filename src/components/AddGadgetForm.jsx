import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../config" ;
import { GadgetsContext } from "../contexts";


const AddGadgetForm = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [coverUrl, setCoverUrl] = useState("");

    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [coverUrlError, setCoverUrlError] = useState("");
    const [loading, setLoading] = useState(false);

    const {setGadgets, gadgetToUpdate, setGadgetToUpdate } = useContext(GadgetsContext);

    useEffect(() => {
        if(!!gadgetToUpdate) {
            setName(gadgetToUpdate.name);
            setPrice(gadgetToUpdate.price);
            setCoverUrl(gadgetToUpdate.coverUrl);
        } else {
            setName("");
            setPrice(0);
            setCoverUrl("");
            setNameError("");
            setPriceError("");
            setCoverUrlError("");
        }
    }, [gadgetToUpdate])

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
                setNameError("");
                setPriceError("");
                setCoverUrlError("");
            if(!name) {
                setNameError("Name is required");
            }

            if(!price) {
                setPriceError("Gadget price is required");
            }
            if(!price <=0) {
                setPriceError("Gadget price must be larger than 0");
            }

            if(!coverUrl) {
                setCoverUrlError("Cover Url is required");
            }

            if(!name || !price || !coverUrl) {
                return;
            }

            const gadget = {
                name, price, coverUrl
            };

            setLoading(true);

            if(gadgetToUpdate) {
                const docRef = doc(db, "gadgets", gadgetToUpdate.id);
                await updateDoc(docRef, gadget);
                setGadgets(prevState => [...prevState.map(gadget => gadget.id === gadgetToUpdate.id ? {...gadget, id: gadget.id} : gadget)]);
                setGadgetToUpdate(null);
            } else {
                const createdGadget = await addDoc(collection(db, "gadgets"), gadget);
                setGadgets(prevState => [{ id: createdGadget.id, ...gadget}, ...prevState]);
            }

            setLoading(false);

                setName("");
                setPrice("");
                setCoverUrl("");
                setNameError("");
                setPriceError("");
                setCoverUrlError("");


            } catch (e) {
                alert("Error" + e);
        }
    }

    const handleClickCancel = () =>{
        setName("");
        setPrice(0);
        setCoverUrl("");

        if(gadgetToUpdate) {
            setGadgetToUpdate(null);
        }
    }

    return loading ? <CircularProgress/> : <form onSubmit={onFormSubmit} className="w-full  flex flex-col gap-4 items-center">
    <TextField helperText={nameError} error={!!nameError} value={name} onChange={(e) => setName(e.target.value)} label="Name" className="w-3/4"/>
    <TextField helperText={priceError} error={!!priceError} value={price} onChange={(e) => setPrice(e.target.value)} label="Price" className="w-3/4" type="number" inputProps={{min: 0}}/>
    <TextField helperText={coverUrlError} error={!!coverUrlError} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} label="Cover Url" className="w-3/4"/>
    <div className="flex gap-2 w-3/4">
    <Button onClick={handleClickCancel} variant="outlined" className="w-1/2">Cancel</Button>
    <Button type="submit" variant="contained" className="w-1/2">{gadgetToUpdate ? "Update":"Add"}</Button>
    </div>
</form>;
}
 
export default AddGadgetForm;