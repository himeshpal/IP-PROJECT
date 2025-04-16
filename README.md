# Reddit Feed Viewer

A real-time Reddit feed viewer built with React and Vite. This application fetches and displays Reddit posts, allowing users to browse content from their favorite subreddits.

## Project Structure

```
assets/
├── Output 1.jpeg        # Screenshot of the application interface
├── Output 2.jpeg        # Screenshot of the application interface
├── Output 3.jpeg        # Screenshot of the application interface
src/
├── RedditFeedViewer.jsx # Main component for displaying Reddit posts
├── index.css            # Global styles
├── main.jsx            # Entry point for the React application
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/IP-PROJECT.git
cd IP-PROJECT
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to the local server (typically http://localhost:5173)

## Features

- Fetch and display posts from Reddit
- Browse posts from different subreddits
- Responsive design for various screen sizes

## Usage

The application provides a simple interface to view Reddit content:

1. The main page displays the Reddit feed
2. You can modify the RedditFeedViewer component to customize which subreddits and content are displayed

## Application Screenshots

### View 1

![Application View 1](/assets/Output%201.jpeg)
_Main application interface_

### View 2

![Application View 2](/assets/Output%202.jpeg)
_Alternative view of the Reddit feed_

### View 3

![Application View 3](/assets/Output%203.jpeg)
_Mobile-responsive layout_

## Known Issues

There appears to be an import issue with RedditFeedViewer.jsx not providing a default export. Please ensure that your component exports correctly:

```jsx
// At the end of RedditFeedViewer.jsx
export default RedditFeedViewer;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
