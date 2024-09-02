import { collection, doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants";
import { db } from "../config";
import { HeartBroken } from '@mui/icons-material';
import { CircularProgress } from "@mui/material";
import PrivateRoute from "../components/PrivateRoute";

const GadgetInfoPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [gadgetInfo, setGadgetInfo] = useState(null);
    const [gadgetExists, setGadgetExists] = useState(true);
    const [loading, setLoading] =useState(false);

    useEffect(() => {
        if(!!id) {
            setLoading(true);
            (async () => {
                try {
                    const docRef = doc(db, "gadgets", id);
                    const docSnapshot = await getDoc(docRef);
                    if(docSnapshot.exists()) {
                        setGadgetInfo(docSnapshot.data());
                    } else {
                        setGadgetExists(false);
                    }
                } catch(e) {
                    console.log(e);
                    setGadgetExists(false);
                } finally {
                    setLoading(false);
                }
            })();
        }

    }, [id]);


    return <PrivateRoute>
        {loading ? <CircularProgress/> : gadgetExists ? <div className="flex flex-col gap-2">
    <img src={gadgetInfo?.coverUrl} className="w-96 " />
    <span className="text-sm font-bold">Name</span>
    <span className="text-sm">{gadgetInfo?.name}</span>
    <span className="text-sm font-bold">Price</span>
    <span className="text-sm">{gadgetInfo?.price + "km"}</span>
    </div>: <div className="flex flex-col justify-center h-full items-center gap-3">
    <HeartBroken style={{fontSize: 100}}/>
    <span className="text-sm">Sorry, this gadget doesn't exist</span>
    <button className="bg-blue-500 text-black text-xl p-2 rounded" onClick={() => navigate(ROUTES.GADGETS)}>GO TO HOME</button>
    </div>}
    </PrivateRoute> 
    
}
 
export default GadgetInfoPage;