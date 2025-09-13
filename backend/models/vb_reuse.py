
# Import necessary modules
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

# Load embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Load FAISS vectorstore from disk
vectorstore = FAISS.load_local("pdf_index", embedding_model, allow_dangerous_deserialization=True)

# Now you can use 'vectorstore' as needed
