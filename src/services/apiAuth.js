import supabase from "./supabase";


export async function signup({ fullName, email, password }) {
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  // console.log(data);

  return data;
}

export async function getCurrentUser() {
  let { data: session, error } = await supabase.auth.getSession(); // Here I used getUser because a warning emited to getSession

  if (!session.session) return null;

  const { data, error: userError } = await supabase.auth.getUser();

  // console.log(data);

  if (userError) throw new Error(userError.message);

  return data?.user;
}


export async function logout() {
  const { error } = await supabase.auth.signOut();
  if(error) throw new Error(error.message);
}