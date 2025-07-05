import logging
import os
from datetime import datetime

log_directory = os.path.join(os.path.dirname(__file__), '..', 'logs')
if not os.path.exists(log_directory):
    os.makedirs(log_directory)

current_date = datetime.now().strftime('%Y-%m-%d')
log_file = os.path.join(log_directory, f'database_{current_date}.log')

log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def get_logger(name: str = 'app'):
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(log_format)
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(log_format)
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    return logger
