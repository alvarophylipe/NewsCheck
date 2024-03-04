from typing import Callable

def return_error(func: Callable):
    def wrapper(*args, **kwargs):
        try:
            print(func.__name__)
            return func(*args, **kwargs)
        except:
            return {"error": True, "loading": False}
    return wrapper