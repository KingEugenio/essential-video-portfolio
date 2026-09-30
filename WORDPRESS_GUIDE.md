# HEADLESS WORDPRESS INTEGRATION GUIDE

This document explains how the portfolio platform communicates with a WordPress backend using the **Data Abstraction Layer** (`WordPressAdapter`), allowing WordPress to manage content without altering the frontend's visual design, shaders, or responsive behavior.

---

## 1. Architectural Model: Separation of Concerns

```text
┌────────────────────────────────────────────────────────┐
│                   WordPress CMS Layer                  │
│  - Project Titles, Descriptions, Client, Year, Tags    │
│  - Custom Post Types: `projects`, `services`, `reviews`│
│  - Media library URLs (CDN or Google Drive links)      │
│  - Testimonials and Service Catalog                    │
└───────────────────────────┬────────────────────────────┘
                            │ REST API Output (/wp-json/wp/v2/)
                            ▼
┌────────────────────────────────────────────────────────┐
│               Frontend Data Abstraction                │
│             (WordPressAdapter / IDataAdapter)          │
│  - Normalizes WP REST JSON into domain Project types   │
│  - Preserves 9:16, 16:9, 1:1 aspect ratio metadata     │
│  - Feeds data directly into Universal Video Player     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│               Frontend Presentation Layer              │
│  - 100% controls visual rendering, shaders, & layout   │
│  - Immune to WordPress theme styling interference      │
└────────────────────────────────────────────────────────┘
```

---

## 2. WordPress Custom Post Type Setup (PHP / functions.php)

Add the following snippet to your WordPress theme's `functions.php` or a custom MU-Plugin to expose projects via the REST API with full CORS support:

```php
<?php
/**
 * Register Custom Post Types for Headless Portfolio
 */
function ekopixels_register_portfolio_cpt() {
    register_post_type('projects', [
        'labels' => [
            'name' => 'Portfolio Projects',
            'singular_name' => 'Project',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'projects',
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields', 'excerpt'],
        'menu_icon' => 'dashicons-video-alt3',
    ]);
}
add_action('init', 'ekopixels_register_portfolio_cpt');
```

---

## 3. Recommended ACF (Advanced Custom Fields) Configuration

Create an ACF field group assigned to the `projects` post type with the following keys:

| Field Label | Field Name | Type | Description |
| :--- | :--- | :--- | :--- |
| **Video Playback URL** | `video_playback_url` | URL / Text | Direct MP4, Google Drive, or Stream URL |
| **Aspect Ratio** | `aspect_ratio` | Select | `16:9`, `9:16`, `1:1`, `4:5`, `4:3` |
| **Video Provider** | `video_provider` | Select | `direct_upload`, `google_drive`, `youtube`, `vimeo` |
| **Client** | `client` | Text | Client or Brand Name |
| **Year** | `year` | Text | Production Year (e.g. `2026`) |
| **Role** | `role` | Text | Editor, Colorist, Sound Designer |
| **Featured Project** | `featured` | True/False | Highlight on homepage |
| **Software Stack** | `software` | Text / Repeater | DaVinci Resolve, Premiere Pro, etc. |

---

## 4. Enabling Headless Sync in the Admin Portal

1. Log in to the Admin Portal (`?admin=true`).
2. Navigate to the **WordPress Sync** tab.
3. Enter your WordPress REST API Endpoint (e.g. `https://your-wp-site.com/wp-json/wp/v2`).
4. Select the custom post type (default: `projects`).
5. Click **Connect & Sync WordPress REST API**.
6. The frontend's `WordPressAdapter` will immediately query and normalize all projects.
