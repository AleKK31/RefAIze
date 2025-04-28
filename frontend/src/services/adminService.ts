export const loginSubmit = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao fazer login");
    }

    const data = await response.json();
    console.log("Login realizado com sucesso!", data);

    localStorage.setItem("access_token", data.access_token);
    window.location.href = "/admin-dashboard";
  } catch (err) {
    setError(err instanceof Error ? err.message : "Ocorreu um erro");
  } finally {
    setLoading(false);
  }
};

export const createAdmin = async (
  name: string,
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/admins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao criar administrador");
    }

    const data = await response.json();
    console.log("Administrador criado com sucesso!", data);
    return data;
  } catch (err) {
    setError(err instanceof Error ? err.message : "Ocorreu um erro");
  } finally {
    setLoading(false);
  }
};

export const fetchAdmins = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://localhost:8000/admins/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar administradores");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAdminById = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar administrador por ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAdmin = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/admins/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar administrador");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAdmin = async (
  id: number,
  updatedData: { name?: string; email?: string; password?: string },
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao atualizar administrador");
    }

    const data = await response.json();
    console.log("Administrador atualizado com sucesso!", data);
    return data;
  } catch (err) {
    setError(err instanceof Error ? err.message : "Ocorreu um erro");
  } finally {
    setLoading(false);
  }
};
