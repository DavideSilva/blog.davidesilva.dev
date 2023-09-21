---
title: Developer Productivity
description: >-
  I like to think that I am a productivity oriented person. If there is a faster
  or more efficient way of doing a task, I tend to incorporate that as part of
  my workflow. This can be small things like being able to jump directly to a
  certain application without having to do the `CMD+Tab` dance or being able to
  run a test without having to leave my editor.
pubDatetime: 2022-04-10T23:00:00.000Z
tags:
  - Neovim
  - Productivity
  - Development
canonicalURL: 'https://blog.finiam.com/developer-productivity'
---

I like to think that I am a productivity oriented person. If there is a faster or more efficient way of doing a task, I tend to incorporate that as part of my workflow. This can be small things like being able to jump directly to a certain application without having to do the `CMD+Tab` dance or being able to run a test without having to leave my editor.

![image](https://cdn.sanity.io/images/5aprln8a/production/38138fcd778521977ce64e68ba85ae0e798141fc-750x942.png?w=450)

As a long time Vim user, I also like to avoid using my mouse as much as possible.
Therefore, my current development setup is optimized so that I can perform most of my tasks using only the keyboard. I'll try to be as much editor agnostic as I can because it is not so much about a specific editor configuration, as it is more about the general workflow, but the examples I'll give will be in [Neovim](https://neovim.io/) as that is my preferred text editor.

# What to improve

There are a few things that I consider any developer should focus in order to improve their development workflow:

* Basic file navigation
* Jump to definitions or references
* Run a test

## Basic file navigation

Being able to quickly navigate a codebase, of any size, is a crucial skill for any developer. There are basically two phases of understanding a new codebase. There's the "everything is new and I don't know where anything is" phase and the "I know this codebase like the palm of my hand" phase. The method for navigating a codebase should also change with your increased understanding.

### Tree based navigation

When we first start navigating a new codebase, we can make some educated guesses of where some of the logic is but we don't yet know exactly how the files are called or how the project is structured. If we are using a framework, we can expect some structure already, but this is not true for all the cases.
Surprisingly enough, the best way to become more familiar with the codebase is by looking through it. Seeing where things are in relation to another, how is the folder structure organized, any filename that might be worth having a deep dive, etc.

![image](https://cdn.sanity.io/images/5aprln8a/production/24d8a9d7f8c95eb1730bd60fa63d03e222d6c342-321x267.png?w=450 "tree view of the project structure")

This is nothing new as file tree explorers have been a crucial part of most text editors, either natively or via a plugin, for a while. However, one feature that people seem to not know exists, is being able to show the location of a file in the tree.
Let's say that we need to make a change but we don't know exactly where the actual logic is. We know of a place to start but, as we are still very new to the codebase, we need to start jumping to function definitions or opening other files until we finally arrive at our destination. We finally found the file at the end of the chain but now we realize that our file explorer is closed and we have no idea of where we are. Most file tree explorers have a functionality that allows us to open our tree but instead of showing the root folder, opening the tree showing the current path until our current folder.
Voilà! We now know exactly where we are and the path we took.

![image](https://cdn.sanity.io/images/5aprln8a/production/503d4933e0fba64858f5dfc07e610be4635c0c45-1920x1080.png?w=840 "the file that we don't know where it is")

![image](https://cdn.sanity.io/images/5aprln8a/production/918b751af64c4a6e379fc643c036b9404011a945-1920x1080.png?w=840 "the tree view with the opened folders until our file")

*Disclaimer: some editors may do this automatically or just require a keyboard combination or running a command. In others, you might have to configure something first.*

### Fuzzy finders

Tree based navigation is very useful and in some situations even superior to fuzzy finding. When we are looking through a folder to find a file but we don't really know its name or just when we want to have a sense of the size of the project. However, when we already know exactly where we want to go, having to navigate through the file tree is slower than just opening a prompt and typing the name of the file we want to open.
Fuzzy finding is just better because we don't need to fully type the name of the file we want. We can just start typing some of the characters that are part of the name of the file and we can usually get to the file very quickly.

![image](https://cdn.sanity.io/images/5aprln8a/production/432a0515cf60dbc60e9e30508589fce751a4761b-1920x1080.png?w=840 "file finder prompt")

![image](https://cdn.sanity.io/images/5aprln8a/production/ca7f51f7eedb31fd3dbab826c038034c0abe5f53-1920x1080.png?w=840 "our file after typing a few characters of the filename")

## Jump to definitions or references

Now that we know how to navigate our project quickly, we find a function that we don't know what it does or where it is defined. Having to stop our mental process to go find the file and scroll through to the function declaration is wasted time. Even more so if the function calls another function that calls another function.
What we really want is to put our cursor on top of the function call and, with a shortcut, jump to the function declaration. That way, we don't have to do the cognitive shift from reading code, to finding code, and back.
Another useful shortcut is showing all the places where a function is referenced. Let's say that we need to add a new parameter to a function. We will need to find all the places where the function is called to add the new parameter. Doing that so manually, is considerably slower than having our editor just compile a list that we can scroll through.

![Function Call](https://cdn.sanity.io/images/5aprln8a/production/87f839d2bb9f00d9cd868aa57610ba7d6ab50a41-1920x1080.png?w=840 "hovering 
over the function call")

![Function Definition](https://cdn.sanity.io/images/5aprln8a/production/1cb86a8c56975c82c60d1af7e5d7016dcf89c2f5-1920x1080.png?w=840 "jump to function definition after a keystroke")

Thanks to the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), we can now do just that. The installation varies from editor to editor, so I won't give any instructions here on how to install or configure it, but finding the appropriate installation instructions for your editor is just a matter of asking Google. The LSP also provides other functionalities that you should probably look into, like showing the documentation for a function or code formatting, and many more.

## Run a test without leaving the editor

Here, at finiam, we follow a TDD approach when developing. Having to switch from the editor to the terminal to run the tests is wasted time, even if the terminal is incorporated in our editor.
Let's say we are writing a new test file. Having a shortcut to automatically start and run the test for us is a major time saver. We can even have different shortcuts to either run that specific test or run the entire test file or even the test suite.

![Test](https://cdn.sanity.io/images/5aprln8a/production/5b3aa1d4f933708435d9be5a258f79b488ff80f4-1920x1080.png?w=840 "running a test with a keystroke")

There's another implicit advantage of being able to run the tests from our editor. If the barrier for running a test is just a simple keystroke combination away, we are more likely to run the tests when writing our code. If, for instance, running the tests is a process that forces us to switch from our editor to a terminal and typing the command to run the tests, we are more prone to skip them because we don't want to lose our focus. I am also guilty of this. I was once in a project that had a test configuration that forced us to start a Docker container to run the tests. I wasn't able to do my shortcuts to run the tests and, more times than I'd like to admit, I'd skip running the tests locally. The CI ends up having to do extra work when we open a PR for something that breaks the tests that we could have found locally, had we just run the tests. Eventually, we refactored that project enough that we didn't have to use Docker locally and I was back to using my shortcuts.

# Conclusion

These small time save improvements end up compounding without you even noticing. The motivation is not to just be quicker at doing things but to shift the mental load of doing some repetitive tasks to muscle memory.
If every time we want to run a test or open a new file, we need to stop what we are doing and focus on doing that task instead, we lose track of that mental model that we spent so long building and we need to start again.

Take those boring tasks and make them so easy and so repeatable to do that eventually they become muscle memory and we don't even need to actively think about what we are doing.
