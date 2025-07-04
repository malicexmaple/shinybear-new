# Simple HTML Website - Yaki & Dori

This is a simplified HTML version of the Yaki & Dori website. It's much easier to use and deploy compared to the complex React application.

## What You Get

✅ **Simple Setup** - Just open index.html in any web browser  
✅ **Chinese Font** - Uses your QianTuXiaoTuTi font for all text  
✅ **Language Toggle** - Switch between English and Chinese  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **No Complex Dependencies** - No Node.js, React, or databases needed  

## How to Use

1. **Open the website**: Double-click `index.html` to open in your browser
2. **Add your content**:
   - Put your GIF files in the `gifs/` folder
   - Put videos in the `videos/` folder
   - Update the GIF data in the JavaScript section of index.html

## File Structure

```
simple-website/
├── index.html          # Main website file
├── fonts/
│   └── QianTuXiaoTuTi.ttf   # Your Chinese font
├── gifs/               # Place your GIF files here
│   ├── yaki-dancing.gif
│   ├── dori-dancing.gif
│   └── yaki-jump.gif
└── videos/             # Place video files here
    └── hero-video.mp4
```

## Adding Your GIFs

To add your own GIFs, edit the `gifs` array in the JavaScript section of index.html:

```javascript
const gifs = [
    { 
        id: 1, 
        title: "Yaki Dancing", 
        titleZh: "病鸡跳舞", 
        url: "./gifs/yaki-dancing.gif", 
        category: "yaki" 
    },
    // Add more GIFs here...
];
```

## Deployment

You can deploy this simple website to:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- Any web hosting service

Just upload all the files and your website will work immediately!

## Benefits Over Complex React App

- ✅ **No Build Process** - Works immediately
- ✅ **No Dependencies** - No package.json or node_modules
- ✅ **Easy to Edit** - Everything in one HTML file
- ✅ **Fast Loading** - No framework overhead
- ✅ **Easy Hosting** - Upload anywhere
- ✅ **No Database Needed** - All content in the HTML file

This simple version has everything you need without the complexity!