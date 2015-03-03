import unittest
from main import find_similar_photos


class TestFindDoubles(unittest.TestCase):
    def test_find_simmilar():
        sys.argv[1] = '4368/'
        out = find_similar_photos()
        print(out)


if __name__ == '__main__':
    unittest.main()
