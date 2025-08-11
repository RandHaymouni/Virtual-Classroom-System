"use client"

import { useState, useMemo } from "react"
import type { IMaterialData } from "../types"

// Sample materials data
const sampleMaterials: IMaterialData[] = [
  {
    id: "1",
    title: "Introduction to HTML & CSS",
    type: "presentation",
    category: "Lectures",
    size: "2.5 MB",
    uploadDate: "2025-01-15",
    uploadedBy: "Dr. John Smith",
    downloads: 45,
    description: "Basic introduction to HTML and CSS fundamentals for web development.",
  },
  {
    id: "2",
    title: "JavaScript Fundamentals Video",
    type: "video",
    category: "Videos",
    size: "125 MB",
    uploadDate: "2025-01-10",
    uploadedBy: "Dr. John Smith",
    downloads: 32,
    description: "Comprehensive video covering JavaScript basics and ES6 features.",
  },
  {
    id: "3",
    title: "React Components Guide",
    type: "document",
    category: "Handouts",
    size: "1.8 MB",
    uploadDate: "2025-01-08",
    uploadedBy: "Dr. John Smith",
    downloads: 28,
    description: "Detailed guide on creating and managing React components.",
  },
  {
    id: "4",
    title: "CSS Grid Layout Tutorial",
    type: "presentation",
    category: "Lectures",
    size: "3.2 MB",
    uploadDate: "2025-01-05",
    uploadedBy: "Dr. John Smith",
    downloads: 19,
    description: "Advanced CSS Grid layout techniques and best practices.",
  },
]

const useMaterialsTab = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<IMaterialData | null>(null)

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(sampleMaterials.map((material) => material.category))]
    return cats
  }, [])

  const filteredMaterials = useMemo(() => {
    const filtered = sampleMaterials.filter((material) => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || material.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort materials
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case "downloads":
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const handleViewDetails = (material: IMaterialData) => {
    setSelectedMaterial(material)
    setShowDetailsModal(true)
  }

  const handleDownload = (material: IMaterialData) => {
    // Simulate download
    console.log(`Downloading: ${material.title}`)
    // In a real app, this would trigger the actual download
  }

  return {
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
  }
}

export default useMaterialsTab
