# CHANGELOG

## [2.4.0] - 2026-08-16
### Architecture & Migration
- **Decoupled Data Abstraction Layer**: Implemented `IDataAdapter` interface with `CustomAPIAdapter`, `WordPressAdapter`, and `LocalJSONAdapter`.
- **Media Provider Abstraction**: Integrated unified `IMediaProvider` architecture for Direct Upload, Google Drive, YouTube, Vimeo, and adaptive streams.
- **Theme & Design Tokens System**: Extracted `designTokens.ts` and `ThemeEngine.ts` for dynamic CSS Custom Properties management.
- **Circular Structure Defense**: Added `safeJsonStringify` and `safeClone` utilities ensuring DOM/Fiber node pollution safety.
- **Page-Aware Skeletons**: Built comprehensive, layout-matching skeleton loaders for all public pages, project modals, and admin CMS tabs.
- **Documentation Suite**: Added full setup, architecture, WordPress integration, media, deployment, and security guides.
