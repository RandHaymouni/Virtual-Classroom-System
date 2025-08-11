import { useRef, useState, type ChangeEvent, type MouseEvent, type DragEvent, useEffect } from "react";

const useUploadFile = (assignmentId: string) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const [selectedFiles, setSelectedFiles] = useState<Array<string> | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    useEffect(() => {
        if (selectedFiles == null) {
            setIsUploaded(false);
        }
        else if (selectedFiles.length > 0) {
            setIsUploaded(true);
        }

    }, [selectedFiles]);

    const cancelSub = () => {
        if (selectedFiles?.length) {
            setSelectedFiles(null);
        }
        else {
            window.location.href = '/StudentViewClass';
        }
    };
    const isTotalFileSizeLessThan10MB = (fileLists: FileList[]): boolean => {
        const MAX_SIZE_BYTES = 10 * 1024 * 1024;
        let totalSize = 0;
        for (const fileList of fileLists) {
            totalSize += Array.from(fileList).reduce((sum, file) => sum + file.size, 0);
        }
        return totalSize < MAX_SIZE_BYTES;
    };

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0 ) {
            const filesLength = isTotalFileSizeLessThan10MB([files as FileList]);
            if (filesLength) {
                processFiles(files);
                event.target.value = '';
            }
            else {
                alert('Total file size exceeds 10 MB. Please select smaller files.');
                setSelectedFiles(null);
            }
        } else {
            setSelectedFiles(null);
        }
    };

    // const processFiles = (files: FileList) => {
    //     const filesNames = Array.from(files).map(file => file.name);
    //     setSelectedFiles(prevSelection => {

    //         if (prevSelection) {
    //             const distinctFiles = filesNames.filter(newFile =>
    //                 !prevSelection.includes(newFile)
    //             );
    //             return [...prevSelection, ...distinctFiles];
    //         }
    //         else return filesNames;
    //     });
    // };
    const processFiles = (files: FileList) => {
        const filesArray = Array.from(files);
        setSelectedFiles(prevSelection => {
            if (prevSelection) {
                const existingNames = prevSelection.map(f => f.name);
                const distinctFiles = filesArray.filter(newFile =>
                    !existingNames.includes(newFile.name)
                );
                return [...prevSelection, ...distinctFiles];
            } else {
                return filesArray;
            }
        });
    };

    const removeFile = (index: number) => {
        if (selectedFiles) {
            const updatedFiles = [...selectedFiles];
            updatedFiles.splice(index, 1);
            setSelectedFiles(updatedFiles.length > 0 ? updatedFiles : null);
        }

    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const validTypes = ['.pdf', '.docx', '.zip', '.jpg'];
            const validFiles = Array.from(files).filter(file => {
                const extension = '.' + file.name.split('.').pop()?.toLowerCase();
                return validTypes.includes(extension);
            });

            if (validFiles.length > 0) {
                const fileList = new DataTransfer();
                validFiles.forEach(file => fileList.items.add(file));
                processFiles(fileList.files);
            }
        }
    };

    // const getToken = () => {
    //     return localStorage.getItem('authToken') || '';
    // };

    const handleSubmit = async () => {
        try {
            if (!selectedFiles || selectedFiles.length === 0) {
                throw new Error('No files selected');
            }

            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append(`files`, file);
            });

            formData.append('assignmentId', assignmentId);

            const response = await fetch(`/submissions/${assignmentId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Upload successful:', result);
            alert('Upload successful');

            setSelectedFiles(null);
            setIsUploaded(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            return result;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    return {
        handleSubmit,
        cancelSub,
        fileInputRef,
        selectedFiles,
        isUploaded,
        handleButtonClick,
        handleFileChange,
        removeFile,
        handleDragOver,
        handleDragEnter,
        handleDragLeave, handleDrop
    }
}
export { useUploadFile }