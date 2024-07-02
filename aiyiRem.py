# rename and create num json
import os
import json

# 示例数据
numjson = {
    "jpg": 0,
    "png": 0,
    "jpeg": 0
}

def rename_images(path, type):
    # 获取目录下所有文件名
    files = os.listdir(path)
    # 遍历每个文件
    for file in files:
        # 判断是否为图片文件（这里假设后缀名为.jpg）
        if file.endswith("."+type):
            # 构造旧文件名和新文件名的完整路径
            old_name = os.path.join(path, file)
            new_name = os.path.join(path, f'{numjson[type]}.{type}')
            # 重命名文件
            os.rename(old_name, new_name)
            # 打印信息（可选）
            print(f'Renamed {old_name} to {new_name}')
            # 计数器加1
            numjson[type] += 1

def create_json_file(data, filename):
    # 将数据写入到 JSON 文件
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)  # 使用缩进美化输出格式


# 指定需要重命名的目录路径
# folder_path = "D:\\Nicholas\\images\\aiyiRem"
folder_path = "D:\\Nicholas\\kilalabest\\public\\aiyiRem"

# 调用函数进行重命名
rename_images(folder_path,"jpg")
rename_images(folder_path,"png")
rename_images(folder_path,"jpeg")

# JSON 文件名
json_filename = 'aiyiRem.json'

# 创建 JSON 文件
create_json_file(numjson, json_filename)

print(f'JSON 文件 "{json_filename}" 创建成功.')
