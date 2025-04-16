# Como Rodar o Projeto

### 1. **Criando o Ambiente Virtual**

Primeiro, crie um ambiente virtual para isolar as dependências do projeto:

```bash
python -m venv venv
```

Ative o ambiente virtual:

- **Linux/macOS**:

  ```bash
  source venv/bin/activate
  ```

- **Windows**:

  ```bash
  .\env\Scripts\activate
  ```

### 2. **Instalando as Dependências**

Com o ambiente virtual ativado, instale as dependências do projeto:

```bash
pip install -r requirements.txt
```

### 3. **Executando a Aplicação**

Para rodar a aplicação, utilize o **Uvicorn**:

```bash
uvicorn app.main:app --reload
```

Isso iniciará o servidor e permitirá o recarregamento automático durante o desenvolvimento.

### 4. **Acessando a Documentação Automática**

Após a aplicação estar em execução, você pode acessar a documentação interativa do Swagger em:

localhost:8000/docs
