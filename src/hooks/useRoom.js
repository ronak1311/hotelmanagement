import { useMutation } from "@tanstack/react-query";
import { getAddOns, getRooms as getRoomAPI } from "../services/apiRooms";
import { getReservation as getReservationAPI } from "../services/apiRooms";
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

export function useReservation() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getReservation } = useMutation({
        mutationFn: ({checkInDate,checkOutDate, maxOccupancy}) => getReservationAPI({checkInDate,checkOutDate,maxOccupancy}),

        onSuccess: (availableRooms) => {
            dispatch({ type: 'setReservation', payload: availableRooms })
           
        },

        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getReservation }
}

export function useAddOns() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getAddons } = useMutation({
        mutationFn: () => getAddOns(),

        onSuccess: (availableRooms) => {
            dispatch({ type: 'setAddOns', payload: availableRooms })
           
        },

        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getAddons }
}
