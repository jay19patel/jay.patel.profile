# Admin Authentication Setup

## Step 1: Create .env.local file

Create a file named `.env.local` in your project root and add:

```
# Admin Authentication
ADMIN_PIN=1234

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 2: Change Admin PIN

You can change the admin PIN by updating the `ADMIN_PIN` value in your `.env.local` file. For example:

```
ADMIN_PIN=9876
```

## Step 3: Access Admin Panel

1. Go to `/admin` in your browser
2. Enter your 4-digit PIN
3. You'll be logged in for 24 hours
4. To logout, click the "Logout" button in the admin header

## Security Features

- **4-digit PIN protection**: Only authorized users can access admin routes
- **Session expiry**: Automatically logs out after 24 hours
- **Brute force protection**: 1-second delay after wrong PIN attempts  
- **Local storage**: Remembers authentication state across browser sessions
- **Secure validation**: PIN is validated server-side via API

## Admin Features

- **Dashboard**: Overview of blog posts and quick actions
- **Blog Management**: Create, edit, and manage blog posts
- **Rich Content Editor**: Support for text, bullets, tables, notes, and links
- **Category Management**: Organize posts by categories
- **Tag System**: Add tags to posts for better organization

## Default PIN

The default PIN is `1234`. **Please change this in production!**

## Admin Routes

All routes under `/admin/*` are protected:
- `/admin` - Main admin dashboard
- `/admin/blog` - Blog management
- Future: `/admin/users`, `/admin/settings`, etc.

## Troubleshooting

If you can't access admin:
1. Check that `.env.local` file exists
2. Verify ADMIN_PIN is set correctly
3. Try clearing browser localStorage
4. Restart your development server

## Production Notes

⚠️ **Important for Production:**
1. Use a strong 4-digit PIN (not 1234)
2. Consider adding rate limiting
3. Use HTTPS for secure transmission
4. Regular backup of admin data 