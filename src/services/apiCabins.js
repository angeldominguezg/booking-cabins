import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}