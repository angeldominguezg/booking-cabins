import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {

  const hasImagenPath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagenPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`;

  // 1- Create/edit the cabin
  let query = supabase.from("cabins");

  // A) Create Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Update the Caibn
  if (id) {
    query = query.update({...newCabin, image: imagePath }).eq("id", id);
  }

  const {data, error} = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2- Is the creation ok then upload the cabin image.
  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

    if (storageError) {
    // Handle error
    // Delete the cabin if there was an error uploading the corresponding image
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(error);
    throw new Error("Cabin could not be created because a file error");

  }
    // Handle success
    return data;
}

export async function updateCabin() {}
