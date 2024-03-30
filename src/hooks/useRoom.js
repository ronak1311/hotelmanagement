import { useMutation } from "@tanstack/react-query";
import { getRooms as getRoomAPI } from "../services/apiRooms";
// import { getAmenities as getAmenitiesAPI } from "../services/apiRooms";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux';
export function useRoom() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getRooms } = useMutation({
        mutationFn: () => getRoomAPI(),

        onSuccess: (rooms) => {
            dispatch({ type: 'setRooms', payload: rooms })
        },

        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getRooms }
}

// export function useAmenities() {
//     const dispatch = useDispatch()
//     const { isLoading, mutate: getAmenities } = useMutation({
//         mutationFn: () => getAmenitiesAPI(),

//         onSuccess: (amenities) => {
//             console.log("Amen", amenities);
//             dispatch({ type: 'setAmenities', payload: amenities })
           
//         },

//         onError: (error) => {
//             console.error(error);
//             toast.error(error.message)
//         }
//     })

//     return { isLoading, getAmenities }
// }