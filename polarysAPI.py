import json 
import requests
# authentication part. I put login and password and API will give me back the passport which I need to use in other steps
api_url_base="https://passport.beqom.com/api/auth"
access_token='myToken'
login=input('please provide you login:\n')
password=input('please provide password:\n')

parameters={"client_id":str(login), "client_secret": str(password)}

response = requests.post(api_url_base, data=parameters).json()
print(response.status_code)

def show_status_code():
    if response.status_code >= 500:
        print('[!] [{0}] Server Error'.format(response.status_code))
        return None
    elif response.status_code == 404:
        print('[!] [{0}] URL not found: [{1}]'.format(response.status_code,api_url_base))
        return None  
    elif response.status_code == 401:
        print('[!] [{0}] Authentication Failed'.format(response.status_code))
        return None
    elif response.status_code == 400:
        print('[!] [{0}] Bad Request'.format(response.status_code))
        return None
    elif response.status_code >= 300:
        print('[!] [{0}] Unexpected Redirect'.format(response.status_code))
        return None
    elif response.status_code == 200:
        ssh_keys = json.loads(response.content.decode('utf-8'))
        return ssh_keys
    else:
        print('[?] Unexpected Error: [HTTP {0}]: Content: {1}'.format(response.status_code, response.content))
    return None
access_token = response['access_token']
