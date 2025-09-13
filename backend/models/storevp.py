
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

# Load PDF
loader = PyPDFLoader("LCAT_Certificate_Retesh_G_S.pdf")
docs = loader.load()

# Split into chunks for embedding
text_splitter = RecursiveCharacterTextSplitter(
	chunk_size=1000,  # 1k tokens per chunk
	chunk_overlap=200
)
splits = text_splitter.split_documents(docs)

# Use a sentence-transformers model for embeddings
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


# Create vector DB
vectorstore = FAISS.from_documents(splits, embedding_model)

# Save the vectorstore to disk for later use
vectorstore.save_local("pdf_index")
