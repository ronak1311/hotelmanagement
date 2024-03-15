import supabase from "./supabase";

export async function signUp({ firstName,lastName, dob, phoneNumber, address, email, password }) {

    const { data, error } = await supabase
    .from('signUp')
    .insert([
        { 'firstName' : firstName,lastName, dob, phoneNumber, address, email, password },
    ])
    .select()
    
    if (error) {
        throw new Error(error.message)
    }
    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.from('signUp').select(`*`).eq('email', email).single()

    if(data.email == email && data.password == password){
        return data;
    }

    if (error) {
        throw new Error(error.message)
    }
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
