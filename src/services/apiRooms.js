import supabase from "./supabase";

export async function getRooms() {

    const { data, error } = await supabase
    .from('room')
    .select(`*,roomType(*),roomAmenities(amenities: amenitiesId(name)))`);
    
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
}

export async function getReservation({checkInDate,checkOutDate, maxOccupancy}) {

const { data: allRooms, error: roomsError } = await supabase.from('room').select(`*,roomType(*),roomAmenities(amenities: amenitiesId(name)))`);

if (roomsError) {
  console.error('Error fetching rooms:', roomsError.message);
  return;
}

const { data: bookings, error } = await supabase
  .from('reservation')
  .select('roomId')
  .gte('checkInDate', checkInDate)
  .lte('checkOutDate', checkOutDate)

const availableRooms = allRooms?.filter(room => room.roomType.maxOccupancy >= maxOccupancy);

const finalAvailableRooms = availableRooms?.filter(room => !bookings.some(booking => (booking.roomId === room.roomId )));

console.log('Available rooms:', finalAvailableRooms);
if (error) {
    throw new Error(error.message)
}
return finalAvailableRooms;
}

export async function getAddOns() {
  const { data, error } = await supabase
  .from('add-on')
  .select(`*`);
  
  
  if (error) {
      throw new Error(error.message)
  }
  return data;
  }