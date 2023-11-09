#!/bin/bash

git add .
read -p "Enter your commit status: " commit
git commit -m "$commit"

read -p "Enter your repository name: " name
git push origin "$name"