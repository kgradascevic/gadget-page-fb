import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config" ;


const AddGadgetForm = ({setGadgets}) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [coverUrl, setCoverUrl] = useState("");

    const [nameError, setNameError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [coverUrlError, setCoverUrlError] = useState("");
    const [loading, setLoading] = useState(false);

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

                const createdGadget = await addDoc(collection(db, "gadgets"), gadget);


            setLoading(false);

                setGadgets(prevState => [{ id: createdGadget.id, ...gadget}, ...prevState]);

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

    return loading ? <CircularProgress/> : <form onSubmit={onFormSubmit} className="w-full  flex flex-col gap-4 items-center">
    <TextField helperText={nameError} error={!!nameError} value={name} onChange={(e) => setName(e.target.value)} label="Name" className="w-3/4"/>
    <TextField helperText={priceError} error={!!priceError} value={price} onChange={(e) => setPrice(e.target.value)} label="Price" className="w-3/4" type="number" inputProps={{min: 0}}/>
    <TextField helperText={coverUrlError} error={!!coverUrlError} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} label="Cover Url" className="w-3/4"/>
    <Button type="submit" variant="contained" className="w-3/4">ADD ITEM</Button>
</form>;
}
 
export default AddGadgetForm;