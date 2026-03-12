# n8n-nodes-anylist

This is an n8n community node for [AnyList](https://anylist.com).

## Features
- **List:** Get all lists.
- **Item:** Add, Get All, Update (check/uncheck).
- **Recipe:** Get all recipes.
- **Meal Plan:** Get all meal plan events.

## Prerequisites
- AnyList account (email/password).

## Installation
To install this node locally for development:
1. `npm install`
2. `npm run build`
3. `npm link`
4. In your n8n directory (e.g., `~/.n8n`): `npm link n8n-nodes-anylist`

Alternatively, once published to npm, it can be installed via the n8n UI.

## Usage
Add the "AnyList" node to your workflow and configure the "AnyList API" credentials with your AnyList email and password.
