import classes from "./materialsTab.module.css"
import { Video, Presentation, FileText, Search, User, Calendar, Download, Eye, X } from "lucide-react"
import useMaterialsTab from "./useMaterialsTab.hook"

const MaterialsTab = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    sortBy,
    setSortBy,
    filteredMaterials,
    handleViewDetails,
    handleDownload,
    showDetailsModal,
    setShowDetailsModal,
    selectedMaterial,
  } = useMaterialsTab()

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className={classes.fileIcon} style={{ color: "#ef4444" }} />
      case "presentation":
        return <Presentation className={classes.fileIcon} style={{ color: "#f97316" }} />
      case "document":
        return <FileText className={classes.fileIcon} style={{ color: "#3b82f6" }} />
      default:
        return <FileText className={classes.fileIcon} style={{ color: "#64748b" }} />
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <h2 className={classes.title}>Course Materials</h2>
        </div>

        <div className={classes.filters}>
          <div className={classes.searchContainer}>
            <Search className={classes.searchIcon} size={16} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={classes.searchInput}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={classes.select}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={classes.select}>
            <option value="newest">Newest First</option>
            <option value="downloads">Most Downloaded</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        <div className={classes.materialsList}>
          {filteredMaterials.map((material) => (
            <div key={material.id} className={classes.materialCard}>
              <div className={classes.materialInfo}>
                <div className={classes.materialIcon}>{getFileIcon(material.type)}</div>
                <div className={classes.materialDetails}>
                  <h3 className={classes.materialTitle}>{material.title}</h3>
                  <div className={classes.materialMeta}>
                    <span className={classes.metaItem}>
                      <User size={12} />
                      {material.uploadedBy}
                    </span>
                    <span className={classes.metaItem}>
                      <Calendar size={12} />
                      {material.uploadDate}
                    </span>
                    <span className={classes.metaItem}>
                      <FileText size={12} />
                      {material.size}
                    </span>
                    <span className={classes.metaItem}>
                      <Download size={12} />
                      {material.downloads} downloads
                    </span>
                  </div>
                </div>
                <div className={classes.materialCategory}>
                  <span className={classes.badge}>{material.category}</span>
                </div>
              </div>

              <div className={classes.materialActions}>
                <button onClick={() => handleViewDetails(material)} className={classes.detailsBtn}>
                  <Eye size={16} />
                  <span>Details</span>
                </button>
                <button onClick={() => handleDownload(material)} className={classes.downloadBtn}>
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetailsModal && selectedMaterial && (
        <div className={classes.modal} onClick={() => setShowDetailsModal(false)}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modalHeader}>
              <h3>Material Details</h3>
              <button onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={classes.detailsContent}>
              <div className={classes.detailsTitle}>
                {getFileIcon(selectedMaterial.type)}
                <h4>{selectedMaterial.title}</h4>
              </div>

              <div className={classes.detailsGrid}>
                <div className={classes.detailItem}>
                  <strong>Category:</strong>
                  <span className={classes.badge}>{selectedMaterial.category}</span>
                </div>
                <div className={classes.detailItem}>
                  <strong>File Type:</strong>
                  <span className={classes.capitalize}>{selectedMaterial.type}</span>
                </div>
                <div className={classes.detailItem}>
                  <strong>File Size:</strong>
                  <span>{selectedMaterial.size}</span>
                </div>
                <div className={classes.detailItem}>
                  <strong>Downloads:</strong>
                  <span>{selectedMaterial.downloads} times</span>
                </div>
                <div className={classes.detailItem}>
                  <strong>Upload Date:</strong>
                  <span>{selectedMaterial.uploadDate}</span>
                </div>
                <div className={classes.detailItem}>
                  <strong>Uploaded By:</strong>
                  <span>{selectedMaterial.uploadedBy}</span>
                </div>
              </div>

              {selectedMaterial.description && (
                <div className={classes.description}>
                  <h5>Description</h5>
                  <p>{selectedMaterial.description}</p>
                </div>
              )}
            </div>
            <div className={classes.modalActions}>
              <button onClick={() => handleDownload(selectedMaterial)}>
                <Download size={16} />
                Download
              </button>
              <button onClick={() => setShowDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaterialsTab
