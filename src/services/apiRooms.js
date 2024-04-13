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

// const availableRooms = allRooms?.filter(room => room.roomType.maxOccupancy >= maxOccupancy);

const finalAvailableRooms = allRooms?.filter(room => !bookings.some(booking => (booking.roomId === room.roomId )));

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
  export async function getAmenities() {
    const { data, error } = await supabase
    .from('amenities')
    .select(`*`);
    
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
    }

    
  export async function addPayment({amount}) {
    const { data: data, error: error } = await supabase
    .from('payment')
    .insert([
      { 'method': 'Pay at Reception', amount },
    ])
    .select()
    
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
    }

    export async function addReservation({checkInDate,checkOutDate, numberOfPeople, numberOfChildren,depositAmount,customerId,roomId,paymentId}) {
      const { data, error } = await supabase
      .from('reservation')
      .insert([
        { checkInDate, checkOutDate, 'status': 'booked', numberOfPeople, numberOfChildren, 'numberOfRoom': 1, depositAmount, customerId, roomId, paymentId  },
      ])
      .select()
      
      
      if (error) {
          throw new Error(error.message)
      }
      return data;
      }

      export async function reservationAddOns({reservationArray}) {
        const { data, error } = await supabase
        .from('reservationAdd-ons')
        .insert(reservationArray)
        .select()
        
        
        if (error) {
            throw new Error(error.message)
        }
        return data;
        }

  export async function addUser({firstName, lastName, dob, email, phoneNumber, address}) {
      const { data, error } = await supabase
      .from('signUp')
      .insert([
        { firstName,lastName, dob, phoneNumber, address, email, 'password': '','userType' : 'guest' },
      ])
      .select()
 
        

    if (error ) {
      throw new Error(error.message)
  }
    return data;
    }