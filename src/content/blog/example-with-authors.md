---
title: 'Example Post with Authors'
description: 'This is an example post showing how to use the author system'
pubDate: 'Jul 15 2025'
author: 
  - name: 'UmmIt'
    avatar: '@https://avatars.githubusercontent.com/u/128139875?v=4'
  - name: 'Leon dude'
    avatar: 'AM'
---

This is an example post showing how to use the author system with external URLs for avatars.

You can use GitHub avatars or any other external image URL by prefixing with `@`:

```yaml
author: 
  - name: 'UmmIt'
    avatar: '@https://avatars.githubusercontent.com/u/128139875?v=4'
  - name: 'Another me'
    avatar: 'AM'  # This will use local assets or fallback to initials
```

The system automatically handles:
- External URLs (with @ prefix)
- Local avatar files 
- Fallback to initials if no avatar is found 