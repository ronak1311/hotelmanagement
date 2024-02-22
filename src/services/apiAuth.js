import supabase from "./supabase";

// { firstName,lastName, dob, phoneNumber, address, email, password }
export async function signUp() {
    // console.log("APPP daat", firstName, lastName)

    const { data, error } = await supabase.from('signUp').select('firstName', 'lastName').single();
    // const { data, error } = await supabase.from('signUp').insert([
    //     firstName, lastName, dob, phoneNumber, address, email, password
    // ]);
    console.log("DATAAAAAAA", data)
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}
