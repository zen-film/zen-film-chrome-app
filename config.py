from authomatic.providers import oauth2, oauth1

CONFIG = {
    'flickr': {
        "class_": oauth1.Flickr,
        "consumer_key": "a8e63eee3671d28941a1d5ac6fd4867f",
        "consumer_secret": "56f85d80637824da",
        "user_authorization_params": "write"
    }
}
