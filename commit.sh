#!/bin/bash
# Check if there are changes to commit

git commit -m "* Automated webpage compilation *"

if [ $? -eq 0 ]; 
then
  echo "Commited all changes"
else
  echo "No changes to commit!"
fi

exit 0
