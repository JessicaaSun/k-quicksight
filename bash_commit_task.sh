#!/bin/bash

git add .
# shellcheck disable=SC2034
# shellcheck disable=SC2162
read -p "Enter your commit status: " commit
# shellcheck disable=SC2016
git commit -m '$commit'

# shellcheck disable=SC2162
# shellcheck disable=SC2034
read -p "Enter your repository name: " name
# shellcheck disable=SC2016
git push -u origin '$name'
