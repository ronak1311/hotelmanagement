import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("room").select("*, roomType(*), amenities(*)");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}
export async function createCabinType({roomTypeName,description,maxOccupancy}) {
   
    const { data, error } = await supabase
    .from('roomType')
    .insert({roomTypeName,description,maxOccupancy})
    .select()
        

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}
export async function createCabin({roomNumber,pricePerNight,roomTypeId}) {
   
    const { data, error } = await supabase
    .from('room')
    .insert({roomNumber,pricePerNight,roomTypeId})
    .select()
        

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}
export async function createCabinAmenities({amenities}) {
console.log('✌️amenities API --->', amenities);
   
    const { data, error } = await supabase
    .from('roomAmenities')
    .insert(amenities)
    .select()

    if (error) {
        console.error(error);
        throw new Error(error);
    }
    return data;
}

export async function editCabinType({roomTypeName,description,maxOccupancy,roomTypeId}) {
   
    const { data, error } = await supabase
    .from('roomType')
    .update([roomTypeName,description,maxOccupancy])
    .eq('roomTypeId',roomTypeId)
    .select()
        

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}
export async function editCabin({roomTypeName,description,maxOccupancy,roomTypeId}) {
   
    const { data, error } = await supabase
    .from('room')
    .update([roomNumber,pricePerNight])
    .eq('roomId',roomId)
    .select()
        

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}



export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted" + error);
    }

    return data;
}
