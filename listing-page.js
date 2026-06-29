document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnAddInquiry = document.getElementById('btnAddInquiry');
    const uploadModal = document.getElementById('uploadModal');
    const uploadCloseBtn = document.getElementById('uploadCloseBtn');
    const btnCancel = document.getElementById('btnCancel');
    const btnUpload = document.getElementById('btnUpload');

    // Search and Table
    const searchInput = document.getElementById('searchInput');
    const listingBody = document.getElementById('listingBody');
    const emptyState = document.getElementById('emptyState');
    const listingTable = document.getElementById('listingTable');

    // Pagination
    const paginationInfo = document.getElementById('paginationInfo');
    const btnPrevPage = document.getElementById('btnPrevPage');
    const btnNextPage = document.getElementById('btnNextPage');

    // Modal Uploader Inner Elements
    const dropZone = document.getElementById('dropZone');
    const browseInput = document.getElementById('browseInput');
    const selectedSection = document.getElementById('selectedSection');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');

    // State Variables
    let inquiries = [];
    let filteredInquiries = [];
    let selectedFiles = [];
    
    // Pagination State
    let currentPage = 1;
    const itemsPerPage = 5;

    function loadInquiries() {
        inquiries = getInquiriesFromDB();
        applySearchFilter();
    }

    // Modal Toggles
    function openUploadModal() {
        uploadModal.classList.add('active');
    }

    function closeUploadModal() {
        uploadModal.classList.remove('active');
        selectedFiles = [];
        renderFileList();
    }

    btnAddInquiry.addEventListener('click', openUploadModal);
    uploadCloseBtn.addEventListener('click', closeUploadModal);
    btnCancel.addEventListener('click', closeUploadModal);
    uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) {
            closeUploadModal();
        }
    });

    // Uploader File Selection Handlers
    dropZone.addEventListener('click', () => {
        browseInput.click();
    });

    browseInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
        browseInput.value = '';
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('dragover');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        handleFiles(dt.files);
    });

    function handleFiles(files) {
        const validFiles = Array.from(files).filter(file => {
            if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
                showToast('Invalid format: ' + file.name + '. Only PDF files are supported.', 'error');
                return false;
            }
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                showToast('File too large: ' + file.name + '. Maximum size is 10 MB.', 'error');
                return false;
            }
            if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                showToast('File already added: ' + file.name, 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            selectedFiles = [...selectedFiles, ...validFiles];
            renderFileList();
            showToast(`Added ${validFiles.length} file(s) to queue.`, 'success');
        }
    }

    function renderFileList() {
        if (selectedFiles.length === 0) {
            selectedSection.style.display = 'none';
            btnUpload.disabled = true;
            return;
        }

        selectedSection.style.display = 'block';
        btnUpload.disabled = false;
        fileCount.textContent = `${selectedFiles.length} file(s) selected`;
        
        fileList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const sizeStr = formatBytes(file.size);
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <svg class="file-pdf-icon" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H8.5v-1.5H10c.8 0 1.5-.7 1.5-1.5S10.8 11.5 10 11.5H8.5V10H10c1.7 0 3 1.3 3 3s-1.3 3-3 3zm6-5.5h-3v1.5h3v1.5h-3V16H13V10h3v1.5zm-5 1H10v1h1v-1.5z"/>
                    </svg>
                    <div class="file-details">
                        <span class="file-name" title="${file.name}">${file.name}</span>
                        <span class="file-size">${sizeStr}</span>
                    </div>
                </div>
                <button type="button" class="file-remove-btn" data-index="${index}">
                    <svg viewBox="0 0 24 24" style="width: 14px; height: 14px;">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            `;
            
            fileItem.querySelector('.file-remove-btn').addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                removeFile(idx);
            });
            
            fileList.appendChild(fileItem);
        });
    }

    function removeFile(index) {
        selectedFiles.splice(index, 1);
        renderFileList();
    }

    // Modal Upload Action
    btnUpload.addEventListener('click', () => {
        if (selectedFiles.length === 0) return;

        const newUploads = [];
        selectedFiles.forEach((file) => {
            const date = new Date();
            const formattedDate = date.getFullYear() + '-' + 
                                  String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                                  String(date.getDate()).padStart(2, '0') + ' ' + 
                                  String(date.getHours()).padStart(2, '0') + ':' + 
                                  String(date.getMinutes()).padStart(2, '0');
            
            const nextSeq = 1000 + inquiries.length + 1 + newUploads.length;
            const newId = `ABS-INQ-${nextSeq}`;
            
            // Set Default POC Values on upload
            const newInquiry = {
                id: newId,
                customerName: 'Extracting...',
                swl: '-',
                sf: '-',
                qty: '-',
                uploadedOn: formattedDate,
                exportedOn: '-',
                extraction: 'Processing', // default
                validation: 'Pending',    // default
                status: 'Processing',    // default
                fileName: file.name,
                size: formatBytes(file.size),
                bagType: 'U-Panel Bag',
                fabricWeight: '',
                fabricColor: 'White',
                lamination: true,
                uvProtection: '',
                liner: false,
                linerType: 'None',
                linerThickness: '-',
                loopType: '4 Corner Loops',
                loopHeight: '30 cm',
                loopColor: '',
                loopTensile: '1000 kg',
                perimeterBand: false,
                bandWidth: '-',
                bandColor: '-',
                topConstruction: 'Duffle Top',
                topSpoutSize: '-',
                bottomConstruction: 'Flat Bottom',
                bottomSpoutSize: '-',
                printing: false,
                printingDetails: '-',
                docPouch: true,
                pouchPosition: 'Side panel',
                comments: 'Sacks will store standard polymer materials.'
            };
            
            newUploads.push(newInquiry);
        });

        // Prepends records so they are added to the top
        inquiries = [...newUploads, ...inquiries];
        saveInquiriesToDB(inquiries);

        // Closes popup modal automatically and resets queue
        closeUploadModal();
        showToast(`Successfully uploaded ${newUploads.length} inquiry file(s).`, 'success');

        currentPage = 1;
        applySearchFilter();

        // Background Simulated Timer trigger for modal uploads
        newUploads.forEach(inq => {
            simulateLocalProcessing(inq.id);
        });
    });

    function simulateLocalProcessing(inquiryId) {
        setTimeout(() => {
            const currentDb = getInquiriesFromDB();
            const idx = currentDb.findIndex(item => item.id === inquiryId);
            if (idx !== -1 && currentDb[idx].status === 'Processing') {
                currentDb[idx].status = 'In Review';
                currentDb[idx].extraction = 'Complete';
                currentDb[idx].validation = 'Valid';
                currentDb[idx].customerName = inferBuyerName(currentDb[idx].fileName);
                currentDb[idx].swl = '1000 kg';
                currentDb[idx].sf = '5:1';
                currentDb[idx].qty = '2,500 pcs';
                currentDb[idx].fabricWeight = '150 gsm';
                currentDb[idx].loopColor = 'Blue';
                currentDb[idx].uvProtection = true;
                currentDb[idx].bandColor = 'Standard White';
                
                saveInquiriesToDB(currentDb);
                loadInquiries();
                showToast(`Analysis completed for ${currentDb[idx].fileName}.`, 'success');
            }
        }, 8000);
    }

    // Search and Table Filters
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        applySearchFilter();
    });

    function applySearchFilter() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            filteredInquiries = [...inquiries];
        } else {
            filteredInquiries = inquiries.filter(inq => 
                inq.id.toLowerCase().includes(query) || 
                inq.customerName.toLowerCase().includes(query)
            );
        }
        
        renderListing();
    }

    // Grid Renderer
    function renderListing() {
        const totalItems = filteredInquiries.length;
        
        if (totalItems === 0) {
            emptyState.style.display = 'flex';
            listingTable.style.display = 'none';
            paginationInfo.textContent = 'Showing 0 to 0 of 0 entries';
            btnPrevPage.disabled = true;
            btnNextPage.disabled = true;
            return;
        }

        emptyState.style.display = 'none';
        listingTable.style.display = 'table';

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItems = filteredInquiries.slice(startIndex, endIndex);

        paginationInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
        btnPrevPage.disabled = currentPage === 1;
        btnNextPage.disabled = currentPage === totalPages;

        listingBody.innerHTML = '';
        pageItems.forEach((inq) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', inq.id);
            
            let statusClass = 'badge-outline gray';
            if (inq.status === 'Processing') statusClass = 'badge-outline orange';
            else if (inq.status === 'In Review') statusClass = 'badge-outline purple';
            else if (inq.status === 'Exported') statusClass = 'badge-outline green';
            else if (inq.status === 'Failed') statusClass = 'badge-outline red';

            let extClass = 'badge-outline green';
            let extDotColor = 'dot-green';
            if (inq.extraction === 'Partial' || inq.extraction === 'Processing') { extClass = 'badge-outline orange'; extDotColor = 'dot-orange'; }
            else if (inq.extraction === 'Failed') { extClass = 'badge-outline red'; extDotColor = 'dot-red'; }

            let valClass = 'badge-outline green';
            let valDotColor = 'dot-green';
            if (inq.validation === 'Review' || inq.validation === 'Pending') { valClass = 'badge-outline orange'; valDotColor = 'dot-orange'; }
            else if (inq.validation === 'Missing') { valClass = 'badge-outline red'; valDotColor = 'dot-red'; }

            tr.innerHTML = `
                <td style="font-weight: 700; color: var(--primary-color);">${inq.id}</td>
                <td style="font-weight: 600;">${inq.customerName}</td>
                <td>${inq.swl || '-'}</td>
                <td>${inq.sf || '-'}</td>
                <td style="font-weight: 600;">${inq.qty || '-'}</td>
                <td style="color: var(--text-secondary);">${inq.uploadedOn}</td>
                <td style="color: var(--text-secondary);">${inq.exportedOn}</td>
                <td>
                    <span class="${extClass}">
                        <span class="status-dot ${extDotColor}"></span>
                        ${inq.extraction}
                    </span>
                </td>
                <td>
                    <span class="${valClass}">
                        <span class="status-dot ${valDotColor}"></span>
                        ${inq.validation}
                    </span>
                </td>
                <td>
                    <span class="${statusClass}">
                        ${inq.status === 'In Review' ? 'Ready for Review' : inq.status}
                    </span>
                </td>
            `;

            tr.addEventListener('click', () => {
                sessionStorage.setItem('abs_selected_inquiry_id', inq.id);
                window.location.href = `details.html?id=${inq.id}`;
            });

            listingBody.appendChild(tr);
        });
    }

    // Pagination Click Listeners
    btnPrevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderListing();
        }
    });

    btnNextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderListing();
        }
    });

    // Listen to custom background DB update completions
    window.addEventListener('db-update', () => {
        loadInquiries();
    });

    function formatBytes(bytes, decimals = 1) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    loadInquiries();
});
