from PIL import Image


def image_hash(image, hash_size=8):
    ''' Алгоритм просчета хеша от изображения
        1) Обесцветить изображение
        2) Сжать изображение до hash_size+1 х hash_size пикселей
           (теперь у нас есть матрица интенсивности цветов)
        3) Сравниваем соседние значения интенсивности в ней,
           коротко: если слева больше то истина,
           получаем квадратную матрицу размерностью hash_size,
           строки в которой можно назвать байтами (при hash_size = 8)
        4) Идем по строкам, получаем число, преобразуем его в hex
        5) Склеиваем все вместе - получаем хеш
    '''
    # Шаг 1 и 2
    image = image.convert('L').resize(
        (hash_size + 1, hash_size),
        Image.ANTIALIAS,
    )

    # Шаг 3
    diff = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = image.getpixel((col, row))
            pixel_right = image.getpixel((col + 1, row))
            diff.append(pixel_left > pixel_right)

    # Шаг 4
    hex_string = list()
    unpack_diff = [diff[hash_size*x:hash_size*(x+1)]
                   for x in range(hash_size)]
    for rec in unpack_diff:
        binary_str = ''.join([str(int(elem)) for elem in rec])
        decimal_value = int(binary_str, 2)
        hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))

    # Шаг 5
    return ''.join(hex_string)
