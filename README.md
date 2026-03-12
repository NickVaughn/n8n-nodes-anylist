# n8n-nodes-anylist

This is an n8n community node for [AnyList](https://anylist.com).

## 🚀 Features

- **List Resource:**
  - `Get All`: Retrieve names and IDs of all your lists.
- **Item Resource:**
  - `Add`: Add a new item to a specific list.
  - `Get All`: Retrieve all items within a list.
  - `Update`: Check or uncheck items.
  - `Remove`: Delete items from a list.
- **Recipe Resource:**
  - `Get All`: Retrieve all your AnyList recipes.
- **Meal Plan Resource:**
  - `Get All`: Retrieve all meal plan calendar events.
  - `Add`: Create new meal plan events (Notes or Recipes).

## 🛠️ Prerequisites

- An active **AnyList account** (Email and Password).

## 📦 Installation

### Via n8n UI (Recommended)
1. Go to **Settings > Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-anylist`.
4. Click **Install**.

### Manual Installation
In your n8n installation directory (usually `~/.n8n`):
```bash
npm install n8n-nodes-anylist
```

## ⚙️ Configuration

1. Add the **AnyList** node to your workflow.
2. Create a new **AnyList API** credential.
3. Enter your AnyList **Email** and **Password**.

## 📝 Development Note

This project was built almost entirely by **Gemini CLI** (an AI agent) as part of an automated development experiment. It is primarily intended for personal use, so extensive future development or active maintenance is not planned. 

If you find bugs or want to contribute, feel free to open a Pull Request on [GitHub](https://github.com/NickVaughn/n8n-nodes-anylist), but please keep in mind the "personal use" status of the project.

## 🏗️ Local Development

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Build the project: `npm run build`.
4. Link for local testing:
   ```bash
   npm link
   cd ~/.n8n
   mkdir -p custom
   cd custom
   npm link n8n-nodes-anylist
   ```

## 📄 License

[MIT](LICENSE)
