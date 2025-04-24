export const fetchOccasions = async () => {
  try {
    const response = await fetch("http://localhost:8000/occasions/");
    if (!response.ok) {
      throw new Error("Failed to fetch occasions");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchOccasionById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/occasions/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch occasion by ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOccasion = async (name: string) => {
  try {
    const response = await fetch("http://localhost:8000/occasions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create occasion");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateOccasion = async (id: number, name: string) => {
  try {
    const response = await fetch(`http://localhost:8000/occasions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update occasion");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteOccasion = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/occasions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete occasion");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
