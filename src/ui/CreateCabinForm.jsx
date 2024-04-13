/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useCreateRooms, useEditCabin, useCreateRoomsType, useCreateRoomsAmenities } from "../hooks/useCabin";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Select from "react-tailwindcss-select";
import { useNavigate } from "react-router-dom";

import('preline')

function CreateCabinForm({ editingCabin, editingMode, onCancel }) {

    const { register, handleSubmit, reset, getValues, formState, setValue } = useForm();

    const { isLoading:isAdding, createRoom } = useCreateRooms();
    const { isLoading:isRoomTpeLoading, createRoomType } = useCreateRoomsType();
    const { isLoading: isEditing, editRoom } = useEditCabin();
    const { isLoading: isAmenities, createRoomAmenities } = useCreateRoomsAmenities();
    const [addOnsForRoom, setAddOnsForRoom] = useState(null);
    const { errors } = formState;
    const navigate = useNavigate();
    const allAmenities = useSelector((state) => state.addOnsReducer.allAmenities);
    const filterdAmeniteis = allAmenities?.filter((item) => {
        return ({
            Name: item.name,
            amenitiesId: item.amenitiesId,
            created_at: item.created_at,
        }
    );
});
const roomAddOnList = filterdAmeniteis
? filterdAmeniteis.map((item) => {
    return { value: `${item.name}`, label: `${item.name}`, id: item.amenitiesId };
})
: [];

const handleChange = (value) => {
    setAddOnsForRoom(value);
    console.log('✌️addOnsForRoom --->', addOnsForRoom);
      };


    useEffect(() => {
        if (editingMode) {
            if(editingCabin?.amenities && editingCabin?.amenities.length > 0 ){
                const fa = editingCabin?.amenities.filter((item) => {
                    return ({
                        Name: item.name,
                        amenitiesId: item.amenitiesId,
                        created_at: item.created_at,
                    }
                );
            });
            const al = fa
                ? fa.map((item) => {
                    return { value: `${item.name}`, label: `${item.name}`, id: item.amenitiesId };
                })
                : [];

            setAddOnsForRoom(al);
            }
            setValue('roomTypeName', editingCabin?.roomType?.roomTypeName);
            setValue('maxOccupancy', editingCabin?.roomType?.maxOccupancy);
            setValue('pricePerNight', editingCabin.pricePerNight);
            setValue('roomNumber', editingCabin?.roomNumber);
            setValue('description', editingCabin?.roomType?.description);
            // setAddOnsForRoom()
            // setValue('image', editingCabin.image);
        } else {
            setValue('roomTypeName', '');
            setValue('maxOccupancy', '');
            setValue('pricePerNight', '');
            setValue('roomNumber', '');
            setValue('description', '');
            // setValue('image', []);
        }
    }, [editingMode, editingCabin, setValue]);

    const isWorking = isAdding || isEditing || isRoomTpeLoading;

    const onSubmitHandler = function (data) {

        if (editingMode) editRoom({ newCabinData: { ...data }, id: editingCabin.id }, {
            onSuccess: () => {
                reset();
            }
        });
        else createRoomType({roomTypeName: data.roomTypeName,description: data.description,maxOccupancy:data.maxOccupancy}, {
            onSettled:typedata=>{
                createRoom({roomNumber:data.roomNumber,pricePerNight:data.pricePerNight,roomTypeId:typedata[0].roomTypeId},{
                    onSettled:(data)=>{
                        if(addOnsForRoom.length>0){
                            let amenities = addOnsForRoom.map((item)=> { return{roomID:data[0].roomId,amenitiesId:item.id}})
                            createRoomAmenities({amenities})
                            reset();
                            navigate("/admin/cabins")
                            onCancel()
                            toast.success("Room Added")
                        }else{
                            reset();
                            onCancel()
                            toast.success("Room Added")
                        }
                        
                    }
                })
                      
              }
        });
    }

    const onErrorHandler = function (error) { }

    return (
        <>
            <div
                id="hs-modal-signup"
                className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto backdrop-blur-sm

                "
            >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="mt-5">
                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
                                    <div className="grid gap-y-4">
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="roomTypeName"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Cabin name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    disabled={isWorking}
                                                    type="text"
                                                    id="roomTypeName"
                                                    name="roomTypeName"
                                                    {...register("roomTypeName", {
                                                        required: "This field is required"
                                                    })}
                                                    className="disabled:cursor-not-allowed py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.roomTypeName?.message && <p className="text-red-600 mt-3">{errors.roomTypeName.message}</p>}
                                            </div>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="maxOccupancy"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Maximum capacity
                                            </label>
                                            <div className="relative">
                                                <input
                                                    disabled={isWorking}
                                                    type="number"
                                                    id="maxOccupancy"
                                                    name="maxOccupancy"
                                                    {...register("maxOccupancy", {
                                                        required: "This field is required",
                                                        min: {
                                                            value: 1,
                                                            message: "Capacity at least should be 1"
                                                        }
                                                    })}
                                                    className="disabled:cursor-not-allowed py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.maxOccupancy?.message && <p className="text-red-600 mt-3">{errors.maxOccupancy.message}</p>}
                                            </div>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="pricePerNight"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Regular Price
                                            </label>
                                            <div className="relative">
                                                <input
                                                    disabled={isWorking}
                                                    type="number"
                                                    id="pricePerNight"
                                                    name="pricePerNight"
                                                    {...register("pricePerNight", {
                                                        required: "This field is required"
                                                    })}
                                                    className="disabled:cursor-not-allowed py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                    required=""
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.pricePerNight?.message && <p className="text-red-600 mt-3">{errors.pricePerNight.message}</p>}
                                            </div>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="roomNumber"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Room Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    disabled={isWorking}
                                                    type="number"
                                                    id="roomNumber"
                                                    name="roomNumber"
                                                    {...register("roomNumber", {
                                                        required: "This field is required"
                                                    })}
                                                    className="disabled:cursor-not-allowed py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.roomNumber?.message && <p className="text-red-600 mt-3">{errors.roomNumber.message}</p>}
                                            </div>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Description
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    disabled={isWorking}
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    {...register("description", {
                                                        required: "This field is required"
                                                    })}
                                                    className="disabled:cursor-not-allowed py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="amenities"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Amenities
                                            </label>
                                            <div className="relative">
                                            <Select
                                                value={addOnsForRoom}
                                                onChange={handleChange}
                                                options={roomAddOnList}
                                                isMultiple={true}
                                                placeholder="Room Add Ons"
                                                classNames={{
                                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-smtext-black-500",
                                                    listItem: ({ isSelected }) =>
                                                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                                        isSelected
                                                        ? `text-white bg-blue-500`
                                                        : `text-black-500 hover:bg-blue-100 hover:text-blue-500`
                                                    }`,
                                                }}
                                  // classNames="block w-full rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                                                
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.roomNumber?.message && <p className="text-red-600 mt-3">{errors.roomNumber.message}</p>}
                                            </div>
                                        </div>
                                        {/* End Form Group */}
                                        {/* Form Group */}
                                        {/* <div>
                                            <label htmlFor="image" className="block text-sm mb-2 dark:text-white">
                                                Cabin photo
                                            </label>
                                            <div className="relative">
                                                <input
                                                    disabled={isWorking}
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                    id="image"
                                                    {...register("image", {
                                                        required: editingMode ? false : "This Field is required"
                                                    })}
                                                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                                                />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                    <svg
                                                        className="h-5 w-5 text-red-500"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>
                                                </div>
                                                {errors?.image?.message && <p className="text-red-600 mt-3">{errors.image.message}</p>}
                                            </div>
                                        </div> */}

                                        <button
                                            disabled={isWorking}
                                            type="submit"
                                            className="disabled:cursor-not-allowed disabled:bg-gray-300 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        >
                                            {editingMode ? "Update Cabin" : "Create New Cabin"}
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={()=> onCancel()}
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                {/* End Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CreateCabinForm
