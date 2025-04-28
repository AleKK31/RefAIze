export const fetchSeasons = async () => {
  try {
    const response = await fetch("http://localhost:8000/seasons/");
    if (!response.ok) {
      throw new Error("Failed to fetch seasons");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSeasonById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/seasons/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch season by ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSeason = async (name: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://localhost:8000/seasons/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create season");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSeason = async (id: number, name: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/seasons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update season");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSeason = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/seasons/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete season");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
