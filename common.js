// ==========================================================================
// Shared JavaScript for ABS Inquiry Processing Portal
// Handles mock DB state initialization and alerts.
// ==========================================================================

const initialMockInquiries = [
    {
        id: 'ABS-INQ-1001',
        customerName: 'Singapore Packaging Corp',
        uploadedOn: '2026-06-29 11:30',
        exportedOn: '2026-06-29 11:45',
        extraction: 'Complete',
        validation: 'Valid',
        status: 'Exported',
        fileName: 'Singapore_Logistics_Inquiry.pdf',
        size: '1.2 MB',

        // Core (7)
        swl: '1000', swlUnit: 'kg', sf: '5:1', qty: '5,000 pcs', bagType: 'U-Panel Bag',
        
        // Bag Design (21)
        unType: 'None', bagLength: '90', bagWidth: '90', bagHeight: '120', dimensionType: 'Internal', dimensionUnit: 'cm',
        topDesign: 'Spout', skirtRope: 'No', skirtHemming: 'Yes', topSpoutDiameter: '35', topSpoutHeight: '50', topSpoutRope: 'Yes', topSecondaryClosure: 'No', topSecondaryClosureRope: 'No',
        bottomSpoutDiameter: '35', bottomSpoutHeight: '50', bottomSpoutRope: 'Yes', bottomSpoutHemming: 'Yes', bottomSecondaryClosure: 'Star Closure', bottomSecondaryClosureRope: 'Yes', hygieneLevel: 'Standard',
        
        // Fabric (17)
        fabricType: 'Flat', bodyFabricGSM: '160', bodyFabricCoatingGSM: '20', doubleLayer: 'No', doubleLayerGSM: '-', conicalBottom: 'No', bottomFlap: 'No', bottomFlapLength: '-', bottomFlapWidth: '-', conicalTop: 'No', topFlap: 'No', topFlapLength: '-', topFlapWidth: '-', internalBaffles: 'No', bafflesGSM: '-', bafflesCoatingType: '-', bafflesPosition: '-',
        
        // Material / Liner (5)
        linerType: 'None', linerDesign: '-', linerAttachment: '-', baffleLiner: 'No', linerThickness: '-',
        
        // Loop Configuration (8)
        loopType: 'Corner', loopGrammage: '45', loopAttachmentSL: '30', loopAttachmentLL: '30', loopDropdownLength: '30', loopColour: 'White', loopCover: 'No', loopCoverColour: '-',
        
        // Band Details (2)
        bandRequirement: 'No', bandColour: '-',
        
        // Bag Construction (2)
        stitchingType: 'Overlock + Chain', stitchingColour: 'White',
        
        // Accessories (16)
        dustproof: 'No', dustproofSingle: 'No', dustproofDouble: 'No', dustproofTriple: 'No', extraAccessories: 'No', patchUnderLoop: 'No', multifilamentLoop: 'No', extraLoop: 'No', extraLoopColour: '-', fullLoop: 'No', fullLoopColour: '-', printingRequired: 'Yes', printingSide: '1 Side', printingColour: 'Black', customerInstructions: 'Handle with care', documentPouch: 'Top Edge'
    },
    {
        id: 'ABS-INQ-1002',
        customerName: 'KL Chemicals Berhad',
        uploadedOn: '2026-06-29 14:15',
        exportedOn: '-',
        extraction: 'Complete',
        validation: 'Review',
        status: 'In Review',
        fileName: 'Malaysia_Chemicals_PO_RFQ.pdf',
        size: '840 KB',

        // Core (7)
        swl: '1250', swlUnit: 'kg', sf: '6:1', qty: '1,200 pcs', bagType: 'U-Panel Bag',
        
        // Bag Design (21)
        unType: 'UN 13H3', bagLength: '', bagWidth: '', bagHeight: '', dimensionType: 'External', dimensionUnit: 'cm', // Missing 3 fields
        topDesign: 'Duffle', skirtRope: 'Yes', skirtHemming: 'Yes', topSpoutDiameter: '-', topSpoutHeight: '-', topSpoutRope: '-', topSecondaryClosure: '-', topSecondaryClosureRope: '-',
        bottomSpoutDiameter: '40', bottomSpoutHeight: '50', bottomSpoutRope: 'Yes', bottomSpoutHemming: 'Yes', bottomSecondaryClosure: 'No', bottomSecondaryClosureRope: 'No', hygieneLevel: 'Clean Room',
        
        // Fabric (17)
        fabricType: 'Circular', bodyFabricGSM: '180', bodyFabricCoatingGSM: '0', doubleLayer: 'No', doubleLayerGSM: '-', conicalBottom: 'No', bottomFlap: 'No', bottomFlapLength: '-', bottomFlapWidth: '-', conicalTop: 'No', topFlap: 'No', topFlapLength: '-', topFlapWidth: '-', internalBaffles: 'No', bafflesGSM: '-', bafflesCoatingType: '-', bafflesPosition: '-',
        
        // Material / Liner (5)
        linerType: 'Form-Fit', linerDesign: 'Tubular', linerAttachment: 'Glued', baffleLiner: 'No', linerThickness: '80',
        
        // Loop Configuration (8)
        loopType: 'Cross Corner', loopGrammage: '50', loopAttachmentSL: '25', loopAttachmentLL: '25', loopDropdownLength: '25', loopColour: 'Blue', loopCover: 'No', loopCoverColour: '-',
        
        // Band Details (2)
        bandRequirement: 'Yes', bandColour: 'Blue',
        
        // Bag Construction (2)
        stitchingType: 'Dustproof', stitchingColour: 'Blue',
        
        // Accessories (16)
        dustproof: 'Yes', dustproofSingle: 'Yes', dustproofDouble: 'No', dustproofTriple: 'No', extraAccessories: 'No', patchUnderLoop: 'Yes', multifilamentLoop: 'No', extraLoop: 'No', extraLoopColour: '-', fullLoop: 'No', fullLoopColour: '-', printingRequired: 'No', printingSide: '-', printingColour: '-', customerInstructions: '', documentPouch: 'Zip Lock'
    }
];

// LocalStorage database controller with older schema auto-flusher
function getInquiriesFromDB() {
    const stored = localStorage.getItem('abs_inquiries');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Verify if cached items lack the UNType field (older schema from previous turns)
            if (parsed && parsed.length > 0 && parsed[0].unType === undefined) {
                localStorage.setItem('abs_inquiries', JSON.stringify(initialMockInquiries));
                return [...initialMockInquiries];
            }
            return parsed;
        } catch (e) {
            // fallback
        }
    }
    localStorage.setItem('abs_inquiries', JSON.stringify(initialMockInquiries));
    return [...initialMockInquiries];
}

function saveInquiriesToDB(inquiries) {
    localStorage.setItem('abs_inquiries', JSON.stringify(inquiries));
}

// Global Toast Alerts
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `alert-toast ${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
        iconSvg = '<svg width="16" height="16" fill="#10b981" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
    } else if (type === 'error') {
        iconSvg = '<svg width="16" height="16" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
    } else {
        iconSvg = '<svg width="16" height="16" fill="#0284c7" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
    }

    toast.innerHTML = `
        ${iconSvg}
        <span>${message}</span>
    `;
    
    container.appendChild(toast);

    // Fade out and remove
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse';
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);
}

// Background extraction timer simulated loops
function resumeProcessingTimers() {
    const inquiries = getInquiriesFromDB();
    inquiries.forEach(inq => {
        if (inq.status === 'Processing') {
            const timeoutSeconds = 8000;
            setTimeout(() => {
                const refreshedInquiries = getInquiriesFromDB();
                const idx = refreshedInquiries.findIndex(item => item.id === inq.id);
                if (idx !== -1 && refreshedInquiries[idx].status === 'Processing') {
                    refreshedInquiries[idx].status = 'In Review';
                    refreshedInquiries[idx].extraction = 'Complete';
                    refreshedInquiries[idx].validation = 'Valid';
                    refreshedInquiries[idx].customerName = inferBuyerName(refreshedInquiries[idx].fileName);
                    refreshedInquiries[idx].swl = '1000 kg';
                    refreshedInquiries[idx].sf = '5:1';
                    refreshedInquiries[idx].qty = '2,500 pcs';
                    refreshedInquiries[idx].fabricWeight = '150 gsm';
                    refreshedInquiries[idx].loopColor = 'Blue';
                    refreshedInquiries[idx].uvProtection = true;
                    refreshedInquiries[idx].bandColor = 'Standard White';
                    
                    saveInquiriesToDB(refreshedInquiries);
                    
                    // Trigger dynamic listings updates
                    window.dispatchEvent(new CustomEvent('db-update', { detail: { id: inq.id } }));
                    showToast(`Analysis completed for ${refreshedInquiries[idx].fileName}.`, 'success');
                }
            }, timeoutSeconds);
        }
    });
}

function inferBuyerName(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('singapore')) return 'Singapore Packaging Corp';
    if (lower.includes('malaysia') || lower.includes('kl')) return 'KL Chemicals Berhad';
    if (lower.includes('vietnam')) return 'Saigon Industrial Bags';
    if (lower.includes('shipping') || lower.includes('cargo')) return 'Pacific Marine Cargo';
    return 'Standard Logistics Asia Ltd';
}

// Auto-run DB init
getInquiriesFromDB();
resumeProcessingTimers();

// Expose globals for Vite module scope
window.getInquiriesFromDB = getInquiriesFromDB;
window.saveInquiriesToDB = saveInquiriesToDB;
window.showToast = showToast;
