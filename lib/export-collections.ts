import pb from "./pocketbase";

async function exportCollections() {
  try {
    await pb.admins.authWithPassword("sagamuda.id@gmail.com", "Sagamuda585858");
    const collections = await pb.collections.getFullList({ sort: "created" });
    console.log(JSON.stringify(collections, null, 2));
  } catch (error) {
    console.error(error);
  }
}

exportCollections();
