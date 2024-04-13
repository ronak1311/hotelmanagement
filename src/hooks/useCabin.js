import { useDispatch } from "react-redux";
import { getCabins as getCabinsAPI, 
    deleteCabin as deleteCabinAPI, 
    createCabin as createCabinAPI, 
    createCabinType as createCabinTypeAPI,
    editCabin as editCabinAPI,
    editCabinType as editCabinTypeAPI,
    createCabinAmenities as createCabinAmenitiesAPI
} from "../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
export function useGetRooms() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getRooms } = useMutation({
        mutationFn: () => getCabinsAPI(),
        onSuccess: (rooms) => {
            dispatch({ type: 'setAllRooms', payload: rooms })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getRooms }
}  

export function useDeleteRooms() {
    const { isLoading, mutate: deleteRooms } = useMutation({
        mutationFn: ({customerId}) => deleteCabinAPI({customerId}),
        onSuccess: () => {
            toast.success("Room is deleted")
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, deleteRooms }
}  

export function useCreateRooms() {
    const { isLoading, mutate: createRoom } = useMutation({
        mutationFn: ({roomNumber,pricePerNight,roomTypeId}) => createCabinAPI({roomNumber,pricePerNight,roomTypeId}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, createRoom }
}  

export function useCreateRoomsType() {
    const { isLoading, mutate: createRoomType } = useMutation({
        mutationFn: ({roomTypeName,description,maxOccupancy}) => createCabinTypeAPI({roomTypeName,description,maxOccupancy}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, createRoomType }
}  

export function useCreateRoomsAmenities() {
    const { isLoading, mutate: createRoomAmenities } = useMutation({
        mutationFn: ({amenities}) => createCabinAmenitiesAPI({amenities}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    });
    return { isLoading, createRoomAmenities }
}  


export function useEditCabin() {
    const { isLoading, mutate: editRoom } = useMutation({
        mutationFn: ({roomTypeName,description,maxOccupancy,roomTypeId}) => editCabinAPI({roomTypeName,description,maxOccupancy,roomTypeId}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, editRoom }
}  

export function useEditCabinType() {
    const { isLoading, mutate: editRoom } = useMutation({
        mutationFn: ({roomTypeName,description,maxOccupancy,roomTypeId}) => editCabinTypeAPI({roomTypeName,description,maxOccupancy,roomTypeId}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, editRoom }
}  