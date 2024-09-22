# rename and create num json
import os



def rename_images(path):
    # 获取目录下所有文件名
    num = 0
    files = os.listdir(path)
    # 遍历每个文件
    for file in files:
        # 判断是否为图片文件（这里假设后缀名为.jpg）
        if file.endswith(".jpg"):
            # 构造旧文件名和新文件名的完整路径
            old_name = os.path.join(path, file)
            new_name = os.path.join(path, str(num) + ".jpg")
            num += 1
            # 重命名文件
            os.rename(old_name, new_name)
            # 打印信息（可选）
            print(f"Renamed {old_name} to {new_name}")


# 指定需要重命名的目录路径
# folder_path = "D:\\Nicholas\\images\\aiyiRem"
# folder_path = "D:\\Nicholas\\kilalabest\\public\\aiyiRem"
folder_path = "C:\\Users\\Nicholas\\Desktop\\Nicholas\\TransferStation\\temp"

# 调用函数进行重命名
rename_images(folder_path)
