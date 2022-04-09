import requests

resp = requests.get(
    'http://localhost:3005/api/casamentos/PT_ABM_PCML02_002_00032_000002')
print(resp.json())