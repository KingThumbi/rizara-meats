from setuptools import setup, find_packages

setup(
    name="rizara_meats",
    version="0.1",
    packages=find_packages(where="backend"),
    package_dir={"": "backend"},
)
