---
title: \[DEPRECATED] GitHub Actions - automation galore!
templates: []
groups: []
date: 2021-06-14 09:34:00
---

**_This post is a work in progress!_**

...

I've finally gotten around to using GitHub actions for the first time, and boy, can it automate the living crap out of building, testing and deployment. In fact, I've updated this website's [GitHub repo](https://github.com/ChromeUniverse/Personal-website) with a custom workflow built around GitHub Actions to automate static file generation and deployment of my website. It's a really useful tool that you might be interested in using for web app development.

## [GitHub Actions](https://github.com/features/actions) basics

Actions is a relatively new feature on GitHub that lets you automate software _workflows_ (such as build, testing, code review, deployment, merging code from different branches, metric tracking, etc.) that are triggered when a certain event happens in your GitHub repo (push to a `main` branch, submitted pull request, merge, `cron` schedule, new release, etc.). 

You create workflows by writing a YAML file that specifies the jobs that you want to run and what event will trigger those jobs to run. A simple workflow for a building a Node.js app would look something like this:

```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x, 12.x, 14.x, 15.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test

```

Notice how the [syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) for these workflow files is quite human-readable and reasonably simple to understand, even if you don't have any prior experience with Actions.

I'm not going into too much detail about what the workflow above does - for that, you can read [this great tutorial](https://www.freecodecamp.org/news/what-are-github-actions-and-how-can-you-automate-tests-and-slack-notifications/) from freeCodeCamp for a step-by-step breakdown - instead, I'd like to use this post to describe a practical use case for GitHub Actions and how I set up an automated build/deploy workflow for the website that you're using right now to read this article.

---

## Actions workflow for my personal website

I set up Actions to automate the webpage compilation process and deployment of this website. My full workflow file is available [here](https://github.com/ChromeUniverse/Personal-website/blob/main/.github/workflows/compile-deploy.yaml). 

```yaml 
# name of the workflow
name: Build and deploy website

on: 
  # events that trigger workflow

jobs:

  # compile webpages 
  build:
    runs-on: ubuntu-latest
    steps:
    # steps/commands to run

  # deploy website to AWS Lightsail
  deploy:    
    needs: build
    runs-on: ubuntu-latest
    steps:
    # steps/commands to run
```


Here's what my workflow is basically doing:

1. It's triggered by pushes to the `main` or `test` branches

2. It compiles the webpages by running [this script](https://github.com/ChromeUniverse/Personal-website/blob/main/compiler.jss) and generates the website's HTMLs

3. Commits and pushes the HTMLs back to the remote repo

4. Logs in to a remote AWS Lightsail server using SSH (yes, surprisingly, it is possible to use Actions to log in to remote hosts)

5. Runs an update script on the server which pulls changes from the remote repo and restarts the Node.js server with [pm2](https://www.npmjs.com/package/pm2)

Let's breakdown these steps:

### 1. Events

This is basically as simple as it gets when it comes to [events](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#on). Events are specified with the `on:` keyword. My workflow starts running when pushes are made to either the `main` or `test` branches.

```yaml
on: 
  push:
    branches: 
      # Main branch
      - main
      # Testing branch
      - test
```

### 2. Webpage compilation

My webpage compiler is a JS script which takes my Markdown-formatted posts, fetches some HTML and CSS templates, and converts them to HTMLs ready to be served by my main webserver. It needs Node.js and a couple of dependencies to run - thankfully, there's already a specific action for installing Node and NPM with GitHub actions, [setup-node](https://github.com/actions/setup-node).

Both the compiler and Git commit/pushes run on the `build` job.

A couple of quick notes on jobs:
* You need to specify the operating system that each job will run on. I always choose Ubuntu Linux for simplicity's sake.

* If your job needs to access your source code (for running tests, compiling, building, etc.), you'll need to use the [`checkout`](https://github.com/actions/checkout) action to get your code into the workflow runner.

* Each job has a sequence of tasks called `steps`. Each `step` can have only one `run` statement, but you can run always run multiple commands by using `run: |` and a sequence of commands, with one command per line.

```yaml
# compile webpages 
build:

  runs-on: ubuntu-latest

  steps:

  # Check out code
  - uses: actions/checkout@v2

  # Node.js setup
  - name: Setting up Node.js!
    uses: actions/setup-node@v1    
    with:
      node-version: 14.x

  # Install packages with NPM
  - name: Install dependencies
    run: npm ci

  # Compile webpages
  - name: Compile all webpages
    # NOTE: specify server address - in this case, it's 34.200.98.64:3000
    run: node compiler.js 34.200.98.64:3000
```

In the workflow snippet above, I've told the runner to install Node.js version 14, install my NPM packages with `npm ci`, and run my webpage compiler with the address of this webpage as an argument (I've added this feature to make it easier to compile webpages for both local development and deployment).

### 3. Git commits, user config, and pushes

The following steps are run in the same `build` job as before:

```yaml
jobs:

  # compile webpages 
  build:

    runs-on: ubuntu-latest

    steps:

    # ...
    # compiler steps
    # ...

    # List file changes
    - name: Log file changes
      run: git status

    # Stage all changes
    - name: Stage all files
      run: git add .

    # Push Config
    - name: Git config
      run: | 
        git config --global user.name 'MY_GITHUB_USERNAME' 
        git config --global user.email 'MY_EMAIL'
    
    # Commit changes
    - name: Commit and push changes
      # run commit bash script
      run: |
        chmod +x commit-push.sh
        ./commit-push.sh

  # end of `build` job

```

After running the compiler, the workflow stages all files, configures the local Git repo with my personal GitHub credentials, and runs a Bash script. It tries to commit the files, and if the commit is successful, it pushes the files to the remote repo. 

I was having some issues where the workflow would fail if there were no changes in the files, since `git commit` only exits with code 0 if there are files with untracked changes. This simple Bash script fixes that issue:

```bash
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
```


### 4. Creating an SSH identity file

Since I couldn't find any specific actions for deploying to AWS Lightsail (my VPS of choice), I chose to deploy my website the hard way: use SSH to log in to my Lightsail instance and then run whatever commands I need to on the remote host. All of this SSH stuff is handled in the `deploy` job. 

The really cool thing about doing it "the hard way" is that you can use it for deploying code to just about any VPS and any cloud service provider, not just AWS' Lightsail or EC2 machines. You could most certainly use this same approach for VPSes from Linode, GCP, Azure, Digital Ocean or even a self-hosted server of your own, like a Raspberry Pi 4.

I originally discovered about this method in [this post](https://blog.bugout.dev/2020/06/19/using-github-actions-to-deploy-to-aws-lightsail/) by Neeraj Kashyap of the [bugout.dev](https://blog.bugout.dev/) blog. In the article, he mentions this [great guide](https://www.linode.com/docs/guides/use-public-key-authentication-with-ssh) by Linode **(which you should definitely read ASAP)** on how to properly generate and setup SSH public/private key pairs with `ssh-keygen`.

In short, after generating your SSH private key, you'll encode it with Base64 and [store the encoded key as a _secret_ in your GitHub repository](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) (read below for more on secrets). On Mac/Linux, you can use the `base64` command to encode your private SSH key - chances are it's called `id_rsa`. Be sure to use `-w0` to remove line breaks:

```sh
lucca@ThinkBook-13s:~$ base64 -w0 ~/.ssh/id_rsa
```

[Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) are super handy for hiding oh-so-precious auth tokens for APIs and Discord bots, SSH keys, credentials such as username/password combinations and other sensitive data. Your workflow can fetch the secret, decode it and use it to generate an identity file on the runner to use it as a private key for SSH login.

Some additional notes:
* Since jobs in a workflow run in parallel by default, you'll need to use the `needs:` keyword to specify the other jobs that should before the current one.

* You'll need to use `chmod` to make the identify file readable by the root user, at least - something like `chmod 400` should work just fine.

```yaml
jobs:
 
  build:
  # ...

  # deploy website to AWS Lightsail
  deploy:    

    # only run after "build" job is complete
    needs: build

    runs-on: ubuntu-latest

    steps:

    # Creating SSH private key
    - name: Create identity file

      # Get BASE64-encoded private key stored in secret
      env:        
        DEPLOYMENTKEY: ${{ secrets.DEPLOYKEY }}

      # Decode with BASE64, change permissions with chmod        
      run: | 
        echo "$DEPLOYMENTKEY" | base64 --decode  >deployment.key
        chmod 400 deployment.key

    # SSH into AWS Lightsail
    - name: SSH Login + Update

      # Login with deployment.key, run bash script 
      run: |
        ssh -v -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i deployment.key ubuntu@34.200.98.64 /home/ubuntu/Personal-website/update.sh
```


### 5. Running the update script

Run the update script over SSH:

```sh
ssh -v -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i deployment.key ubuntu@34.200.98.64 /home/ubuntu/Personal-website/update.sh
```



