import requests
import json
import os
import argparse
from tqdm import tqdm

def download_files(json_file):
    # 定义文件保存路径
    download_path = "downloads"
    if not os.path.exists(download_path):
        os.makedirs(download_path)

    # 读取JSON文件
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    total_files = len(data)
    print(f"总共 {total_files} 个文件需要下载")

    # 下载并保存文件
    for index, item in enumerate(data, start=1):
        name = item['name']
        link = item['link']
        filename = os.path.join(download_path, f"{name}.pdf")

        response = requests.head(link)
        file_size = int(response.headers.get('content-length', 0))

        print(f"正在下载第 {index}/{total_files} 个文件: {name} ({file_size / (1024 * 1024):.2f} MB)")

        response = requests.get(link, stream=True)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                with tqdm(total=file_size, unit='B', unit_scale=True, desc=name, initial=0, ascii=True) as pbar:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                        pbar.update(len(chunk))
            print(f"已下载: {name}")
        else:
            print(f"下载失败: {name} 从 {link}")

    print("所有文件下载完毕。")

def main():
    parser = argparse.ArgumentParser(description="从JSON文件中下载link所指向的文件，并以name命名文件夹")
    parser.add_argument('json_file', type=str, help='JSON文件的路径')

    args = parser.parse_args()

    download_files(args.json_file)

if __name__ == "__main__":
    main()