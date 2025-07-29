import { useState } from 'react';
import type { IMaterial } from '../types';
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
];
const categories = ["All", "Lectures", "Videos", "References", "Templates"]

const useMaterialsTab = () => {
    const [materials, setMaterials] = useState<IMaterial[]>(initialMaterials);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

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
        const link = document.createElement("a");
        link.href = "#";
        link.download = material.title;
        link.click();
    }

    const handleViewDetails = (material: IMaterial) => {
        setSelectedMaterial(material);
        setShowDetailsModal(true);
    }

    return {
        searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, sortBy, setSortBy, filteredMaterials, handleViewDetails, handleDownload, showDetailsModal, setShowDetailsModal, selectedMaterial
    };
}

export default useMaterialsTab
