import unittest
import random
import sys
import os
import glob
from photoalbum import similar_photo
from PIL import Image


class TestContainerModel(unittest.TestCase):
    def setUp(self):
        self.pair = [
            ["square_violet.JPG", "square_brown.JPG"],
            ["triangle_pink.JPG", "triangle_blue.JPG"],
            ["circle_blue.JPG", "circle_red.JPG"]]
        workdir = os.getcwd()
        os.chdir('test_image/')
        self.photos = glob.glob('*.JPG')
        os.chdir(workdir)

    def test_find_similar(self):
        similar = similar_photo.get_similar_photos('test_image', 5)
        print(sorted(similar))
        print(sorted(self.pair))
        self.assertTrue(all(x in self.pair for x in similar))

if __name__ == '__main__':
    unittest.main()
