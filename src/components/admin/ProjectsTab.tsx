import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Copy, Film, HardDrive, Smartphone, 
  Check, X, Search, Star, ExternalLink, ArrowUp, ArrowDown,
  Eye, Sliders, ShieldCheck, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { 
  Project, VideoItem, AspectRatioType, VideoOrientation, 
  MediaProviderType, ProjectStatus, ProjectVisibility, MediaAsset, ProjectCredit
} from '../../types';
import { ProjectPreviewModal } from './ProjectPreviewModal';
import { safeClone } from '../../utils/serialization';

interface ProjectsTabProps {
  projects: Project[];
  media?: MediaAsset[];
  onSaveProjects: (projects: Project[]) => void;
  onOpenDriveForVideo: (callback: (video: VideoItem) => void) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  media = [],
  onSaveProjects,
  onOpenDriveForVideo,
}) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [previewingProject, setPreviewingProject] = useState<Project | null>(null);

  // New Project Initializer
  const handleStartCreate = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Untitled Project Cut',
      slug: `untitled-project-${Date.now().toString().slice(-4)}`,
      client: 'Brand / Client Name',
      year: new Date().getFullYear().toString(),
      category: 'Commercial',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      description: 'Dynamic commercial cut and cinematic grade.',
      brief: 'Deliver a high-impact promotional campaign with multi-platform cuts.',
      approach: 'Paced cutting to custom percussion stems with ACES film emulations.',
      role: 'Lead Video Editor & Colorist',
      services: ['Creative Editorial', 'Color Grading', 'Sound Design'],
      software: ['Premiere Pro', 'DaVinci Resolve Studio'],
      tags: ['Commercial', '4K HDR', 'Color Grade'],
      status: 'draft',
      visibility: 'public',
      featured: false,
      order: projects.length + 1,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      retroEffect: 'crt',
      retroEffectIntensity: 'medium',
      credits: [
        { role: 'Director', name: 'Marcus Vance' },
        { role: 'Editor / Colorist', name: 'EKO Pixels' }
      ],
      seoTitle: 'Commercial Edit // EKO Pixels Portfolio',
      seoDescription: 'High-octane commercial cut and color grade.',
      mainVideo: {
        id: `vid-${Date.now()}`,
        title: 'Master 16:9 Cut',
        provider: 'direct_upload',
        providerIdOrUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        orientation: 'landscape',
        aspectRatio: '16:9',
        duration: '01:30',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        status: 'healthy',
      },
      additionalVideos: [],
    };

    setEditingProject(newProj);
    setIsCreating(true);
  };

  const handleSaveEdit = () => {
    if (!editingProject) return;

    if (isCreating) {
      onSaveProjects([editingProject, ...projects]);
    } else {
      onSaveProjects(
        projects.map((p) => (p.id === editingProject.id ? editingProject : p))
      );
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      onSaveProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus: ProjectStatus = currentStatus === 'published' ? 'draft' : 'published';
    onSaveProjects(
      projects.map((p) => (p.id === id ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p))
    );
  };

  const handleDuplicate = (project: Project) => {
    const copy: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (COPY)`,
      slug: `${project.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: 'draft',
      views: 0,
      order: projects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSaveProjects([copy, ...projects]);
  };

  // Reordering helpers
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    reordered.forEach((p, idx) => {
      p.order = idx + 1;
    });

    onSaveProjects(reordered);
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#121214] rounded-xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Film className="w-5 h-5 text-[#ff3b00]" />
            <h2 className="font-heading font-bold text-xl text-white tracking-wide">
              PROJECTS &amp; REELS CMS
            </h2>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono text-xs font-bold">
              {projects.length} TOTAL
            </span>
          </div>
          <p className="text-white/50 text-xs font-mono">
            Manage portfolio showcase cuts, video versions, color grade before/after passes, and publishing status.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-mono text-xs font-bold rounded-lg shadow-lg transition-transform active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PROJECT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#121214] rounded-lg border border-white/10 font-mono text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects by title, client, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#1a1a20] rounded border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#ff3b00]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a20] text-white/80 border border-white/10 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#ff3b00] cursor-pointer"
          >
            <option value="all">All Statuses ({projects.length})</option>
            <option value="published">Published Only ({projects.filter((p) => p.status === 'published').length})</option>
            <option value="draft">Drafts Only ({projects.filter((p) => p.status === 'draft').length})</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-[#121214] rounded-xl border border-dashed border-white/15 font-mono">
            <Film className="w-10 h-10 text-white/20 mx-auto mb-2" />
            <div className="text-white text-sm font-bold">No projects match your filter</div>
            <div className="text-white/40 text-xs mt-1">Try clearing search filters or create a new project.</div>
          </div>
        ) : (
          filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="p-4 bg-[#121214] rounded-xl border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs group"
            >
              {/* Left Column: Reorder + Thumbnail + Metadata */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-0.5 text-white/30 group-hover:text-white/60">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-0.5 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === projects.length - 1}
                    className="p-0.5 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {project.featured && (
                    <span className="absolute top-1 left-1 p-0.5 bg-[#ffe600] text-black rounded text-[8px] font-bold">
                      <Star className="w-2.5 h-2.5 fill-black" />
                    </span>
                  )}
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] px-1 rounded">
                    {project.mainVideo?.aspectRatio || '16:9'}
                  </span>
                </div>

                {/* Title & Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        project.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-white/40 text-[10px]">{project.category}</span>
                    <span className="text-white/40 text-[10px]">•</span>
                    <span className="text-white/60 text-[10px] truncate">{project.client}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white truncate max-w-md">
                    {project.title}
                  </h3>

                  <div className="text-[10px] text-white/40 flex items-center gap-2 mt-0.5">
                    <span>{project.views} views</span>
                    <span>•</span>
                    <span>Provider: {project.mainVideo?.provider || 'Direct'}</span>
                    {project.additionalVideos?.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-[#00e5ff]">+{project.additionalVideos.length} Social Cuts</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                {/* Live Preview Button */}
                <button
                  onClick={() => setPreviewingProject(project)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white rounded border border-white/10 transition-colors cursor-pointer"
                  title="Test Responsive Preview"
                >
                  <Eye className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>PREVIEW</span>
                </button>

                {/* Toggle Publish / Draft */}
                <button
                  onClick={() => handleToggleStatus(project.id, project.status)}
                  className={`px-2.5 py-1.5 rounded border text-[10px] font-bold transition-colors cursor-pointer ${
                    project.status === 'published'
                      ? 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                  }`}
                >
                  {project.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditingProject(safeClone(project));
                    setIsCreating(false);
                  }}
                  className="p-1.5 bg-[#ff3b00]/10 hover:bg-[#ff3b00]/20 text-[#ff3b00] rounded border border-[#ff3b00]/30 transition-colors cursor-pointer"
                  title="Edit Project Details"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                {/* Duplicate */}
                <button
                  onClick={() => handleDuplicate(project)}
                  className="p-1.5 bg-[#1a1a20] hover:bg-[#24242c] text-white/60 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
                  title="Duplicate Project"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 font-mono text-xs space-y-6">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#ff3b00]" />
                <h3 className="font-heading font-bold text-lg text-white">
                  {isCreating ? 'CREATE NEW PROJECT' : `EDIT: ${editingProject.title}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#00e5ff] uppercase tracking-wider">
                1. Project Identity &amp; Publishing Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-white/70 mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Publishing Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                    className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white font-bold focus:outline-none focus:border-[#ff3b00] cursor-pointer"
                  >
                    <option value="draft">Draft (Private in CMS)</option>
                    <option value="published">Published (Public Portfolio)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Client</label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Role</label>
                  <input
                    type="text"
                    value={editingProject.role}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Thumbnail Poster URL</label>
                <input
                  type="text"
                  value={editingProject.thumbnail}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Project Description (Card Summary)</label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2.5 bg-[#1a1a20] rounded border border-white/10 text-white"
                />
              </div>

              {/* Case Study Deep Dive Storytelling */}
              <div className="space-y-3 pt-2">
                <div className="text-white/60 font-bold uppercase text-[11px]">Case Study Narrative &amp; Workflow Breakdown:</div>

                <div>
                  <label className="block text-white/50 mb-1 text-[11px]">The Creative Brief</label>
                  <textarea
                    rows={2}
                    value={editingProject.brief || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, brief: e.target.value })}
                    placeholder="Describe the initial project objectives and client mandate..."
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">Production Challenge</label>
                    <textarea
                      rows={2}
                      value={editingProject.challenge || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                      placeholder="e.g. Mixed frame rates, low light noise, tight 24h turnaround..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">Creative Direction &amp; Pacing</label>
                    <textarea
                      rows={2}
                      value={editingProject.creativeDirection || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, creativeDirection: e.target.value })}
                      placeholder="e.g. Kinetic montage, non-linear timeline, intentional match cuts..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">Editorial &amp; Assembly Workflow</label>
                    <textarea
                      rows={2}
                      value={editingProject.editingProcess || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, editingProcess: e.target.value })}
                      placeholder="e.g. Offline rough cut in Premiere Pro with multi-cam sync..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">DaVinci Resolve Color Pipeline</label>
                    <textarea
                      rows={2}
                      value={editingProject.colorGradingNotes || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, colorGradingNotes: e.target.value })}
                      placeholder="e.g. ACEScct node tree, film stock emulation, hue isolation..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">Sound Design &amp; Audio Mix</label>
                    <textarea
                      rows={2}
                      value={editingProject.soundDesignNotes || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, soundDesignNotes: e.target.value })}
                      placeholder="e.g. Foley stem layering, riser builds, sub-bass hits, LUFS mastering..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 mb-1 text-[11px]">Motion Graphics &amp; VFX</label>
                    <textarea
                      rows={2}
                      value={editingProject.motionVfxNotes || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, motionVfxNotes: e.target.value })}
                      placeholder="e.g. Kinetic typography, planar screen replacements, speed ramps..."
                      className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Attachment & Provider Settings */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="font-bold text-sm text-[#00e5ff] uppercase tracking-wider flex items-center justify-between">
                <span>2. Master Showcase Video Configuration</span>
                {media.length > 0 && (
                  <span className="text-white/40 text-xs font-normal">
                    {media.length} Media Library Assets available
                  </span>
                )}
              </h4>

              {/* Quick Select from Media Library */}
              {media.length > 0 && (
                <div className="p-3 bg-[#16161a] rounded-lg border border-white/10 space-y-2">
                  <label className="block text-white/80 font-bold text-[11px]">
                    Attach from Universal Media Library:
                  </label>
                  <select
                    onChange={(e) => {
                      const selectedAsset = media.find((m) => m.id === e.target.value);
                      if (selectedAsset && editingProject.mainVideo) {
                        setEditingProject({
                          ...editingProject,
                          mainVideo: {
                            ...editingProject.mainVideo,
                            provider: selectedAsset.provider,
                            providerIdOrUrl: selectedAsset.playbackUrl,
                            aspectRatio: selectedAsset.aspectRatio || '16:9',
                            orientation: selectedAsset.orientation || 'landscape',
                            duration: selectedAsset.duration || '01:30',
                            thumbnailUrl: selectedAsset.thumbnailUrl || editingProject.thumbnail,
                            mediaAssetId: selectedAsset.id,
                            status: selectedAsset.status,
                          },
                        });
                      }
                    }}
                    defaultValue=""
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white cursor-pointer"
                  >
                    <option value="" disabled>-- Select asset from Media Library --</option>
                    {media.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title || m.name} ({m.provider} • {m.aspectRatio || '16:9'})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Provider Source</label>
                  <select
                    value={editingProject.mainVideo?.provider || 'direct_upload'}
                    onChange={(e) => {
                      if (!editingProject.mainVideo) return;
                      setEditingProject({
                        ...editingProject,
                        mainVideo: {
                          ...editingProject.mainVideo,
                          provider: e.target.value as MediaProviderType,
                        },
                      });
                    }}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white cursor-pointer"
                  >
                    <option value="direct_upload">Direct Upload (MP4 / MOV)</option>
                    <option value="google_drive">Google Drive (Stream / Ingested)</option>
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Aspect Ratio</label>
                  <select
                    value={editingProject.mainVideo?.aspectRatio || '16:9'}
                    onChange={(e) => {
                      if (!editingProject.mainVideo) return;
                      const r = e.target.value as AspectRatioType;
                      setEditingProject({
                        ...editingProject,
                        mainVideo: {
                          ...editingProject.mainVideo,
                          aspectRatio: r,
                          orientation: r === '9:16' ? 'portrait' : r === '1:1' ? 'square' : 'landscape',
                        },
                      });
                    }}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white cursor-pointer"
                  >
                    <option value="16:9">16:9 Landscape (Standard)</option>
                    <option value="9:16">9:16 Vertical Reel</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="4:5">4:5 Feed Format</option>
                    <option value="2.35:1">2.35:1 Anamorphic Cinema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Duration (MM:SS)</label>
                  <input
                    type="text"
                    value={editingProject.mainVideo?.duration || '01:30'}
                    onChange={(e) => {
                      if (!editingProject.mainVideo) return;
                      setEditingProject({
                        ...editingProject,
                        mainVideo: {
                          ...editingProject.mainVideo,
                          duration: e.target.value,
                        },
                      });
                    }}
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Video Stream / Embed URL *</label>
                <input
                  type="text"
                  value={editingProject.mainVideo?.providerIdOrUrl || ''}
                  onChange={(e) => {
                    if (!editingProject.mainVideo) return;
                    setEditingProject({
                      ...editingProject,
                      mainVideo: {
                        ...editingProject.mainVideo,
                        providerIdOrUrl: e.target.value,
                      },
                    });
                  }}
                  placeholder="https://... or YouTube/Drive Link"
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                />
              </div>
            </div>

            {/* Before / After Color Grade Pass */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="font-bold text-sm text-[#00e5ff] uppercase tracking-wider">
                3. Color Grading Before / After Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-1">RAW / Log Image URL (Before)</label>
                  <input
                    type="text"
                    value={editingProject.beforeAfter?.beforeImage || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        beforeAfter: {
                          ...editingProject.beforeAfter,
                          beforeImage: e.target.value,
                          beforeLabel: editingProject.beforeAfter?.beforeLabel || 'RAW LOG',
                        },
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Final Graded Image URL (After)</label>
                  <input
                    type="text"
                    value={editingProject.beforeAfter?.afterImage || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        beforeAfter: {
                          ...editingProject.beforeAfter,
                          afterImage: e.target.value,
                          afterLabel: editingProject.beforeAfter?.afterLabel || 'FINAL FILM GRADE',
                        },
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            {/* SEO & Meta */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="font-bold text-sm text-[#00e5ff] uppercase tracking-wider">
                4. SEO Metadata &amp; Social Share Card
              </h4>
              <div>
                <label className="block text-white/70 mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={editingProject.seoTitle || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, seoTitle: e.target.value })}
                  placeholder="e.g., Cyberpunk Neon Drift // Automotive Commercial by EKO Pixels"
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Meta Description</label>
                <input
                  type="text"
                  value={editingProject.seoDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, seoDescription: e.target.value })}
                  placeholder="High-octane commercial cut and color grade."
                  className="w-full p-2 bg-[#1a1a20] rounded border border-white/10 text-white"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-transparent hover:bg-white/10 text-white/70 rounded cursor-pointer"
              >
                CANCEL
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewingProject(editingProject)}
                  className="px-4 py-2 bg-[#1a1a20] hover:bg-[#24242c] text-white border border-white/10 font-bold rounded cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-[#00e5ff]" />
                  <span>TEST PREVIEW</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-[#ff3b00] hover:bg-[#ff5522] text-white font-bold rounded shadow-lg transition-transform cursor-pointer"
                >
                  SAVE PROJECT CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Responsive Preview Modal */}
      {previewingProject && (
        <ProjectPreviewModal
          project={previewingProject}
          onClose={() => setPreviewingProject(null)}
          onPublishToggle={(id, currentStatus) => {
            handleToggleStatus(id, currentStatus);
            setPreviewingProject({
              ...previewingProject,
              status: currentStatus === 'published' ? 'draft' : 'published',
            });
          }}
        />
      )}
    </div>
  );
};
