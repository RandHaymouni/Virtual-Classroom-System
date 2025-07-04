import { useRef, useState, type ChangeEvent, type MouseEvent, type DragEvent, useEffect } from "react";

const useUploadFile = () => { 
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<Array<string> | null>(null);
   
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
   
   
    useEffect(() => {
        if (selectedFiles == null) {
            setIsUploaded(false);
        }
        else if (selectedFiles.length > 0) {
            setIsUploaded(true);
        }

    }, [selectedFiles]);
    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            processFiles(files);
            event.target.value = '';
        } else {
            setSelectedFiles(null);
        }
    };

    const processFiles = (files: FileList) => {
        const filesNames = Array.from(files).map(file => file.name);
        setSelectedFiles(prevSelection => {

            if (prevSelection) {
                const distinctFiles = filesNames.filter(newFile =>
                    !prevSelection.includes(newFile)
                );
                return [...prevSelection, ...distinctFiles];
            }
            else return filesNames;
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


    return {
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