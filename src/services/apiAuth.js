import supabase, { supabaseUrl }  from "./supabase";


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

export async function updateCurrentUser({password, fullName, avatar}) {
  // 1.- Update Password Or fullName.
  let updateData;
  if (password) updateData = {password};
  if (fullName) updateData = {data: {fullName}};

  const {data, error} = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if(!avatar) return data;

  // 2.- Upload the avatar Image.
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);


  // 3.- Update the avatar in the user.
  let updatedAvatarData = {
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  };
  const {data: updateUser, error: updateAvatarError} = await supabase.auth.updateUser(updatedAvatarData);

  if(updateAvatarError) throw new Error(updateAvatarError.message);

  return updateUser;
}

