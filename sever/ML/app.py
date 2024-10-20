import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI()

#==========================================================================================================

def parse_flashcards(text):
    Front = []
    Back = []
    flashcards = []

    file_path = 'generate.txt'

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    current_question = None
    current_answer = None
    capturing_answer = False
    for line in lines:
        if line.startswith('Front:'):
            if current_question is not None and current_answer is not None:
                flashcards.append((current_question, current_answer.strip()))
                Front.append(current_question)
                Back.append(current_answer.strip())
            current_question = line.replace('Front:', '').strip()
            current_answer = ''
            capturing_answer = False
        elif line.startswith('Back:'):
            current_answer += line.replace('Back:', '').strip() + ' '
            capturing_answer = True
        elif capturing_answer and line.strip() == '':
            capturing_answer = False
        elif capturing_answer:
            current_answer += line.strip() + ' '

    if current_question and current_answer:
        flashcards.append((current_question, current_answer.strip()))
        Front.append(current_question)
        Back.append(current_answer.strip())
    return Front, Back

def generate_Question_Answer(content, amount, model):
    prompt = f"""Now you are Ben, He is the best Teacher so he often makes flashcards for students to learn about {content}. Can you create me {amount} flashcards about {content}? The front page of the flashcard is English and the back page of the flashcard is Thai language. 
    Write the flashcard in this format:
    ```
    Ambition
    Front: Ambition
    Back: ความทะเยอทะยาน

    Courage
    Front: Courage
    Back: ความกล้าหาญ
    ```
    """
    response = model.generate_content(prompt)
    x = response.text
    x = x.replace('**', '').replace("```", '')
    Question, Answer = parse_flashcards(x)

    return Question, Answer

def thisfunctionreturnresult(content, amount, model):
    Question, Answer = generate_Question_Answer(content, amount, model)
    New_df = pd.DataFrame({"Question": Question, "Answer": Answer})
    Df = New_df.drop_duplicates(subset='Question', keep='first')
    count = 0
    while len(Df) != amount:
        if len(Df) < amount:
            remaining = amount - len(Df)
            Question, Answer = generate_Question_Answer(content, remaining, model)
            New_df = pd.DataFrame({"Question": Question, "Answer": Answer})
            Df = pd.concat([Df, New_df])
            Df = Df.drop_duplicates(subset='Question', keep='first')
        if len(Df) > amount:
            Df = Df[:amount]
            count += 1
        print(count)
    Question_done = Df['Question'] 
    Answer_done = Df['Answer']
    return Question_done, Answer_done

gemini_api_key = "AIzaSyBXXENTtKvoVSHpmyDesVZNjc5NWm2Idlc"
genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel('gemini-pro')

#==========================================================================================================

class FlashcardRequest(BaseModel):
    prompt: str
    amount: int

@app.get("/hello")
async def hello():
    return "Hello, World!"
    
@app.post("/generate-flashcards")
async def generate_flashcards(request: FlashcardRequest):
    content = request.prompt
    amount = request.amount

    if not content or not amount:
        raise HTTPException(status_code=400, detail="Missing prompt or amount")

    try:
        questions, answers = thisfunctionreturnresult(content, amount, model)
        flashcards = [{'question': q, 'answer': a} for q, a in zip(questions, answers)]
        return flashcards
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#==========================================================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")
