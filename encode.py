# builtins
from json import dumps, loads
from base64 import urlsafe_b64encode, urlsafe_b64decode

def encode(decoded: dict) -> str:
    #Dict to JSON string
    json_string = dumps(decoded)
    #JSON string to bytes, encrypt it in bytes, decode the bytes
    encoded_string = urlsafe_b64encode(json_string.encode()).decode()

    return encoded_string

def decode(encoded: str) -> dict:
    #Encoded string, decrypt it in bytes, decode the bytes
    json_string = urlsafe_b64decode(encoded).decode()
    #JSON string to Dict
    dict = loads(json_string)

    return dict