#!/bin/bash
# Check if there are changes to commit

# Try committing changes
git commit -m "* Automated webpage compilation *"

# Check exit code
if [ $? -eq 0 ]; 
then
  # Commit sucessful - go ahead and push
  echo "Commited all changes"
  git push origin main
else
  # Probably no changes to commit - ignore and exit
  # $DEPLOY=false
  echo "No changes to commit!"
fi

exit 0
