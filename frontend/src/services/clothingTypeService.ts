export const fetchClothingTypes = async () => {
  try {
    const response = await fetch("http://localhost:8000/clothing-types/");
    if (!response.ok) {
      throw new Error("Failed to fetch clothing types");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchClothingTypeById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/clothing-types/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch clothing type by ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createClothingType = async (name: string) => {
  try {
    const response = await fetch("http://localhost:8000/clothing-types/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create clothing type");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateClothingType = async (id: number, name: string) => {
  try {
    const response = await fetch(`http://localhost:8000/clothing-types/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update clothing type");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClothingType = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/clothing-types/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete clothing type");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
