import unittest
import random
import sys
import glob
from image_hash import image_hash
from PIL import Image


class TestContainerModel(unittest.TestCase):
    def setUp(self):
        self.path = 'test_image/'
        workdir = os.getcwd()

        os.chdir(self.path)

        self.photos = glob.glob('*.JPG')
        if len(self.photos) == 0:
            exit('Photos not found')

        os.chdir(workdir)


    def test_hash_working(self):
        pair = [
            ["square_brown.JPG", "square_violet.JPG"],
            ["triangle_pink.JPG", "triangle_blue.JPG"],
            ["circle_blue.JPG", "circle_red.JPG"]]
        self.assertTrue(
            isinstance(image_hash(
                Image.open(self.path + self.photos[0]))), str())

        grouped_photo = dict()
        for photo in photos:
            current_hash = image_hash(Image.open(os.getcwd() + "/" + photo), 5)
            if current_hash in grouped_photo:
                grouped_photo[current_hash].append(photo)
            else:
                grouped_photo[current_hash] = [photo]
        
        [group for k, group in grouped_photo.items() if len(group) > 1]



if __name__ == '__main__':
    unittest.main()
