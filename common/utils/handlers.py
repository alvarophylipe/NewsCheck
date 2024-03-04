import os
import json
import requests
from dotenv import load_dotenv
from common.utils.web_extractor import get_webpage_content

load_dotenv()

class RequestModelHandler:
    def __init__(self) -> None:
        self._URL = "https://api-inference.huggingface.co/models/alvarophylipe/portuguese-fake-news-classification"
        self._HEADERS = {
            "Authorization": f"Bearer {os.getenv('API_KEY')}"
        }
        self.content = None
    
    
    def _query(self) -> dict:
        res = requests.post(self._URL, 
                            headers=self._HEADERS, 
                            json=self._generate_payload())
        return res.json()


    def _padding_text(self) -> str:
        return " ".join(self.content.split(maxsplit=299)[0:299])
    

    def _generate_payload(self) -> dict:
        return dict(inputs=self._padding_text())


    def _get_prediction(self, response: dict) -> int:
        try:
            items = {
                i.get('label'): i.get('score') \
                for i in response[0]
            }

            preds = [i[1] for i in sorted(items.items())]


            return {"prediction": preds.index(max(preds))}
        except:
            return


    def _result(self) -> dict:
        response = self._query()
        return self._get_prediction(response)
    

    def get_result(self, type: str, content: str) -> dict:
        if type == 'text':
            self.content = content
        else:
            self.content = get_webpage_content(content)
        
        try:
            return {
                'content': json.dumps(self._result()),
                'status': 200
            }
        except:
            return{
                'content': '',
                'status': 500
            }


    def load_model(self) -> dict:

        hugging_response = requests.get('https://huggingface.co/')

        if hugging_response.status_code == 503:
            return {
                'content': json.dumps({'loading': False}),
                'status': 503
            }

        with open("common/txts/sample.txt", "r", encoding='utf-8') as file:
            content = file.read()
            content.lower()

        self.content = content

        loading = True

        if self._result().get('prediction'):
            loading = False
        
        return {
            "content": json.dumps({
                "loading": loading
            }),
            "status": 200
        }

