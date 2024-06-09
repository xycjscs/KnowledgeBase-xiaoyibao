import os
import requests

# 配置
upload_record_file = 'upload_record.txt'
directory_path = '{{上传文件绝对路径比如/Users/qinxiaoqiang/Downloads/KnowledgeBase-xiaoyibao/downloads'
url = "{{fastgpt的上传文件api请求地址}}https://{{fastgpt ip或者url}}/api/core/dataset/collection/create/localFile"
payload = {
    'data': '{"datasetId":"{{知识库id}}","parentId":null,"trainingType":"chunk","chunkSize":900,"chunkSplitter":"","qaPrompt":"","metadata":{}}'
}
headers = {
    'Authorization': 'Bearer {{fastgpt api key}}fastgpt-xxx'
}
allowed_extensions = ['.pdf', '.txt', '.md'，'.html'，'.csv'] #fastgpt支持4类格式文件上传pdf, docx, md, txt, html, csv

def load_upload_records(record_file):
    if not os.path.exists(record_file):
        return set()
    with open(record_file, 'r') as file:
        uploaded_files = file.read().splitlines()
    return set(uploaded_files)

def save_upload_record(record_file, file_path):
    with open(record_file, 'a') as file:
        file.write(f"{file_path}\n")

def upload_file(file_path):
    with open(file_path, 'rb') as file:
        files = [
            ('file', (os.path.basename(file_path), file, 'application/octet-stream'))
        ]
        response = requests.post(url, headers=headers, data=payload, files=files)
    return response

def main():
    uploaded_files = load_upload_records(upload_record_file)
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if any(file.endswith(ext) for ext in allowed_extensions):
                file_path = os.path.join(root, file)
                if file_path in uploaded_files:
                    print(f"File already uploaded: {file_path}")
                    continue
                print(f"Uploading file: {file_path}")
                response = upload_file(file_path)
                if response.status_code != 200:
                    print(f"Error: Failed to upload {file_path}. Status code: {response.status_code}")
                    print(response.text)
                    return
                print(f"Successfully uploaded: {file_path}")
                save_upload_record(upload_record_file, file_path)

if __name__ == "__main__":
    main()
