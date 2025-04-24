export const fetchStyles = async () => {
  try {
    const response = await fetch("http://localhost:8000/styles/");
    if (!response.ok) {
      throw new Error("Failed to fetch styles");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchStyleById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/styles/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch style by ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createStyle = async (name: string) => {
  try {
    const response = await fetch("http://localhost:8000/styles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create style");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStyle = async (id: number, name: string) => {
  try {
    const response = await fetch(`http://localhost:8000/styles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to update style");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStyle = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/styles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete style");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
