export const loginSubmit = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/auth/user/login", {
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
    window.location.href = "/home";
  } catch (err) {
    setError(err instanceof Error ? err.message : "Ocorreu um erro");
  } finally {
    setLoading(false);
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao criar usuário");
    }

    const data = await response.json();
    console.log("Usuário criado com sucesso!", data);
    return data;
  } catch (err) {
    setError(err instanceof Error ? err.message : "Ocorreu um erro");
  } finally {
    setLoading(false);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:8000/users/");
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário por ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao deletar usuário");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
