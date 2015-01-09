from PIL import Image


def image_hash(image, hash_size=8):
    ''' Алгоритм просчета хеша от изображения
        1) Обесцветить изображение
        2) Сжать изображение до 9х8 пикселей
           (теперь у нас есть матрица (9 на 8) интенсивности цветов)
        3) Сравниваем соседние значения интенсивности в ней,
           коротко: если справа больше то истина,
           получаем матрицу 8*8, строки в которой можно назвать байтами
        4) Идем по строкам, получаем число, преобразуем его в hex
        5) Склеиваем все вместе - получаем хеш
    '''
    # Шаг 1 и 2
    image = image.convert('L').resize(
        (hash_size + 1, hash_size),
        Image.ANTIALIAS,
    )

    # Шаг 3
    difference = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = image.getpixel((col, row))
            pixel_right = image.getpixel((col + 1, row))
            difference.append(pixel_left > pixel_right)

    # Шаг 4
    hex_string = list()
    unpack_diff = [difference[hash_size*x:hash_size*(x+1)]
                   for x in range(hash_size)]
    for rec in unpack_diff:
        binary_str = ''.join([str(int(elem)) for elem in rec])
        decimal_value = int(binary_str, 2)
        hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))

    # Шаг 5
    return ''.join(hex_string)
