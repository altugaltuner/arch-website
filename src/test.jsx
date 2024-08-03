<div className="flow-descriptions">
    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ofisim</span>İşinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır. Ofisim sayesinde projelerinizi, dosyalarınızı ve ekip üyelerinizi tek bir platformda toplar, iş süreçlerinizi daha verimli hale getirir.</p>

    <h2 className="flow-desc-subheader">Ana Özellikler</h2>

    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold"> Proje ve Görev Yönetimi</span>Projelerinizi ve görevlerinizi kolayca oluşturun, düzenleyin ve yönetin. Her görevi ayrıntılı bir şekilde tanımlayın, önceliklendirin ve zamanlayın.</p>

    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ekip İşbirliği</span>Ekip üyelerinizle anlık iletişim kurun, yorum yapın ve dosya paylaşın. Ortak çalışma alanları sayesinde herkes her zaman güncel bilgilere ulaşabilir.</p>

    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Dosya ve Belge Yönetimi</span> Projelerinizle ilgili tüm dosyaları ve belgeleri tek bir yerde depolayın. Kolay erişim ve düzenleme imkanları ile dosya karmaşasından kurtulun.</p>

    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Durum Takibi</span>
        Görevlerin ve projelerin ilerleyişini anlık olarak izleyin. Görsel gösterge panelleri sayesinde ekibinizin performansını ve proje durumunu kolayca takip edin.</p>

    <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Esnek ve Kullanıcı Dostu</span> Ofisim, kullanıcı dostu arayüzü ile herkesin kolayca adapte olabileceği bir yapıya sahiptir. Ayrıca, farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir.</p>
</div>

import React, { useState, useEffect, useRef } from "react";
import "./ProjectSection.scss";
import axios from 'axios';
import deleteIcon from "../../assets/icons/delete-icon.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import folderIcon from "../../assets/icons/folder-icon.png";
import docxIcon from "../../assets/icons/docx-icon.png";
import pdfIcon from "../../assets/icons/pdf-logo.png";
import jpgIcon from "../../assets/icons/jpg-icon.png";
import pngIcon from "../../assets/icons/png-logo.png";
import txtIcon from "../../assets/icons/txt-icon.png";
import dwgIcon from "../../assets/icons/dwg-icon.png";
import jpegIcon from "../../assets/icons/jpeg-icon.webp";
import goBackButton from "../../assets/icons/back-button.png";
import DeleteFolderModal from "../GroupModals/DeleteFolderModal";
import EditProjectFolderModal from "../EditProjectFolderModal/EditProjectFolderModal";
import NewFolderModal from "../NewFolderModal/NewFolderModal";
import FileModal from "../FileModal/FileModal";
import FolderContent from "../FolderContent/FolderContent";
import { useAuth } from "../../components/AuthProvider";

function ProjectSection({ clickedProject, setNewHistoryEntry }) {
    const { user } = useAuth();

    const userRole = user && user.access ? user.access.role : "null";

    const [projectFolders, setProjectFolders] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [folderToEdit, setFolderToEdit] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentFiles, setCurrentFiles] = useState([]);
    const fileInputRef = useRef(null);

    const fileIcons = {
        "docx": docxIcon,
        "doc": docxIcon,
        "pdf": pdfIcon,
        "jpg": jpgIcon,
        "png": pngIcon,
        "dwg": dwgIcon,
        "jpeg": jpegIcon,
        "txt": txtIcon,
    };

    const [newFolder, setNewFolder] = useState({
        projectFolderName: ""
    });
    const [currentFolder, setCurrentFolder] = useState(null);
    const [parentFolder, setParentFolder] = useState(null);

    useEffect(() => {
        async function getRoles() {
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/accesses');
                setRoles(response.data.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        }
        getRoles();
    }, []);

    const fetchProjectFolders = async () => {
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/projects?populate=project_folders.folderContent');
            setProjectFolders(response.data.data);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    useEffect(() => {
        fetchProjectFolders();
    }, []);

    const filteredFolders = clickedProject
        ? projectFolders.find((project) => project.id === clickedProject.id)?.attributes.project_folders.data
        : [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFolder({ ...newFolder, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            projectFolderName: newFolder.projectFolderName,
            project: clickedProject.id
        }));

        try {
            await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/project-folders', formData);
            setShowModal(false);
            setNewFolder({ projectFolderName: "" });
            await fetchProjectFolders();
            createFolderHistoryEntry('oluşturma', newFolder.projectFolderName);
        } catch (error) {
            console.error('Error creating a new project folder', error);
        }
    };

    const handleDeleteFolder = async () => {
        if (folderToDelete) {
            try {
                await axios.delete(`https://bold-animal-facf707bd9.strapiapp.com/api/project-folders/${folderToDelete}`);
                setShowDeleteModal(false);
                setFolderToDelete(null);
                await fetchProjectFolders();
                createFolderHistoryEntry('silme', folderToDelete.toString());
            } catch (error) {
                console.error('Error deleting the project folder', error);
            }
        }
    };

    const handleDeleteFile = async (fileId) => {
        try {
            await axios.delete(`https://bold-animal-facf707bd9.strapiapp.com/api/upload/files/${fileId}`);
            setFileModal(false);
            setCurrentFiles(currentFiles.filter(file => file.id !== fileId));
            createHistoryEntry('silme', fileId.toString(), currentFolder.id.toString()); // Ensure IDs are strings
        } catch (error) {
            console.error('Error deleting the file', error);
        }
    };

    const handleEditFolder = (id) => {
        const folder = projectFolders.find((project) =>
            project.attributes.project_folders.data.some((folder) => folder.id === id)
        )?.attributes.project_folders.data.find((folder) => folder.id === id);

        setFolderToEdit(folder);
        setNewFolderName(folder.attributes.projectFolderName);
        setEditModal(true);
    };

    const handleEditSubmit = async () => {
        if (folderToEdit) {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                projectFolderName: newFolderName
            }));

            try {
                await axios.put(`https://bold-animal-facf707bd9.strapiapp.com/api/project-folders/${folderToEdit.id}`, formData);
                setEditModal(false);
                setFolderToEdit(null);
                setNewFolderName("");
                await fetchProjectFolders();
                createFolderHistoryEntry('isim değiştirme', newFolderName);
            } catch (error) {
                console.error('Error editing the project folder', error);
            }
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);

        try {
            const uploadResponse = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedFile = uploadResponse.data[0];

            const updatedContent = currentFolder.folderContent && currentFolder.folderContent.data
                ? [...currentFolder.folderContent.data, uploadedFile]
                : [uploadedFile];

            await axios.put(`https://bold-animal-facf707bd9.strapiapp.com/api/project-folders/${currentFolder.id}`, {
                data: {
                    folderContent: updatedContent.map(file => file.id),
                },
            });

            // Update state with new file
            setCurrentFiles(updatedContent);
            setCurrentFolder(prevFolder => ({
                ...prevFolder,
                folderContent: { data: updatedContent }
            }));

            // Update project folders with new file
            setProjectFolders(prevFolders => prevFolders.map(folder => {
                if (folder.id === currentFolder.id) {
                    return { ...folder, folderContent: { data: updatedContent } };
                }
                return folder;
            }));

            // Create history entry
            createHistoryEntry('yükleme', uploadedFile.id.toString(), currentFolder.id.toString());

        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };

    const uploadFile = () => {
        fileInputRef.current.click();
    };

    function openInsideFolder(folder) {
        setParentFolder(currentFolder);
        setCurrentFolder({ id: folder.id, ...folder.attributes });
        setCurrentFiles(folder.attributes.folderContent ? folder.attributes.folderContent.data : []);
    }

    function goBack() {
        setCurrentFolder(parentFolder);
        setParentFolder(null);
        setCurrentFiles(parentFolder ? parentFolder.folderContent.data : []);
    }

    const openFileModal = (file) => {
        setCurrentFile(file);
        setFileModal(true);
    };

    const renderFoldersAndFiles = (folder) => {
        if (!folder || !currentFiles) {
            return (
                <div className="folder-content">
                    <button className="file-preview-upload" onClick={uploadFile}>Dosya Yükle</button>
                </div>
            );
        }

        const filteredFiles = currentFiles.filter((file) =>
            file.attributes && file.attributes.name && file.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <FolderContent
                folder={{ id: folder.id, ...folder }}
                fileIcons={fileIcons}
                openFileModal={openFileModal}
                filteredFiles={filteredFiles}
            />
        );
    };

    const createHistoryEntry = async (action, file, folder) => {
        const userId = user.id;
        const timestamp = new Date().toISOString();
        const fileId = file.id ? file.id : file;
        const folderId = folder.id ? folder.id : folder;

        try {
            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/histories', {
                data: {
                    action,
                    file: fileId.toString(),
                    folder: folderId.toString(),
                    timestamp,
                    users_permissions_users: userId,
                    project: clickedProject.id,
                }
            });
            setNewHistoryEntry(response.data.data);
        } catch (error) {
            console.error('Error creating history entry', error);
        }
    };

    const createFolderHistoryEntry = async (action, folderName) => {
        const userId = user.id;
        const timestamp = new Date().toISOString();

        try {
            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/histories', {
                data: {
                    action,
                    folder: folderName,
                    timestamp,
                    users_permissions_users: userId,
                    project: clickedProject.id,
                }
            });
            setNewHistoryEntry(response.data.data);
        } catch (error) {
            console.error('Error creating folder history entry', error);
        }
    };

    return (
        <div className="project-folders">
            {userRole === "Admin" || userRole === "Contributor" ? (
                <button
                    className="project-folder-button"
                    onClick={() => setShowModal(true)}
                >
                    Klasör Oluştur
                </button>
            ) : null}
            {currentFolder ? (
                <div className="current-folders-div">
                    <div className="current-folders-div-2">
                        <button className="go-back-btn" onClick={goBack}>
                            <img src={goBackButton} alt="" className="go-back-btn-img" />
                        </button>
                        <h2 className="current-folder-header">{currentFolder.projectFolderName}</h2>
                        <input
                            type="text"
                            className="project-file-search"
                            placeholder="Dosya Ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {renderFoldersAndFiles(currentFolder)}
                </div>
            ) : (
                filteredFolders && filteredFolders.length > 0 ? (
                    <div className="project-folders-container">
                        {filteredFolders.map((folder) => (
                            <div className="project-folder" key={folder.id} onClick={() => openInsideFolder(folder)}>
                                {userRole === "Admin" || userRole === "Contributor" ? (
                                    <div className="edit-delete-button-div">
                                        <img
                                            className="file-card-delete-btn"
                                            src={deleteIcon}
                                            alt="delete-icon"
                                            onClick={(e) => { e.stopPropagation(); setFolderToDelete(folder.id); setShowDeleteModal(true); }}
                                        />
                                        <img className="file-card-edit-btn" src={editPencil} alt="edit-icon" onClick={(e) => { e.stopPropagation(); handleEditFolder(folder.id); }} />
                                    </div>
                                ) : null}
                                <div className="project-card-rest-of">
                                    <h2 className="project-folder-name" data-fulltext={folder.attributes.projectFolderName}>
                                        {folder.attributes.projectFolderName}
                                    </h2>
                                    <img
                                        className="project-folder-image"
                                        src={folderIcon}
                                        alt="folder-icon"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="dustbin-project-folder">
                            <h2 className="project-folder-name">Çöp Kutusu</h2>
                            <img
                                className="project-folder-image"
                                src={folderIcon}
                                alt="folder-icon"
                            />
                        </div>
                    </div>
                ) : (
                    <p>Bu projede henüz dosya yok.</p>
                )
            )}

            {showModal && (
                <NewFolderModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    newFolder={newFolder}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            )}

            {fileModal && (
                <FileModal
                    fileModal={fileModal}
                    setFileModal={setFileModal}
                    currentFile={currentFile}
                    fileIcons={fileIcons}
                    handleDeleteFile={handleDeleteFile}
                />
            )}

            {showDeleteModal && (
                <DeleteFolderModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    handleDeleteFolder={handleDeleteFolder}
                />
            )}

            {editModal && (
                <EditProjectFolderModal
                    showEditModal={editModal}
                    setEditModal={setEditModal}
                    folderToEdit={folderToEdit}
                    newFolderName={newFolderName}
                    setNewFolderName={setNewFolderName}
                    handleEditSubmit={handleEditSubmit}
                />
            )}

            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
        </div>
    );
}

export default ProjectSection;
