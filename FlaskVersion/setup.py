from setuptools import setup

setup(
        name='WebAct',
        version='0.1',
        packages=['yourapplication'],
        include_package_data=True,
        zip_safe=False,
        install_requires=['Flask']
)

# Left This File for DevOps
# Deploying Folks should know how to do it
