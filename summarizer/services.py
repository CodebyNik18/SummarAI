from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


llm = ChatOllama(
    model='mistral',
    temperature=0.7
)

def summary_generator(textual_data: str):
    
    prompt = PromptTemplate(
        template="""
            You are a very helpful assistant for Student,
            based on given textual data generate a summary on that medium size summary not too long and not too short.
            You are helping student for their assignments, teaching them and be their guide..
            
            {textual_data}
        """,
        input_variables=['textual_data']
    )
    
    parser = StrOutputParser()
    
    chain = prompt | llm | parser
    
    return chain.invoke({'textual_data': textual_data})