import supabase from "./supabase";

export async function getRooms() {

    const { data, error } = await supabase
    .from('room')
    .select(`*,roomType(*),roomAmenities(amenities: amenitiesId(name))`);
    
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
}

// export async function getAmenities() {

//     const { data, error } = await supabase
//     .from('amenities')
//     .select(`*`);

//     if (error) {
//         throw new Error(error.message)
//     }
//     return data;
// }