# WordPress Headless Integration Guide

This guide details how to integrate your WordPress CMS with the Video Editor Portfolio frontend.

---

## 1. Core Concept

WordPress acts exclusively as the **Content Management Layer** (data store), while the React frontend retains complete control over **Presentation** (design, animations, video player skins, and responsive behavior).

```text
WordPress Dashboard (Admin)
        ↓
WordPress REST API (/wp-json/wp/v2/portfolio_project)
        ↓
WordPressAdapter.ts
        ↓
PortfolioContext (React)
        ↓
Public Website UI
```

---

## 2. Registering the Custom Post Type (`portfolio_project`)

Add the following snippet to your theme's `functions.php` or a custom site-specific plugin:

```php
<?php
// Register Custom Post Type: Portfolio Project
function register_portfolio_cpt() {
    $labels = array(
        'name'                  => _x('Projects', 'Post Type General Name', 'cinefolio'),
        'singular_name'         => _x('Project', 'Post Type Singular Name', 'cinefolio'),
        'menu_name'             => __('Portfolio', 'cinefolio'),
        'all_items'             => __('All Projects', 'cinefolio'),
        'add_new_item'          => __('Add New Project', 'cinefolio'),
        'edit_item'             => __('Edit Project', 'cinefolio'),
    );

    $args = array(
        'label'                 => __('Project', 'cinefolio'),
        'description'           => __('Video editor portfolio deliverables', 'cinefolio'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'),
        'taxonomies'            => array('portfolio_category'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-video-alt3',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true, // CRITICAL: Exposes post type to WP REST API
        'rest_base'             => 'portfolio_project',
    );
    register_post_type('portfolio_project', $args);
}
add_action('init', 'register_portfolio_cpt', 0);

// Register Custom Taxonomy: Portfolio Category
function register_portfolio_taxonomy() {
    $labels = array(
        'name'              => _x('Categories', 'taxonomy general name', 'cinefolio'),
        'singular_name'     => _x('Category', 'taxonomy singular name', 'cinefolio'),
        'search_items'      => __('Search Categories', 'cinefolio'),
        'all_items'         => __('All Categories', 'cinefolio'),
        'edit_item'         => __('Edit Category', 'cinefolio'),
        'update_item'       => __('Update Category', 'cinefolio'),
        'add_new_item'      => __('Add New Category', 'cinefolio'),
        'new_item_name'     => __('New Category Name', 'cinefolio'),
        'menu_name'         => __('Categories', 'cinefolio'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'portfolio-category'),
        'show_in_rest'      => true,
    );
    register_taxonomy('portfolio_category', array('portfolio_project'), $args);
}
add_action('init', 'register_portfolio_taxonomy', 0);
```

---

## 3. Exposing Custom Fields in the REST API

If you are using **Advanced Custom Fields (ACF)**, enable **"Show in REST API"** in field group settings, or register the fields programmatically in `functions.php`:

```php
<?php
// Expose custom fields in WP REST API
function expose_portfolio_rest_fields() {
    $fields = array('video_url', 'client', 'year', 'aspect_ratio', 'brief', 'approach', 'software', 'role', 'has_before_after', 'before_url', 'after_url');
    
    foreach ($fields as $field) {
        register_rest_field('portfolio_project', $field, array(
            'get_callback' => function($post, $field_name) {
                return get_post_meta($post['id'], $field_name, true);
            },
            'update_callback' => function($value, $post, $field_name) {
                return update_post_meta($post->ID, $field_name, $value);
            },
            'schema' => null,
        ));
    }
}
add_action('rest_api_init', 'expose_portfolio_rest_fields');
```

---

## 4. Enabling CORS on WordPress

Allow your portfolio domain or preview URL to query the WordPress REST API by adding this header hook in `functions.php`:

```php
<?php
function add_cors_http_header() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Total, X-WP-TotalPages");
    header("Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages");
}
add_action('init', 'add_cors_http_header');
```

---

## 5. Syncing via Admin Dashboard

1. Navigate to the **Admin Dashboard** (`/admin`).
2. Select the **WordPress** tab.
3. Enter your **WordPress Endpoint URL** (e.g. `https://your-wp-site.com/wp-json/wp/v2/portfolio_project`).
4. Click **Test Endpoint Connection**.
5. Click **Sync Projects from WordPress**.
6. The portfolio frontend will seamlessly ingest and display all projects using the active theme, typography, and video player settings.
