Criando ambiente virtual

```bash
python -m venv venv

source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

Instalando dependências

```bash
pip install -r requirements.txt
```

Executando a aplicação
Com uvicorn:

```bash
uvicorn main:app --reload
```

Acesse a documentação automática do Swagger:
http://localhost:8000/docs