# Portfolio Website - Anoop

A modern, responsive portfolio website showcasing my work as a Cybersecurity & Blockchain Developer. The site integrates with GitHub API to dynamically display projects and features a beautiful, user-friendly interface.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Beautiful gradient designs and smooth animations
- **GitHub Integration**: Automatically fetches and displays projects from GitHub
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Elements**: Hover effects, animations, and dynamic content
- **Mobile-Friendly**: Hamburger menu for mobile navigation
- **Performance Optimized**: Fast loading times and efficient code

## 📋 Sections

1. **Hero Section**: Introduction with social links and call-to-action buttons
2. **About**: Personal information and statistics
3. **Skills**: Technical skills and expertise areas
4. **Projects**: GitHub repositories displayed dynamically
5. **Contact**: Links to LinkedIn, GitHub, and email

## 🚀 Getting Started

### Prerequisites

No prerequisites required! This is a static website that runs entirely in the browser.

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The website will load automatically

### Local Development

For the best experience, you can use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 File Structure

```
portfolio/
├── index.html      # Main HTML file
├── style.css       # Stylesheet with all styling
├── script.js       # JavaScript for interactivity and GitHub API
└── README.md       # This file
```

## 🔧 Customization

### Update Personal Information

Edit `index.html` to update:
- Name and title in the hero section
- About section content
- Contact information
- Skills and technologies

### Customize Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more variables */
}
```

### GitHub Username

Update the GitHub username in `script.js`:

```javascript
const GITHUB_USERNAME = 'seenumehta'; // Change to your username
```

### Featured Projects

Update the featured projects list in `script.js`:

```javascript
const FEATURED_PROJECTS = [
    'CROWEDfund',
    'Dlottery-application',
    // Add your project names here
];
```

## 🌐 Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select the main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop the folder containing your files to Netlify
2. Your site will be automatically deployed
3. Get a free custom domain or use the provided Netlify subdomain

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### Other Hosting Options

- **Firebase Hosting**: Free hosting with CDN
- **AWS S3**: Static website hosting
- **Cloudflare Pages**: Fast global CDN

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔗 Links

- **GitHub**: [github.com/seenumehta](https://github.com/seenumehta)
- **LinkedIn**: [linkedin.com/in/anoop8607](https://www.linkedin.com/in/anoop8607/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts (Poppins) for typography
- GitHub API for project data

## 📧 Contact

For any questions or suggestions, feel free to reach out:

- **LinkedIn**: [linkedin.com/in/anoop8607](https://www.linkedin.com/in/anoop8607/)
- **GitHub**: [github.com/seenumehta](https://github.com/seenumehta)

---

Made with ❤️ by Anoop

