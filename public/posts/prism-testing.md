---
title: Trying out Prism.js
templates: []
description: | 
  A short essay about trying out a frontend library for syntax highlighting and improved code blocks, **Prism.js**
groups: [all, programming, webdesign]
date: 2021-05-30 17:38:00
--- 

I've just added a new library to my website, [Prism.js](https://prismjs.com/), which adds syntax highlighting and overall better code snippets. 

Since my posts often place a heavy emphasis on coding, I figured that having quality code snippets with adequate syntax highlighting (among other things) will add a lot of value to my programming-related posts. 

And from the looks of it, Prism is working pretty well. Just to demonstrate, here are a couple of example code snippets.

The first example code snippet is a small part of the main `bot.py` file from my [RedstoneBot](https://github.com/ChromeUniverse/RedstoneBot) project, written in Python.


```python
# module imports
import asyncio
import aiohttp
import discord
from discord.ext import commands

# function imports from files
from login import login
from format_help import format_help
from get_status import get_status
from get_times import get_times
from activate import activate
from deactivate import deactivate
from reactivate import reactivate
from register import register
from leave_queue import leave_queue
from unregister import unregister
from get_list import get_list

# member role functions
from role_functions import (
    check_user,
    check_admin,
)

# database functions
from db_functions import (
    link,
    guild_in_db,
    IP_in_db,
    get_serverID,
    get_looping,
    update_looping,
    deleteEntry,
)

# credentials
from credentials import (
    username,
    password,
    token,
)

# -----------------------------------------------------------------
# Discord setup
# -----------------------------------------------------------------



# command prefix
client = commands.Bot(command_prefix = '!redstone ')

# Redstone dust reddish color for Rich Embeds
redstoneRed = discord.Colour.from_rgb(221,55,55)

# removing default Help command
client.remove_command('help')

# bot startup
@client.event
async def on_ready():
    # retrieving aiohttp ClientSession
    global session_list
    session = session_list[0]

    # logging in to ploudos.com
    login_status_code = await login(username, password, session)
    print('\nLogin status code: ' + str(login_status_code))

    print('Bot is ready to roll!\n')



# -----------------------------------------------------------------
# Discord commands
# -----------------------------------------------------------------


# help command - shows useful help page w/ commands + other things
@client.command()
async def help(ctx):

    title, content = format_help()
    # format and send rich embed
    page=discord.Embed(
        title=title,
        description=content,
        colour=redstoneRed
    )
    await ctx.send(embed=page)





# ping command - replies with "Pong!" + connection latency in miliseconds
@client.command()
async def ping(ctx):
    await ctx.send(f'Pong! :ping_pong: Connection latency is {round(client.latency * 1000)}ms')

```

For the second example, I'll try a code snippet in C++. This is a [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) parser and evaluator that I wrote a couple of months ago with the help of my friend [Eduardo Quirino](https://github.com/qrno).

```c++
/*
    -- RPN Parser --

    Parses and evaluates reverse polish
    notation expressions.

*/


#include <iostream> // input/output
#include <typeinfo>
#include <stack>    // stack data structure
#include <queue>
#include <math.h>   // quick maths
#include <string>   // guess what this does?
#include <sstream>  // stringstreams

#include <vector>

using namespace std;


/*
numberStack.push(5); -> puts element into stack
numberStack.pop();   -> removes top element
numberStack.top();   -> gets top element

numberStack.size()   -> number of elements
numberStack.empty()  -> [BOOL] whether it is emtpy
*/




// Returns whether string is a number
bool isNumber(string s) {
  // looping over chars in string

  // checking for empty input
  if (s.size() == 0) return false;

  for (int i = 0; i < s.size(); i++) {
    char letter = s[i];

    // check if letter isn't digit or decimal point
    if (letter < '0' || letter > '9') {
      // checks minus case
      if ((letter == '-' && i == 0) && s.size() > 1)
        continue;
      // checks decimal point case
      if (letter == '.') continue;

      return false;
    }
  }
  // found an actual number
  return true;
}





// Splits expression into queue
queue<string> string2queue(string expression) {
  queue<string> token_queue;
  /*
  token_queue.push(3)   -> enqueues element
  token_queue.pop()     -> dequeues element
  token_queue.front()   -> gets first element
  */

  // empty string token
  string token = "";

  // iterating through expression
  for (int i = 0; i < expression.size(); i++) {
    char letter = expression[i];

    // adding letter to token
    if (letter != ' ') token += letter;
    else {      // found a whitespace char
      if (!token.empty()) { // protects against multiple whitespaces
        // ready to push token to queue
        token_queue.push(token);
        //cout << "This is token, right here: " << token << endl;
        token="";
      } // else, just another whitespace, keep going
    }
  }
  // adds token at the end of the expression (edge case)
  if ( !token.empty() ) token_queue.push(token);

  return token_queue;
}




// print elements in a queue
void print_queue(queue<string> q){
  int i = 0;
  while (!q.empty())
  {
    cout << i << "-th element: " << q.front() << endl;
    q.pop();
    i++;
  }
  cout << endl;
}




// evaluate RPN expression
double solve(string expression) {

  // generating queue of tokens
  queue<string> token_queue = string2queue(expression);

  /*
  // print copy of token_queue
  queue<string> q_copy = token_queue;
  print_queue(q_copy);
  */


  // big 'ol stack of numbers
  stack<double> numberStack;

  while (!token_queue.empty()) {
    // getting the token at the front of the queue
    string token = token_queue.front();
    token_queue.pop();

    // checking if token is a number
    if (isNumber(token)) {
      //cout << token << " is number\n";

      // Converting string token to double
      double numToken = stod(token);
      // pushing number to stack
      numberStack.push(numToken);
    } else {
      // found an operator
      if (numberStack.size() < 2) {
        cout << "SYNTAX ERROR - Not enough numbers in stack\n";
        exit(1);
      }

      // getting and popping the RH operand
      //cout << numberStack.top() << " is a: " << typeid(numberStack.top()).name() << endl;
      double b = numberStack.top() + 0.0;
      numberStack.pop();
      //cout << b << " is: " << typeid(b).name() << endl;
      // getting and popping the LH operand
      //cout << numberStack.top() << " is a: " << typeid(numberStack.top()).name() << endl;
      double a = numberStack.top() + 0.0;
      numberStack.pop();
      //cout << a << " is: " << typeid(a).name() << endl;

      // operation result
      double result = 0;

      // executing operation
      if (token == "+") result = a + b;           // addition
      else if (token == "-") result = a - b;      // subtraction
      else if (token == "*") result = a * b;      // multiplication
      else if (token == "/") result = a / b;      // division
      else if (token == "^") result = pow(a, b);  // exponentiation
      // checking for invalid operators
      else {
        cout << "INVALID INPUT - This operator doesn't exist\n";
        exit(1);
      }

      // pushing result to number stack
      numberStack.push(result);
    }
  }

  // cheking the size of the number stack
  int stackSize = numberStack.size();

  // If we got anything other than one, something went wrong.
  if (stackSize != 1) {
    cout << "SYNTAX ERROR - Not enough operators\n";
    exit(1);
  }

  // Pop result and print it
  double result = numberStack.top();
  numberStack.pop();

  return result;
}





// list of test expressions & expected output
vector< pair<string, double> > tests{
  /*1*/{"2 3 +", 5},
  /*2*/{"2 3 *", 6},
  /*3*/{"-123123 -123123 +", -246246},
  /*4*/{"2 2 + 3 - 123 - 24 *", -2928},
  /*5*/{"5 3 + 7 15 * 8 + -", -105},
  /*6*/{"2.00 3.99 +", 5.99},
  /*7*/{"4.00 2.00 /", 2.00},
  /*8*/{"2.0 5.0 ^", 32.0},
};





// run test expressions
bool runTests() {
  bool success = true;

  // looping through tests
  for (auto test : tests) {
    // solve expression
    double result = solve(test.first);

    // comparing solve() output with expected output
    if (result != test.second) {
      // current test failed
      cout << "FAILED TEST " << test.first << endl;
      cout << "EXPECTED " << test.second << " GOT " << result << endl;
      success = false;
    }
  }
  return success;
}






// main program function
int main() {

  // run test expressions
  bool success = runTests();
  if (success) cout << "SUCCESS!";


  string expression;

  // read RPN expression
  cout << "Enter RPN: ";
  getline(cin, expression);

  // evaluate expression
  double result = solve(expression);

  // print output
  cout << result << endl;
  

  return 0;
}
```

Finally, I'm going to try out some Javascript. This is the classic memoized Fibonacci sequence program in JS:

```js
var fibList = [];

function fib(num) {
  if (num == 1 || num == 2) {
    return 1;
  } else {
    return fib(num-1) + fib(num-2);
  }
}

function main(num){
  console.log("The first " + num + "Fibonacci numbers are: ");
  for (var i = 1; i < num+1; i++) {
    fibNum = fib(i);
    console.log("Fib number " + i + ": " + fibNum);
  }
}

main(50);

```

Yep, Prism.js is definetely working as advertised. 😃

Expect to see it used quite regularly in my future posts.