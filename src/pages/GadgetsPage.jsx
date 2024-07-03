import { useEffect, useState } from "react";
import AddGadgetForm from "../components/AddGadgetForm";
import { getDocs, collection } from "firebase/firestore";
import {db} from "../config"
import GadgetsList from "../components/gadgetsList";

const GadgetsPage = () => {

    const [gadgets, setGadgets] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const firebaseGadgets = [];
                const querySnapshot = await getDocs(collection(db, "gadgets"));
                querySnapshot.forEach(item => {
                    firebaseGadgets.push({
                        id: item.id,
                        ...item.data()
                    })
                    console.log(item.id);
                    console.log(item.data());
                })
            setGadgets(firebaseGadgets);
            } catch (e) {
                alert("Error: " + e);
            } finally {
            setLoading(false);
            }
           
        })();
    }, []);

    return <div className="h-full flex">
        <div className="h-full w-1/2 border-r-2 px-4 border-gray-500">
            <GadgetsList gadgets={gadgets} loading={loading} />
        </div>
        <div className="h-full w-1/2 flex flex-col gap-4 px-4">
        <span className="font-bold text-3xl font-bold w-full text-center p-3">Add New Gadget</span>
        <AddGadgetForm setGadgets={ setGadgets }/>
        </div>
    </div>
}
 
export default GadgetsPage;