from setuptools import setup, find_packages

setup(
    name="rizara_meats",
    version="0.1",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Flask',
        'Flask-SQLAlchemy',
        'Flask-JWT-Extended',
        'Flask-Cors',
        'python-dotenv',
        'setuptools'
    ],
    entry_points={
        'console_scripts': [
            'rizara-backend = backend.app:app'
        ]
    },
)
