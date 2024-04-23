from toml import loads as load_toml

with open('./static/config.toml', 'rb') as file:
    CONFIG: dict = load_toml(file)
