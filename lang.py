# builtin
from os import listdir

from tomli import load as load_toml
from flask import request

class LanguageDict:
    # When initialized load all the toml lang files in the specified path
    def __init__(self, path="./static/lang/"):
        self.data: dict = {}
        self.langs: list[str] = []

        for filepath in listdir(path):
            lang, filetype = filepath.split('.')

            if filetype != 'toml':
                continue
            with open(f'{path}{filepath}', 'rb') as file:
                self.data[lang] = load_toml(file)

            self.langs.append(lang)


    # When getting key search for the local user language version of that key
    # If getting 'user' return locale language
    def __getattr__(self, key) -> str:
        languages = request.accept_languages
        best_match = languages.best_match(self.langs)
        if key == "user":
            return best_match
        
        if best_match == None:
            best_match = "en"

        userLang = self.data.get(best_match)
        return userLang.get(key)


LANG = LanguageDict()