#!/bin/bash

read -p "What do you want to do? (push/pull): " git_push_or_pull

if [ "$git_push_or_pull" = "pull" ]; then
  git pull origin dev
elif [ "$git_push_or_pull" = "push" ]; then
  npm run build
  git add .
  read -p "Enter your commit message: " commit
  git commit -m "$commit"

  read -p "Enter your repository name: " name
  git push origin "$name"
fi
