import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Star,
  Film,
  HardDrive,
  Sliders,
  Check,
  X,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  FolderOpen,
  Lock,
  Globe,
  Play,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, VideoAspectRatio, VideoProvider, MediaItem } from '../../types';
import { GlassButton } from '../common/GlassButton';
import { GlassCard } from '../common/GlassCard';
import { GlassModal } from '../common/GlassModal';
import { UniversalVideoPlayer } from '../video/UniversalVideoPlayer';
import { AdminEmptyState } from '../common/AdminSkeletons';

export const AdminProjects: React.FC = () => {
  const {
    projects,
    categories,
    saveProject,
    deleteProject,
    duplicateProject,
    togglePublishProject,
    toggleFeatureProject,
    driveFiles,
    mediaItems,
    showToast,
  } = usePortfolio();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Asset Picker Modal State
  const [isAssetPickerOpen, setIsAssetPickerOpen] = useState<boolean>(false);

  // Live Responsive Preview Simulator State
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Commercial Campaign',
      slug: `new-commercial-${Date.now()}`,
      client: 'Brand / Client',
      year: new Date().getFullYear().toString(),
      category: 'Commercial',
      description: 'A dynamic visual piece crafted with bespoke sound design and precision color grading.',
      brief: 'Capture brand energy and lifestyle appeal through rhythmic pacing and rich color palette.',
      approach: 'Combined 60fps slow-motion shots with seamless speed ramps, finished on DaVinci Resolve with custom film print emulation.',
      role: ['Lead Video Editor', 'Colorist'],
      software: ['DaVinci Resolve', 'Adobe Premiere Pro'],
      services: ['Offline Edit', 'Color Grading', 'Sound Design'],
      featured: false,
      published: true,
      visibility: 'public',
      status: 'published',
      order: projects.length + 1,
      viewsCount: 0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
      videoSource: {
        provider: 'direct',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
        aspectRatio: '16:9',
        quality: '4K Master',
        duration: '01:30',
      },
      beforeAfterData: {
        hasBeforeAfter: false,
        beforeUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80',
        afterUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80',
        labelBefore: 'Arri LogC3 Flat',
        labelAfter: 'Kodak 2383 Master',
      },
      gallery: [],
    };
    setEditingProject(newProj);
    setIsModalOpen(true);
  };

  const handleEdit = (p: Project) => {
    setEditingProject({ ...p });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    saveProject(editingProject);
    setIsModalOpen(false);
  };

  const handleSelectAssetForProject = (asset: MediaItem) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      thumbnailUrl: asset.thumbnailUrl || editingProject.thumbnailUrl,
      videoSource: {
        ...editingProject.videoSource,
        provider: (asset.provider as any) || (asset.source === 'googledrive' ? 'googledrive' : 'direct'),
        url: asset.playbackUrl || asset.url,
        driveFileId: asset.driveFileId,
        posterUrl: asset.thumbnailUrl || editingProject.videoSource.posterUrl,
        aspectRatio: asset.aspectRatio || editingProject.videoSource.aspectRatio || '16:9',
        duration: asset.duration || editingProject.videoSource.duration || '01:30',
      },
    });
    setIsAssetPickerOpen(false);
    showToast(`Linked asset "${asset.title}" to project.`);
  };

  const filtered = projects.filter(p => {
    const matchesCategory =
      selectedFilterCategory === 'all' ||
      p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === selectedFilterCategory;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && p.published && p.visibility !== 'private') ||
      (statusFilter === 'draft' && !p.published) ||
      (statusFilter === 'private' && p.visibility === 'private');

    return matchesCategory && matchesStatus;
  });

  return (
    <section className="space-y-6" id="admin-projects-root">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--brand-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border border-[var(--brand-primary)]/40">
              Portfolio Content Manager
            </span>
            <span className="text-xs text-[var(--brand-text-muted)] font-mono">
              {projects.length} total projects
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--brand-text)] tracking-tight">
            Projects & Video Pipeline
          </h2>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
            Manage projects, aspect ratio tags, color grade breakdowns, and responsive playback.
          </p>
        </div>

        <GlassButton
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreateNew}
        >
          Add New Project
        </GlassButton>
      </header>

      {/* Filter Row */}
      <nav aria-label="Project Filter Options" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl glass-card border border-[var(--brand-border)]">
        {/* Category Filter Pills */}
        <ul className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none list-none p-0 m-0">
          <li>
            <button
              type="button"
              onClick={() => setSelectedFilterCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                selectedFilterCategory === 'all'
                  ? 'bg-[var(--brand-primary)] text-black font-bold'
                  : 'glass-surface text-[var(--brand-text-secondary)] hover:text-white'
              }`}
            >
              All Work ({projects.length})
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => setSelectedFilterCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedFilterCategory === cat.slug
                    ? 'bg-[var(--brand-primary)] text-black font-bold'
                    : 'glass-surface text-[var(--brand-text-secondary)] hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:border-[var(--brand-primary)] focus:outline-none"
            aria-label="Filter projects by publication status"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
            <option value="private">Private VIP Only</option>
          </select>
        </div>
      </nav>

      {/* Projects List */}
      {filtered.length === 0 ? (
        <AdminEmptyState
          title="No projects match this filter"
          description="Create your first video project or adjust your category and status filters."
          actionLabel="Create Project"
          onAction={handleCreateNew}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 list-none p-0 m-0">
          {filtered.map(project => {
            const isPublic = project.published && project.visibility !== 'private';
            return (
              <li key={project.id}>
                <article
                  className="p-4 sm:p-5 rounded-2xl glass-card border border-[var(--brand-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[var(--brand-primary)]/40 transition-all shadow-lg"
                >
                  {/* Thumbnail + Title info */}
                  <div className="flex items-center gap-4">
                    <figure className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-[var(--brand-border)] m-0">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/85 text-white border border-white/10 uppercase">
                        {project.videoSource?.aspectRatio || '16:9'}
                      </span>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/85 text-white">
                        {project.videoSource?.provider?.toUpperCase() || 'DIRECT'}
                      </span>
                    </figure>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                          {project.category}
                        </span>
                        <span className="text-xs text-[var(--brand-text-muted)]">
                          · {project.client} (<time dateTime={String(project.year)}>{project.year}</time>)
                        </span>

                        {/* Status Badges */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isPublic
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : project.visibility === 'private'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {isPublic ? 'Public' : project.visibility === 'private' ? 'Private Reel' : 'Draft'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-heading text-[var(--brand-text)] mt-0.5">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-[var(--brand-text-secondary)]">
                        <span>Views: <strong>{project.viewsCount}</strong></span>
                        {project.beforeAfterData?.hasBeforeAfter && (
                          <span className="text-[var(--brand-primary)] font-semibold">
                            · Color Grade Slider
                          </span>
                        )}
                        {project.videos && project.videos.length > 0 && (
                          <span className="text-neutral-400">
                            · {project.videos.length} Extra Cuts
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {/* Live Responsive Preview Trigger */}
                  <button
                    type="button"
                    onClick={() => setPreviewProject(project)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
                    title="Live Responsive Preview"
                  >
                    <Play className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    <span>Preview</span>
                  </button>

                  {/* Featured toggle */}
                  <button
                    type="button"
                    onClick={() => toggleFeatureProject(project.id)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      project.featured
                        ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
                        : 'text-[var(--brand-text-muted)] hover:text-white glass-surface'
                    }`}
                    title={project.featured ? 'Featured on Hero' : 'Mark as Featured'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  {/* Publish toggle */}
                  <button
                    type="button"
                    onClick={() => togglePublishProject(project.id)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      project.published
                        ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
                        : 'text-neutral-500 bg-neutral-900 border border-neutral-800'
                    }`}
                    title={project.published ? 'Published (Click to Unpublish)' : 'Draft / Hidden'}
                  >
                    {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Duplicate */}
                  <button
                    type="button"
                    onClick={() => duplicateProject(project.id)}
                    className="p-2 rounded-xl glass-surface text-[var(--brand-text-secondary)] hover:text-white cursor-pointer"
                    title="Duplicate Project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-xl bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-black transition-colors cursor-pointer"
                    title="Edit Project Details"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete project "${project.title}"?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-2 rounded-xl text-red-400 hover:bg-red-500/20 cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    )}

      {/* EDIT / CREATE PROJECT MODAL */}
      {editingProject && (
        <GlassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject.id.includes('proj-') ? 'Project Editor' : 'Edit Project'}
          subtitle="Configure video source, Google Drive connection, aspect ratios, and color grading."
          maxWidth="4xl"
        >
          <form onSubmit={handleSaveModal} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Client / Brand *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.client}
                  onChange={e => setEditingProject({ ...editingProject, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Category
                </label>
                <select
                  value={editingProject.category}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                >
                  <option>Commercial</option>
                  <option>Music Video</option>
                  <option>Documentary</option>
                  <option>Color Grading</option>
                  <option>Motion Graphics</option>
                  <option>Social & Vertical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={editingProject.year}
                  onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Visibility
                </label>
                <select
                  value={editingProject.visibility || 'public'}
                  onChange={e => setEditingProject({ ...editingProject, visibility: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)]"
                >
                  <option value="public">Public (Show on Portfolio)</option>
                  <option value="private">Private (Unlisted Direct Link)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Slug (URL identifier)
                </label>
                <input
                  type="text"
                  value={editingProject.slug}
                  onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-sm text-[var(--brand-text)] font-mono"
                />
              </div>
            </div>

            {/* Video Source Configuration */}
            <div className="p-4 rounded-2xl glass-surface border border-[var(--brand-border)] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[var(--brand-primary)] flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  Video Source & Stream Pipeline
                </h4>

                <button
                  type="button"
                  onClick={() => setIsAssetPickerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-[var(--brand-primary)] text-black hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Pick from Media Library</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--brand-text-muted)] mb-1">
                    Provider
                  </label>
                  <select
                    value={editingProject.videoSource.provider}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        videoSource: {
                          ...editingProject.videoSource,
                          provider: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  >
                    <option value="direct">Direct MP4 / Stream URL</option>
                    <option value="googledrive">Google Drive Video Embed</option>
                    <option value="youtube">YouTube Embed</option>
                    <option value="vimeo">Vimeo Embed</option>
                    <option value="mux">Mux / HLS Stream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--brand-text-muted)] mb-1">
                    Orientation
                  </label>
                  <select
                    value={editingProject.videoSource.orientation || 'landscape'}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        videoSource: {
                          ...editingProject.videoSource,
                          orientation: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  >
                    <option value="landscape">Horizontal / Landscape</option>
                    <option value="portrait">Vertical / Portrait (9:16)</option>
                    <option value="square">Square (1:1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--brand-text-muted)] mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={editingProject.videoSource.aspectRatio || '16:9'}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        videoSource: {
                          ...editingProject.videoSource,
                          aspectRatio: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                  >
                    <option value="16:9">16:9 Broadcast / UHD</option>
                    <option value="2.39:1">2.39:1 CinemaScope Anamorphic</option>
                    <option value="9:16">9:16 Vertical (Reels/TikTok)</option>
                    <option value="4:5">4:5 Social Feed</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="4:3">4:3 Academy / Vintage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--brand-text-muted)] mb-1">
                    Duration Tag
                  </label>
                  <input
                    type="text"
                    placeholder="01:45"
                    value={editingProject.videoSource.duration || ''}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        videoSource: {
                          ...editingProject.videoSource,
                          duration: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--brand-text-muted)] mb-1">
                  Video URL / Drive Link / Stream Manifest
                </label>
                <input
                  type="text"
                  value={editingProject.videoSource.url}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      videoSource: {
                        ...editingProject.videoSource,
                        url: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] font-mono"
                />
              </div>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                Poster Thumbnail Image URL
              </label>
              <input
                type="url"
                value={editingProject.thumbnailUrl}
                onChange={e =>
                  setEditingProject({
                    ...editingProject,
                    thumbnailUrl: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)] font-mono"
              />
            </div>

            {/* Narrative & Case Study Descriptions */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] mb-1">
                  Creative Brief & Narrative
                </label>
                <textarea
                  rows={2}
                  value={editingProject.brief || ''}
                  onChange={e => setEditingProject({ ...editingProject, brief: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                />
              </div>
            </div>

            {/* Color Grade Breakdown Slider toggle */}
            <div className="p-4 rounded-2xl glass-card border border-[var(--brand-border)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[var(--brand-primary)]" />
                  Interactive Before / After Color Grade Breakdown Slider
                </span>
                <input
                  type="checkbox"
                  checked={editingProject.beforeAfterData?.hasBeforeAfter || false}
                  onChange={e =>
                    setEditingProject({
                      ...editingProject,
                      beforeAfterData: {
                        hasBeforeAfter: e.target.checked,
                        beforeUrl: editingProject.beforeAfterData?.beforeUrl || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200',
                        afterUrl: editingProject.beforeAfterData?.afterUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200',
                        labelBefore: 'Arri LogC3 Flat',
                        labelAfter: 'Kodak 2383 Master',
                      },
                    })
                  }
                  className="w-4 h-4 accent-[var(--brand-primary)] cursor-pointer"
                />
              </div>

              {editingProject.beforeAfterData?.hasBeforeAfter && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] text-[var(--brand-text-muted)] mb-1">
                      Before Image (RAW / Log) URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.beforeAfterData.beforeUrl}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          beforeAfterData: {
                            ...editingProject.beforeAfterData!,
                            beforeUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[var(--brand-text-muted)] mb-1">
                      After Image (Graded Master) URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.beforeAfterData.afterUrl}
                      onChange={e =>
                        setEditingProject({
                          ...editingProject,
                          beforeAfterData: {
                            ...editingProject.beforeAfterData!,
                            afterUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[var(--brand-surface-elevated)] border border-[var(--brand-border)] text-xs text-[var(--brand-text)]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--brand-border)]">
              <GlassButton
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                icon={<Check className="w-4 h-4" />}
              >
                Save Project Changes
              </GlassButton>
            </div>
          </form>
        </GlassModal>
      )}

      {/* MEDIA ASSET PICKER MODAL */}
      <GlassModal
        isOpen={isAssetPickerOpen}
        onClose={() => setIsAssetPickerOpen(false)}
        title="Select Media Asset from Library"
        subtitle="Choose an indexed video master, Google Drive asset, or streaming manifest to link to this project."
        maxWidth="3xl"
      >
        <div className="space-y-4 pt-2">
          {mediaItems.length === 0 ? (
            <p className="text-xs text-neutral-400 py-6 text-center">
              No media items indexed yet. Add items in the Media Library tab first.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {mediaItems.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => handleSelectAssetForProject(asset)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-[var(--brand-primary)]/10 border border-white/10 hover:border-[var(--brand-primary)] cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                    <img
                      src={
                        asset.thumbnailUrl ||
                        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800'
                      }
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 px-1 text-[8px] font-mono bg-black/80 text-white rounded">
                      {asset.aspectRatio || '16:9'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-white truncate group-hover:text-[var(--brand-primary)]">
                      {asset.title}
                    </h5>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">
                      {asset.provider || asset.source} · {asset.size || 'Stream'}
                    </p>
                    <span className="text-[10px] text-[var(--brand-primary)] font-semibold mt-1 inline-block">
                      Click to Select →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassModal>

      {/* LIVE RESPONSIVE PREVIEW SIMULATOR MODAL */}
      {previewProject && (
        <GlassModal
          isOpen={!!previewProject}
          onClose={() => setPreviewProject(null)}
          title={`Live Simulator: ${previewProject.title}`}
          subtitle="Test responsive playback across Cinema Display, iPad Pro, and iPhone 15 Pro viewports."
          maxWidth="5xl"
        >
          <div className="space-y-4 pt-2">
            {/* Viewport Device Switcher */}
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-black/60 border border-white/10 w-fit mx-auto">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  previewDevice === 'desktop'
                    ? 'bg-[var(--brand-primary)] text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop (1280px)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  previewDevice === 'tablet'
                    ? 'bg-[var(--brand-primary)] text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>Tablet (768px)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  previewDevice === 'mobile'
                    ? 'bg-[var(--brand-primary)] text-black font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Simulated Frame */}
            <div className="flex justify-center p-4 sm:p-6 bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
              <div
                className={`transition-all duration-300 ${
                  previewDevice === 'desktop'
                    ? 'w-full max-w-4xl'
                    : previewDevice === 'tablet'
                    ? 'w-[768px] max-w-full'
                    : 'w-[390px] max-w-full'
                }`}
              >
                <div className="space-y-4">
                  {/* Video Player */}
                  <UniversalVideoPlayer
                    source={previewProject.videoSource}
                    title={previewProject.title}
                    autoPlay={false}
                  />

                  {/* Simulated Card Metadata */}
                  <div className="p-4 rounded-xl glass-card border border-[var(--brand-border)] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--brand-primary)] uppercase">
                        {previewProject.category}
                      </span>
                      <span className="text-neutral-400 font-mono">
                        {previewProject.year} · {previewProject.client}
                      </span>
                    </div>
                    <h3 className="font-bold font-heading text-lg text-white">
                      {previewProject.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {previewProject.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassModal>
      )}
    </section>
  );
};
