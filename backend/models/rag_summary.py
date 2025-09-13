from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings


# Load embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Load FAISS vectorstore from disk
vectorstore = FAISS.load_local("pdf_index", embedding_model, allow_dangerous_deserialization=True)

# Load Gemini LLM (Google Gemini)
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key="AIzaSyDo3dxn5yjUwpRR_qw2ev0_nnjH-y0J_Hk"
)

# Setup retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# Build QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)

# Ask for summary
summary = qa_chain.invoke({"query": "Summarize this entire document in detail"})
print(summary['result'])
