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

export async function createCabin(newCabin) {
  // https://mmbmwaytrjwsfgarltjz.supabase.co/storage/v1/object/public/cabins-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images//${imageName}`;

  // 1- Create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin, image: imagePath}])
    .select();

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

  } else {
    // Handle success
    return data;

  }

  // return data;
}

export async function updateCabin() {}
