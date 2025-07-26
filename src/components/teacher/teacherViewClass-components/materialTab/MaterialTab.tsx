import type React from "react"
import { useState } from "react"
import {
  Upload,
  Search,
  FolderOpen,
  FileText,
  Video,
  Presentation,
  Download,
  Eye,
  Calendar,
  User,
  Edit,
  Trash2,
  X,
  MoreHorizontal,
} from "lucide-react"
import styles from "./materialTab.module.css"

interface IMaterial {
  id: number
  title: string
  type: "video" | "document" | "presentation"
  size: string
  uploadDate: string
  uploadedBy: string
  downloads: number
  category: string
  description: string
}

const initialMaterials: IMaterial[] = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals - Lecture Slides",
    type: "presentation",
    size: "2.4 MB",
    uploadDate: "May 15, 2025",
    uploadedBy: "Dr. Sarah Johnson",
    downloads: 28,
    category: "Lectures",
    description: "Comprehensive slides covering HTML5 and CSS3 fundamentals",
  },
  {
    id: 2,
    title: "JavaScript ES6 Features Video Tutorial",
    type: "video",
    size: "156 MB",
    uploadDate: "May 12, 2025",
    uploadedBy: "Dr. Sarah Johnson",
    downloads: 24,
    category: "Videos",
    description: "In-depth tutorial on modern JavaScript ES6+ features",
  },
  {
    id: 3,
    title: "React Components Cheat Sheet",
    type: "document",
    size: "890 KB",
    uploadDate: "May 10, 2025",
    uploadedBy: "TA: Mike Chen",
    downloads: 31,
    category: "References",
    description: "Quick reference guide for React components and hooks",
  },
  {
    id: 4,
    title: "Database Design Assignment Template",
    type: "document",
    size: "1.2 MB",
    uploadDate: "May 8, 2025",
    uploadedBy: "Dr. Sarah Johnson",
    downloads: 19,
    category: "Templates",
    description: "Template for database design assignments",
  },
]

const categories = ["All", "Lectures", "Videos", "References", "Templates"]

const MaterialsTab = () => {
  const [materials, setMaterials] = useState<IMaterial[]>(initialMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<IMaterial | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    description: "",
    file: null as File | null,
  });

  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || material.category === selectedCategory),
  ).sort((a, b) => {
    if (sortBy === "newest") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    if (sortBy === "downloads") return b.downloads - a.downloads
    return a.title.localeCompare(b.title)
  })

  const handleDownload = (material: IMaterial) => {
    setMaterials((prev) => prev.map((m) => (m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m)));
    console.log("Downloading:", material.title);
    // Simulate download
    const link = document.createElement("a");
    link.href = "#";
    link.download = material.title;
    link.click();
  }

  const handleViewDetails = (material: IMaterial) => {
    setSelectedMaterial(material);
    setShowDetailsModal(true);
    setActiveDropdown(null);
  }

  const handleEdit = (material: IMaterial) => {
    setEditingMaterial({ ...material });
    setShowEditModal(true);
    setActiveDropdown(null);
  }

  const handleDelete = (materialId: number) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    }
    setActiveDropdown(null);
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.category || !uploadForm.file) {
      alert("Please fill all required fields!");
      return;
    }

    const newMaterial: IMaterial = {
      id: Math.max(...materials.map((m) => m.id)) + 1,
      title: uploadForm.title,
      type: uploadForm.file.type.includes("video")
        ? "video"
        : uploadForm.file.type.includes("presentation")
          ? "presentation"
          : "document",
      size: `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      uploadedBy: "Dr. Sarah Johnson",
      downloads: 0,
      category: uploadForm.category,
      description: uploadForm.description,
    }

    setMaterials((prev) => [newMaterial, ...prev]);
    setUploadForm({ title: "", category: "", description: "", file: null });
    setShowUploadModal(false);
  }

  const handleUpdateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;

    setMaterials((prev) => prev.map((m) => (m.id === editingMaterial.id ? editingMaterial : m)));
    setShowEditModal(false);
    setEditingMaterial(null);
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className={styles.fileIcon} style={{ color: "#ef4444" }} />
      case "presentation":
        return <Presentation className={styles.fileIcon} style={{ color: "#f97316" }} />
      case "document":
        return <FileText className={styles.fileIcon} style={{ color: "#3b82f6" }} />
      default:
        return <FileText className={styles.fileIcon} style={{ color: "#6b7280" }} />
    }
  }

  const toggleDropdown = (materialId: number) => {
    setActiveDropdown(activeDropdown === materialId ? null : materialId)
  };

  return (
    <div className={styles.container}>
      {/* Content */}
      <div>
        <div className={styles.contentHeader}>
          <h2 className={styles.title}>Course Materials</h2>
          <button className={styles.UploadBtn} onClick={() => setShowUploadModal(true)}>
            <Upload size={16} />
            Upload Material
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={16} />
            <input
              type="text"
              placeholder="Search materials"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
            <option value="newest">Newest First</option>
            <option value="downloads">Most Downloaded</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        {/* Materials List */}
        <div className={styles.materialsList}>
          {filteredMaterials.map((material) => (
            <div key={material.id} className={styles.materialCard}>
              <div className={styles.materialInfo}>
                <div className={styles.materialIcon}>{getFileIcon(material.type)}</div>
                <div className={styles.materialDetails}>
                  <h3>{material.title}</h3>
                  <div className={styles.materialMeta}>
                    <span className={styles.metaItem}>
                      <User size={12} />
                      {material.uploadedBy}
                    </span>
                    <span className={styles.metaItem}>
                      <Calendar size={12} />
                      {material.uploadDate}
                    </span>
                    <span className={styles.metaItem}><FileText size={12} /> {material.size}</span>
                    <span className={styles.metaItem}>
                      <Download size={12} />
                      {material.downloads} downloads
                    </span>
                  </div>
                </div>
                <div className={styles.materialCategory}>
                  <span className={styles.badge}>{material.category}</span>
                </div>
              </div>

              <div className={styles.materialActions}>
                <button onClick={() => handleViewDetails(material)} className={styles.detailsBtn}>
                  <Eye size={16} />
                  <span>Details</span>
                </button>
                <button onClick={() => handleDownload(material)} className={styles.downloadBtn}>
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownBtn} onClick={() => toggleDropdown(material.id)}>
                    <MoreHorizontal size={16} />
                  </button>
                  {activeDropdown === material.id && (
                    <div className={styles.dropdownMenu}>
                      <button onClick={() => handleEdit(material)}>
                        <Edit size={14} />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(material.id)} className={styles.deleteBtn}>
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className={styles.emptyState}>
            <FolderOpen className={styles.emptyIcon} size={48} />
            <h3>No materials found</h3>
            <p>
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Upload your first course material to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className={styles.modal} onClick={() => setShowUploadModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Upload Course Material</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpload} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Material Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter material title"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category *</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm((prev) => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Lectures">Lectures</option>
                  <option value="Videos">Videos</option>
                  <option value="References">References</option>
                  <option value="Templates">Templates</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description (optional)"
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>File *</label>
                <input
                  type="file"
                  onChange={(e) => setUploadForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  <Upload size={16} />
                  Upload
                </button>
                <button type="button" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedMaterial && (
        <div className={styles.modal} onClick={() => setShowDetailsModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Material Details</h3>
              <button onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.detailsContent}>
              <div className={styles.detailsTitle}>
                {getFileIcon(selectedMaterial.type)}
                <h4>{selectedMaterial.title}</h4>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <strong>Category:</strong>
                  <span className={styles.badge}>{selectedMaterial.category}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>File Type:</strong>
                  <span className={styles.capitalize}>{selectedMaterial.type}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>File Size:</strong>
                  <span>{selectedMaterial.size}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Downloads:</strong>
                  <span>{selectedMaterial.downloads} times</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Upload Date:</strong>
                  <span>{selectedMaterial.uploadDate}</span>
                </div>
                <div className={styles.detailItem}>
                  <strong>Uploaded By:</strong>
                  <span>{selectedMaterial.uploadedBy}</span>
                </div>
              </div>

              {selectedMaterial.description && (
                <div className={styles.description}>
                  <h5>Description</h5>
                  <p>{selectedMaterial.description}</p>
                </div>
              )}
            </div>
            <div className={styles.modalActions}>
              <button onClick={() => handleDownload(selectedMaterial)}>
                <Download size={16} />
                Download
              </button>
              <button onClick={() => setShowDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingMaterial && (
        <div className={styles.modal} onClick={() => setShowEditModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Material</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateMaterial} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Title *</label>
                <input
                  type="text"
                  value={editingMaterial.title}
                  onChange={(e) => setEditingMaterial((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category *</label>
                <select
                  value={editingMaterial.category}
                  onChange={(e) => setEditingMaterial((prev) => (prev ? { ...prev, category: e.target.value } : null))}
                  required
                >
                  <option value="Lectures">Lectures</option>
                  <option value="Videos">Videos</option>
                  <option value="References">References</option>
                  <option value="Templates">Templates</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={editingMaterial.description}
                  onChange={(e) =>
                    setEditingMaterial((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                  rows={3}
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  <Edit size={16} />
                  Save Changes
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && <div className={styles.overlay} onClick={() => setActiveDropdown(null)} />}
    </div>
  )
}

export default MaterialsTab