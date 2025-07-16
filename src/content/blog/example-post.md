---
title: 'Example Post with Authors'
description: 'This is an example post showing how to use the author system'
pubDate: 'Jul 15 2025'
author: 
  - name: 'UmmIt'
    avatar: 'ummit.png'
  - name: 'Another me'
---

## Author System Usage

This post demonstrates the different ways to add authors to your blog posts.

### 1. Single Author (String)
```yaml
author: 'UmmIt'
```

### 2. Multiple Authors (Array of Strings)
```yaml
author: ['UmmIt', 'Another me']
```

### 3. Authors with Custom Avatars
```yaml
author: 
  - name: 'UmmIt'
    avatar: 'ummit.png'  # Image in src/assets/authors/
  - name: 'Another me'       # No avatar = uses initials
```

## Avatar System

The system supports:
- **Custom Images**: Place images in `src/assets/authors/` folder
- **Auto-naming**: Images named after author (e.g., `ummit.png` for "UmmIt")
- **Fallback**: Shows initials if no image is found
- **Multiple Formats**: Supports PNG, JPG, etc.

## How to Add Author Icons

1. **Create the image**: Save your author image as `src/assets/authors/authorname.png`
2. **Use in frontmatter**: Either specify the `avatar` field or let it auto-detect
3. **Fallback**: If no image is found, it shows colored initials

The system automatically generates beautiful gradient avatars with initials as fallbacks! 