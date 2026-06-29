document.addEventListener('DOMContentLoaded', () => {
    // 1. Resolve Inquiry ID from URL parameter or Session Storage
    const urlParams = new URLSearchParams(window.location.search);
    let inquiryId = urlParams.get('id');
    
    if (!inquiryId) {
        inquiryId = sessionStorage.getItem('abs_selected_inquiry_id');
    }

    if (!inquiryId) {
        showToast('No inquiry selected. Redirecting...', 'error');
        setTimeout(() => {
            window.location.href = 'listing.html';
        }, 1500);
        return;
    }

    // Save to session storage for reference
    sessionStorage.setItem('abs_selected_inquiry_id', inquiryId);

    // DOM Elements
    const pdfFileNameSpan = document.getElementById('pdfFileNameSpan');
    const pdfSheet = document.getElementById('pdfSheet');
    const headerInquiryBadge = document.getElementById('headerInquiryBadge');

    if (headerInquiryBadge) {
        headerInquiryBadge.textContent = inquiryId;
    }

        const fldCustomerName = document.getElementById('fldCustomerName');
    const fldInquiryRef = document.getElementById('fldInquiryRef');
    const fldSwl = document.getElementById('fldSwl');
    const fldSwlUnit = document.getElementById('fldSwlUnit');
    const fldSf = document.getElementById('fldSf');
    const fldQty = document.getElementById('fldQty');
    const fldBagType = document.getElementById('fldBagType');
    const fldUnType = document.getElementById('fldUnType');
    const fldBagLength = document.getElementById('fldBagLength');
    const fldBagWidth = document.getElementById('fldBagWidth');
    const fldBagHeight = document.getElementById('fldBagHeight');
    const fldDimensionType = document.getElementById('fldDimensionType');
    const fldDimensionUnit = document.getElementById('fldDimensionUnit');
    const fldTopDesign = document.getElementById('fldTopDesign');
    const fldSkirtRope = document.getElementById('fldSkirtRope');
    const fldSkirtHemming = document.getElementById('fldSkirtHemming');
    const fldTopSpoutDiameter = document.getElementById('fldTopSpoutDiameter');
    const fldTopSpoutHeight = document.getElementById('fldTopSpoutHeight');
    const fldTopSpoutRope = document.getElementById('fldTopSpoutRope');
    const fldTopSecondaryClosure = document.getElementById('fldTopSecondaryClosure');
    const fldTopSecondaryClosureRope = document.getElementById('fldTopSecondaryClosureRope');
    const fldBottomSpoutDiameter = document.getElementById('fldBottomSpoutDiameter');
    const fldBottomSpoutHeight = document.getElementById('fldBottomSpoutHeight');
    const fldBottomSpoutRope = document.getElementById('fldBottomSpoutRope');
    const fldBottomSpoutHemming = document.getElementById('fldBottomSpoutHemming');
    const fldBottomSecondaryClosure = document.getElementById('fldBottomSecondaryClosure');
    const fldBottomSecondaryClosureRope = document.getElementById('fldBottomSecondaryClosureRope');
    const fldHygieneLevel = document.getElementById('fldHygieneLevel');
    const fldFabricType = document.getElementById('fldFabricType');
    const fldBodyFabricGSM = document.getElementById('fldBodyFabricGSM');
    const fldBodyFabricCoatingGSM = document.getElementById('fldBodyFabricCoatingGSM');
    const fldDoubleLayer = document.getElementById('fldDoubleLayer');
    const fldDoubleLayerGSM = document.getElementById('fldDoubleLayerGSM');
    const fldConicalBottom = document.getElementById('fldConicalBottom');
    const fldBottomFlap = document.getElementById('fldBottomFlap');
    const fldBottomFlapLength = document.getElementById('fldBottomFlapLength');
    const fldBottomFlapWidth = document.getElementById('fldBottomFlapWidth');
    const fldConicalTop = document.getElementById('fldConicalTop');
    const fldTopFlap = document.getElementById('fldTopFlap');
    const fldTopFlapLength = document.getElementById('fldTopFlapLength');
    const fldTopFlapWidth = document.getElementById('fldTopFlapWidth');
    const fldInternalBaffles = document.getElementById('fldInternalBaffles');
    const fldBafflesGSM = document.getElementById('fldBafflesGSM');
    const fldBafflesCoatingType = document.getElementById('fldBafflesCoatingType');
    const fldBafflesPosition = document.getElementById('fldBafflesPosition');
    const fldLinerType = document.getElementById('fldLinerType');
    const fldLinerDesign = document.getElementById('fldLinerDesign');
    const fldLinerAttachment = document.getElementById('fldLinerAttachment');
    const fldBaffleLiner = document.getElementById('fldBaffleLiner');
    const fldLinerThickness = document.getElementById('fldLinerThickness');
    const fldLoopType = document.getElementById('fldLoopType');
    const fldLoopGrammage = document.getElementById('fldLoopGrammage');
    const fldLoopAttachmentSL = document.getElementById('fldLoopAttachmentSL');
    const fldLoopAttachmentLL = document.getElementById('fldLoopAttachmentLL');
    const fldLoopDropdownLength = document.getElementById('fldLoopDropdownLength');
    const fldLoopColour = document.getElementById('fldLoopColour');
    const fldLoopCover = document.getElementById('fldLoopCover');
    const fldLoopCoverColour = document.getElementById('fldLoopCoverColour');
    const fldBandRequirement = document.getElementById('fldBandRequirement');
    const fldBandColour = document.getElementById('fldBandColour');
    const fldStitchingType = document.getElementById('fldStitchingType');
    const fldStitchingColour = document.getElementById('fldStitchingColour');
    const fldDustproof = document.getElementById('fldDustproof');
    const fldDustproofSingle = document.getElementById('fldDustproofSingle');
    const fldDustproofDouble = document.getElementById('fldDustproofDouble');
    const fldDustproofTriple = document.getElementById('fldDustproofTriple');
    const fldExtraAccessories = document.getElementById('fldExtraAccessories');
    const fldPatchUnderLoop = document.getElementById('fldPatchUnderLoop');
    const fldMultifilamentLoop = document.getElementById('fldMultifilamentLoop');
    const fldExtraLoop = document.getElementById('fldExtraLoop');
    const fldExtraLoopColour = document.getElementById('fldExtraLoopColour');
    const fldFullLoop = document.getElementById('fldFullLoop');
    const fldFullLoopColour = document.getElementById('fldFullLoopColour');
    const fldPrintingRequired = document.getElementById('fldPrintingRequired');
    const fldPrintingSide = document.getElementById('fldPrintingSide');
    const fldPrintingColour = document.getElementById('fldPrintingColour');
    const fldCustomerInstructions = document.getElementById('fldCustomerInstructions');
    const fldDocumentPouch = document.getElementById('fldDocumentPouch');
    // Buttons
    const btnDetailsSave = document.getElementById('btnDetailsSave');
    const btnHeaderExport = document.getElementById('btnHeaderExport');

    // Load Inquiries and bind
    let inquiries = getInquiriesFromDB();
    let currentInquiry = inquiries.find(item => item.id === inquiryId);

    if (!currentInquiry) {
        showToast('Inquiry not found in local database.', 'error');
        setTimeout(() => {
            window.location.href = 'listing.html';
        }, 1500);
        return;
    }

    // Render Preview and Form Values
    renderPdfSheet(currentInquiry);
    renderDetailsFields(currentInquiry);

    setTimeout(() => {
        updateDynamicUI(currentInquiry);
    }, 50);

    function updateDynamicUI(inq) {
        const badgeExtraction = document.getElementById('badgeExtraction');
        const badgeValidation = document.getElementById('badgeValidation');
        const badgeExported = document.getElementById('badgeExported');
        
        if (badgeExtraction) {
            let extClass = 'badge-outline green';
            let extDot = 'dot-green';
            if (inq.extraction === 'Partial' || inq.extraction === 'Processing') { extClass = 'badge-outline orange'; extDot = 'dot-orange'; }
            else if (inq.extraction === 'Failed') { extClass = 'badge-outline red'; extDot = 'dot-red'; }
            badgeExtraction.className = extClass;
            badgeExtraction.innerHTML = `<span class="status-dot ${extDot}"></span> Extraction: ${inq.extraction}`;
        }
        
        if (badgeValidation) {
            let valClass = 'badge-outline green';
            let valDot = 'dot-green';
            if (inq.validation === 'Review' || inq.validation === 'Pending') { valClass = 'badge-outline orange'; valDot = 'dot-orange'; }
            else if (inq.validation === 'Missing') { valClass = 'badge-outline red'; valDot = 'dot-red'; }
            badgeValidation.className = valClass;
            badgeValidation.innerHTML = `<span class="status-dot ${valDot}"></span> Validation: ${inq.validation}`;
        }
        
        if (badgeExported) {
            if (inq.status === 'Exported') {
                badgeExported.className = 'badge-outline green';
                badgeExported.innerHTML = `<span class="status-dot dot-green"></span> CSV: Exported`;
            } else {
                badgeExported.className = 'badge-outline gray';
                badgeExported.innerHTML = `<span class="status-dot dot-gray" style="background-color: #94a3b8;"></span> CSV: Not Exported`;
            }
        }

        updateAccordionTags();
    }

    function updateAccordionTags() {
        document.querySelectorAll('.accordion-item').forEach(item => {
            const missingCount = item.querySelectorAll('.missing-field').length;
            const summary = item.querySelector('.accordion-summary');
            
            // Reset styles
            summary.style.border = '';
            summary.style.borderRadius = '6px'; // to match existing rounded look
            
            const existingBadge = summary.querySelector('.accordion-badge');
            if (existingBadge) existingBadge.remove();
            
            if (missingCount > 0) {
                summary.style.border = '1px solid #ef4444';
                const label = missingCount === 1 ? 'Issue' : 'Issues';
                summary.insertAdjacentHTML('beforeend', `<span class="accordion-badge issue" style="color: #ef4444; margin-left: 6px; background: transparent; padding: 0;">• ${missingCount} ${label}</span>`);
            }
        });
    }

    // Simulated original PDF rendering
    function renderPdfSheet(inq) {
        pdfFileNameSpan.textContent = `Document Preview: ${inq.fileName}`;
        
        pdfSheet.innerHTML = `
            <div class="pdf-header-tag">
                <div class="pdf-header-title">Purchase Inquiry RFQ</div>
                <div style="font-size: 10px; margin-top: 4px;">Asia Bulk Sacks Specification Document</div>
            </div>
            
            <div class="pdf-content-grid">
                <div class="pdf-row">
                    <span class="pdf-bold">RFQ Reference No:</span>
                    <span>${inq.id}</span>
                </div>
                <div class="pdf-row">
                    <span class="pdf-bold">Buyer Entity:</span>
                    <span>${inq.customerName}</span>
                </div>
                <div class="pdf-row">
                    <span class="pdf-bold">Request Date:</span>
                    <span>${inq.uploadedOn}</span>
                </div>
                <div style="height: 1px; background-color: #cbd5e1; margin: 8px 0;"></div>
                
                <div class="pdf-bold" style="text-decoration: underline; margin-bottom: 4px;">Technical Bag Parameters:</div>
                <div class="pdf-row">
                    <span>Design Configuration:</span>
                    <span>${inq.bagType || 'U-Panel Bag'}</span>
                </div>
                <div class="pdf-row">
                    <span>Safe Working Load (SWL):</span>
                    <span>${inq.swl && inq.swl !== '-' ? inq.swl : '1000 kg'}</span>
                </div>
                <div class="pdf-row">
                    <span>Safety Factor (SF):</span>
                    <span>${inq.sf && inq.sf !== '-' ? inq.sf : '5:1'}</span>
                </div>
                <div class="pdf-row">
                    <span>Required Volume/Qty:</span>
                    <span>${inq.qty && inq.qty !== '-' ? inq.qty : '2,500 pcs'}</span>
                </div>
                
                <div class="pdf-row">
                    <span>Fabric Weight Specifications:</span>
                    <span>${inq.fabricWeight || '150 gsm (Default)'}</span>
                </div>
                <div class="pdf-row">
                    <span>Base Fabric Color:</span>
                    <span>${inq.fabricColor || 'White'}</span>
                </div>
                <div class="pdf-row">
                    <span>Lamination Coating:</span>
                    <span>${inq.lamination ? 'Yes, External Coat' : 'No'}</span>
                </div>
                <div class="pdf-row">
                    <span>UV Treated:</span>
                    <span>${inq.uvProtection ? 'Yes, 150 KLY' : 'No'}</span>
                </div>
                
                <div style="height: 1px; background-color: #cbd5e1; margin: 8px 0;"></div>
                <div class="pdf-bold" style="text-decoration: underline; margin-bottom: 4px;">Liner & Loops:</div>
                <div class="pdf-row">
                    <span>Inner Liner Included:</span>
                    <span>${inq.liner ? 'Yes' : 'No'}</span>
                </div>
                <div class="pdf-row">
                    <span>Liner Type:</span>
                    <span>${inq.linerType || 'None'}</span>
                </div>
                <div class="pdf-row">
                    <span>Liner Thickness:</span>
                    <span>${inq.linerThickness || '-'}</span>
                </div>
                
                <div class="pdf-row">
                    <span>Lifting Loop Design:</span>
                    <span>${inq.loopType || '4 Corner Loops'}</span>
                </div>
                <div class="pdf-row">
                    <span>Loop Dimensions (Height):</span>
                    <span>${inq.loopHeight || '30 cm'}</span>
                </div>
                <div class="pdf-row">
                    <span>Loop Color Trim:</span>
                    <span>${inq.loopColor || 'Blue'}</span>
                </div>
                <div class="pdf-row">
                    <span>Loop Tensile:</span>
                    <span>${inq.loopTensile || '1000 kg'}</span>
                </div>
                
                <div style="height: 1px; background-color: #cbd5e1; margin: 8px 0;"></div>
                <div class="pdf-bold" style="text-decoration: underline; margin-bottom: 4px;">Construction Details:</div>
                <div class="pdf-row">
                    <span>Top Construction:</span>
                    <span>${inq.topConstruction || 'Duffle Top'}</span>
                </div>
                <div class="pdf-row">
                    <span>Top Spout Size:</span>
                    <span>${inq.topSpoutSize || '-'}</span>
                </div>
                <div class="pdf-row">
                    <span>Bottom Construction:</span>
                    <span>${inq.bottomConstruction || 'Flat Bottom'}</span>
                </div>
                <div class="pdf-row">
                    <span>Bottom Spout Size:</span>
                    <span>${inq.bottomSpoutSize || '-'}</span>
                </div>
                
                <div style="height: 1px; background-color: #cbd5e1; margin: 8px 0;"></div>
                <div class="pdf-bold" style="text-decoration: underline; margin-bottom: 4px;">Accessories & Special Instructions:</div>
                <div class="pdf-row">
                    <span>Brand Printing:</span>
                    <span>${inq.printing ? 'Yes' : 'No'} (${inq.printingDetails || 'None'})</span>
                </div>
                <div class="pdf-row">
                    <span>Document Pouch:</span>
                    <span>${inq.docPouch ? 'Yes' : 'No'} (${inq.pouchPosition || 'None'})</span>
                </div>
                <div style="font-size: 10px; margin-top: 6px; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
                    Comments: ${inq.comments || 'No remarks recorded.'}
                </div>
            </div>
            
            <div style="position: absolute; bottom: 15px; left: 0; right: 0; text-align: center; font-size: 9px; color: #94a3b8;">
                Asia Bulk Sacks Pvt Ltd - Internal Specifications Review POC Document
            </div>
        `;
    }

    function renderDetailsFields(inq) {
        setFieldValue(fldCustomerName, inq.customerName);
        setFieldValue(fldInquiryRef, inq.id);
        setFieldValue(fldSwl, inq.swl);
        setFieldValue(fldSwlUnit, inq.swlUnit);
        setFieldValue(fldSf, inq.sf);
        setFieldValue(fldQty, inq.qty);
        setFieldValue(fldBagType, inq.bagType);
        setFieldValue(fldUnType, inq.unType);
        setFieldValue(fldBagLength, inq.bagLength);
        setFieldValue(fldBagWidth, inq.bagWidth);
        setFieldValue(fldBagHeight, inq.bagHeight);
        setFieldValue(fldDimensionType, inq.dimensionType);
        setFieldValue(fldDimensionUnit, inq.dimensionUnit);
        setFieldValue(fldTopDesign, inq.topDesign);
        setFieldValue(fldSkirtRope, inq.skirtRope);
        setFieldValue(fldSkirtHemming, inq.skirtHemming);
        setFieldValue(fldTopSpoutDiameter, inq.topSpoutDiameter);
        setFieldValue(fldTopSpoutHeight, inq.topSpoutHeight);
        setFieldValue(fldTopSpoutRope, inq.topSpoutRope);
        setFieldValue(fldTopSecondaryClosure, inq.topSecondaryClosure);
        setFieldValue(fldTopSecondaryClosureRope, inq.topSecondaryClosureRope);
        setFieldValue(fldBottomSpoutDiameter, inq.bottomSpoutDiameter);
        setFieldValue(fldBottomSpoutHeight, inq.bottomSpoutHeight);
        setFieldValue(fldBottomSpoutRope, inq.bottomSpoutRope);
        setFieldValue(fldBottomSpoutHemming, inq.bottomSpoutHemming);
        setFieldValue(fldBottomSecondaryClosure, inq.bottomSecondaryClosure);
        setFieldValue(fldBottomSecondaryClosureRope, inq.bottomSecondaryClosureRope);
        setFieldValue(fldHygieneLevel, inq.hygieneLevel);
        setFieldValue(fldFabricType, inq.fabricType);
        setFieldValue(fldBodyFabricGSM, inq.bodyFabricGSM);
        setFieldValue(fldBodyFabricCoatingGSM, inq.bodyFabricCoatingGSM);
        setFieldValue(fldDoubleLayer, inq.doubleLayer);
        setFieldValue(fldDoubleLayerGSM, inq.doubleLayerGSM);
        setFieldValue(fldConicalBottom, inq.conicalBottom);
        setFieldValue(fldBottomFlap, inq.bottomFlap);
        setFieldValue(fldBottomFlapLength, inq.bottomFlapLength);
        setFieldValue(fldBottomFlapWidth, inq.bottomFlapWidth);
        setFieldValue(fldConicalTop, inq.conicalTop);
        setFieldValue(fldTopFlap, inq.topFlap);
        setFieldValue(fldTopFlapLength, inq.topFlapLength);
        setFieldValue(fldTopFlapWidth, inq.topFlapWidth);
        setFieldValue(fldInternalBaffles, inq.internalBaffles);
        setFieldValue(fldBafflesGSM, inq.bafflesGSM);
        setFieldValue(fldBafflesCoatingType, inq.bafflesCoatingType);
        setFieldValue(fldBafflesPosition, inq.bafflesPosition);
        setFieldValue(fldLinerType, inq.linerType);
        setFieldValue(fldLinerDesign, inq.linerDesign);
        setFieldValue(fldLinerAttachment, inq.linerAttachment);
        setFieldValue(fldBaffleLiner, inq.baffleLiner);
        setFieldValue(fldLinerThickness, inq.linerThickness);
        setFieldValue(fldLoopType, inq.loopType);
        setFieldValue(fldLoopGrammage, inq.loopGrammage);
        setFieldValue(fldLoopAttachmentSL, inq.loopAttachmentSL);
        setFieldValue(fldLoopAttachmentLL, inq.loopAttachmentLL);
        setFieldValue(fldLoopDropdownLength, inq.loopDropdownLength);
        setFieldValue(fldLoopColour, inq.loopColour);
        setFieldValue(fldLoopCover, inq.loopCover);
        setFieldValue(fldLoopCoverColour, inq.loopCoverColour);
        setFieldValue(fldBandRequirement, inq.bandRequirement);
        setFieldValue(fldBandColour, inq.bandColour);
        setFieldValue(fldStitchingType, inq.stitchingType);
        setFieldValue(fldStitchingColour, inq.stitchingColour);
        setFieldValue(fldDustproof, inq.dustproof);
        setFieldValue(fldDustproofSingle, inq.dustproofSingle);
        setFieldValue(fldDustproofDouble, inq.dustproofDouble);
        setFieldValue(fldDustproofTriple, inq.dustproofTriple);
        setFieldValue(fldExtraAccessories, inq.extraAccessories);
        setFieldValue(fldPatchUnderLoop, inq.patchUnderLoop);
        setFieldValue(fldMultifilamentLoop, inq.multifilamentLoop);
        setFieldValue(fldExtraLoop, inq.extraLoop);
        setFieldValue(fldExtraLoopColour, inq.extraLoopColour);
        setFieldValue(fldFullLoop, inq.fullLoop);
        setFieldValue(fldFullLoopColour, inq.fullLoopColour);
        setFieldValue(fldPrintingRequired, inq.printingRequired);
        setFieldValue(fldPrintingSide, inq.printingSide);
        setFieldValue(fldPrintingColour, inq.printingColour);
        setFieldValue(fldCustomerInstructions, inq.customerInstructions);
        setFieldValue(fldDocumentPouch, inq.documentPouch);
    }

    function setFieldValue(inputElement, value) {
        inputElement.classList.remove('missing-field');
        if (value === undefined || value === null || value === '' || value === '-' || value === 'Extracting...') {
            inputElement.value = '';
            if (!inputElement.disabled) {
                inputElement.classList.add('missing-field');
            }
        } else {
            inputElement.value = value;
        }
    }

    function setToggleValue(toggleInput, value) {
        toggleInput.checked = !!value;
    }

    // Toggle border red highlights on value input changes
    const allFormInputs = document.querySelectorAll('.floating-input, .floating-select');
    allFormInputs.forEach(input => {
        const handler = () => {
            if (input.value.trim() !== '') {
                input.classList.remove('missing-field');
            } else {
                input.classList.add('missing-field');
            }
            updateAccordionTags();
        };
        input.addEventListener('input', handler);
        input.addEventListener('change', handler);
    });

    // Save Changes
    btnDetailsSave.addEventListener('click', () => {
        const dbList = getInquiriesFromDB();
        const idx = dbList.findIndex(item => item.id === inquiryId);
        
        if (idx !== -1) {
            // Update db specifications
            dbList[idx].customerName = fldCustomerName.value.trim() || '-';
            dbList[idx].id = fldInquiryRef.value.trim() || '-';
            dbList[idx].swl = fldSwl.value.trim() || '-';
            dbList[idx].swlUnit = fldSwlUnit.value.trim() || '-';
            dbList[idx].sf = fldSf.value.trim() || '-';
            dbList[idx].qty = fldQty.value.trim() || '-';
            dbList[idx].bagType = fldBagType.value.trim() || '-';
            dbList[idx].unType = fldUnType.value.trim() || '-';
            dbList[idx].bagLength = fldBagLength.value.trim() || '-';
            dbList[idx].bagWidth = fldBagWidth.value.trim() || '-';
            dbList[idx].bagHeight = fldBagHeight.value.trim() || '-';
            dbList[idx].dimensionType = fldDimensionType.value.trim() || '-';
            dbList[idx].dimensionUnit = fldDimensionUnit.value.trim() || '-';
            dbList[idx].topDesign = fldTopDesign.value.trim() || '-';
            dbList[idx].skirtRope = fldSkirtRope.value.trim() || '-';
            dbList[idx].skirtHemming = fldSkirtHemming.value.trim() || '-';
            dbList[idx].topSpoutDiameter = fldTopSpoutDiameter.value.trim() || '-';
            dbList[idx].topSpoutHeight = fldTopSpoutHeight.value.trim() || '-';
            dbList[idx].topSpoutRope = fldTopSpoutRope.value.trim() || '-';
            dbList[idx].topSecondaryClosure = fldTopSecondaryClosure.value.trim() || '-';
            dbList[idx].topSecondaryClosureRope = fldTopSecondaryClosureRope.value.trim() || '-';
            dbList[idx].bottomSpoutDiameter = fldBottomSpoutDiameter.value.trim() || '-';
            dbList[idx].bottomSpoutHeight = fldBottomSpoutHeight.value.trim() || '-';
            dbList[idx].bottomSpoutRope = fldBottomSpoutRope.value.trim() || '-';
            dbList[idx].bottomSpoutHemming = fldBottomSpoutHemming.value.trim() || '-';
            dbList[idx].bottomSecondaryClosure = fldBottomSecondaryClosure.value.trim() || '-';
            dbList[idx].bottomSecondaryClosureRope = fldBottomSecondaryClosureRope.value.trim() || '-';
            dbList[idx].hygieneLevel = fldHygieneLevel.value.trim() || '-';
            dbList[idx].fabricType = fldFabricType.value.trim() || '-';
            dbList[idx].bodyFabricGSM = fldBodyFabricGSM.value.trim() || '-';
            dbList[idx].bodyFabricCoatingGSM = fldBodyFabricCoatingGSM.value.trim() || '-';
            dbList[idx].doubleLayer = fldDoubleLayer.value.trim() || '-';
            dbList[idx].doubleLayerGSM = fldDoubleLayerGSM.value.trim() || '-';
            dbList[idx].conicalBottom = fldConicalBottom.value.trim() || '-';
            dbList[idx].bottomFlap = fldBottomFlap.value.trim() || '-';
            dbList[idx].bottomFlapLength = fldBottomFlapLength.value.trim() || '-';
            dbList[idx].bottomFlapWidth = fldBottomFlapWidth.value.trim() || '-';
            dbList[idx].conicalTop = fldConicalTop.value.trim() || '-';
            dbList[idx].topFlap = fldTopFlap.value.trim() || '-';
            dbList[idx].topFlapLength = fldTopFlapLength.value.trim() || '-';
            dbList[idx].topFlapWidth = fldTopFlapWidth.value.trim() || '-';
            dbList[idx].internalBaffles = fldInternalBaffles.value.trim() || '-';
            dbList[idx].bafflesGSM = fldBafflesGSM.value.trim() || '-';
            dbList[idx].bafflesCoatingType = fldBafflesCoatingType.value.trim() || '-';
            dbList[idx].bafflesPosition = fldBafflesPosition.value.trim() || '-';
            dbList[idx].linerType = fldLinerType.value.trim() || '-';
            dbList[idx].linerDesign = fldLinerDesign.value.trim() || '-';
            dbList[idx].linerAttachment = fldLinerAttachment.value.trim() || '-';
            dbList[idx].baffleLiner = fldBaffleLiner.value.trim() || '-';
            dbList[idx].linerThickness = fldLinerThickness.value.trim() || '-';
            dbList[idx].loopType = fldLoopType.value.trim() || '-';
            dbList[idx].loopGrammage = fldLoopGrammage.value.trim() || '-';
            dbList[idx].loopAttachmentSL = fldLoopAttachmentSL.value.trim() || '-';
            dbList[idx].loopAttachmentLL = fldLoopAttachmentLL.value.trim() || '-';
            dbList[idx].loopDropdownLength = fldLoopDropdownLength.value.trim() || '-';
            dbList[idx].loopColour = fldLoopColour.value.trim() || '-';
            dbList[idx].loopCover = fldLoopCover.value.trim() || '-';
            dbList[idx].loopCoverColour = fldLoopCoverColour.value.trim() || '-';
            dbList[idx].bandRequirement = fldBandRequirement.value.trim() || '-';
            dbList[idx].bandColour = fldBandColour.value.trim() || '-';
            dbList[idx].stitchingType = fldStitchingType.value.trim() || '-';
            dbList[idx].stitchingColour = fldStitchingColour.value.trim() || '-';
            dbList[idx].dustproof = fldDustproof.value.trim() || '-';
            dbList[idx].dustproofSingle = fldDustproofSingle.value.trim() || '-';
            dbList[idx].dustproofDouble = fldDustproofDouble.value.trim() || '-';
            dbList[idx].dustproofTriple = fldDustproofTriple.value.trim() || '-';
            dbList[idx].extraAccessories = fldExtraAccessories.value.trim() || '-';
            dbList[idx].patchUnderLoop = fldPatchUnderLoop.value.trim() || '-';
            dbList[idx].multifilamentLoop = fldMultifilamentLoop.value.trim() || '-';
            dbList[idx].extraLoop = fldExtraLoop.value.trim() || '-';
            dbList[idx].extraLoopColour = fldExtraLoopColour.value.trim() || '-';
            dbList[idx].fullLoop = fldFullLoop.value.trim() || '-';
            dbList[idx].fullLoopColour = fldFullLoopColour.value.trim() || '-';
            dbList[idx].printingRequired = fldPrintingRequired.value.trim() || '-';
            dbList[idx].printingSide = fldPrintingSide.value.trim() || '-';
            dbList[idx].printingColour = fldPrintingColour.value.trim() || '-';
            dbList[idx].customerInstructions = fldCustomerInstructions.value.trim() || '-';
            dbList[idx].documentPouch = fldDocumentPouch.value.trim() || '-';

            // Update extraction & validation indicators
            let hasMissing = false;
            allFormInputs.forEach(input => {
                if (!input.disabled && input.classList.contains('missing-field')) {
                    hasMissing = true;
                }
            });
            dbList[idx].validation = hasMissing ? 'Review' : 'Valid';
            dbList[idx].extraction = 'Complete';

            saveInquiriesToDB(dbList);
            showToast('Inquiry details saved successfully.', 'success');
            updateDynamicUI(dbList[idx]);
        }
    });

    // Save and export CSV download
    if (btnHeaderExport) {
        btnHeaderExport.addEventListener('click', () => {
            const dbList = getInquiriesFromDB();
            const idx = dbList.findIndex(item => item.id === inquiryId);
        
        if (idx !== -1) {
            const date = new Date();
            const formattedDate = date.getFullYear() + '-' + 
                                  String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                                  String(date.getDate()).padStart(2, '0') + ' ' + 
                                  String(date.getHours()).padStart(2, '0') + ':' + 
                                  String(date.getMinutes()).padStart(2, '0');
            
            dbList[idx].exportedOn = formattedDate;
            dbList[idx].status = 'Exported';
            
            saveInquiriesToDB(dbList);

            // Generate CSV spec contents
            const headers = ['Field Category', 'Specification Label', 'Value'];
            const rows = [
                ['1. Core Inquiry Information', 'Uploaded On', dbList[idx].uploadedOn],
                ['1. Core Inquiry Information', 'Exported On', dbList[idx].exportedOn],
                ['1. Core Inquiry Information', 'Customer Name', fldCustomerName.value],
                ['1. Core Inquiry Information', 'Inquiry Ref No.', fldInquiryRef.value],
                ['1. Core Inquiry Information', 'Safe Working Load (SWL)', fldSwl.value],
                ['1. Core Inquiry Information', 'SWL Unit', fldSwlUnit.value],
                ['1. Core Inquiry Information', 'Safety Factor', fldSf.value],
                ['1. Core Inquiry Information', 'Quantity', fldQty.value],
                ['1. Core Inquiry Information', 'Bag Type', fldBagType.value],
                ['2. Bag Design', 'UN Type', fldUnType.value],
                ['2. Bag Design', 'Bag Length', fldBagLength.value],
                ['2. Bag Design', 'Bag Width', fldBagWidth.value],
                ['2. Bag Design', 'Bag Height', fldBagHeight.value],
                ['2. Bag Design', 'Dimension Type', fldDimensionType.value],
                ['2. Bag Design', 'Dimension Unit', fldDimensionUnit.value],
                ['2. Bag Design', 'Top Design', fldTopDesign.value],
                ['2. Bag Design', 'Skirt Rope', fldSkirtRope.value],
                ['2. Bag Design', 'Skirt Hemming', fldSkirtHemming.value],
                ['2. Bag Design', 'Top Spout Diameter', fldTopSpoutDiameter.value],
                ['2. Bag Design', 'Top Spout Height', fldTopSpoutHeight.value],
                ['2. Bag Design', 'Top Spout Rope', fldTopSpoutRope.value],
                ['2. Bag Design', 'Top Secondary Closure', fldTopSecondaryClosure.value],
                ['2. Bag Design', 'Top Sec. Closure Rope', fldTopSecondaryClosureRope.value],
                ['2. Bag Design', 'Bottom Spout Diameter', fldBottomSpoutDiameter.value],
                ['2. Bag Design', 'Bottom Spout Height', fldBottomSpoutHeight.value],
                ['2. Bag Design', 'Bottom Spout Rope', fldBottomSpoutRope.value],
                ['2. Bag Design', 'Bottom Spout Hemming', fldBottomSpoutHemming.value],
                ['2. Bag Design', 'Bottom Secondary Closure', fldBottomSecondaryClosure.value],
                ['2. Bag Design', 'Bottom Sec. Closure Rope', fldBottomSecondaryClosureRope.value],
                ['2. Bag Design', 'Hygiene Level', fldHygieneLevel.value],
                ['3. Fabric', 'Fabric Type', fldFabricType.value],
                ['3. Fabric', 'Body Fabric GSM', fldBodyFabricGSM.value],
                ['3. Fabric', 'Body Fabric Coating GSM', fldBodyFabricCoatingGSM.value],
                ['3. Fabric', 'Double Layer', fldDoubleLayer.value],
                ['3. Fabric', 'Double Layer GSM', fldDoubleLayerGSM.value],
                ['3. Fabric', 'Conical Bottom', fldConicalBottom.value],
                ['3. Fabric', 'Bottom Flap', fldBottomFlap.value],
                ['3. Fabric', 'Bottom Flap Length', fldBottomFlapLength.value],
                ['3. Fabric', 'Bottom Flap Width', fldBottomFlapWidth.value],
                ['3. Fabric', 'Conical Top', fldConicalTop.value],
                ['3. Fabric', 'Top Flap', fldTopFlap.value],
                ['3. Fabric', 'Top Flap Length', fldTopFlapLength.value],
                ['3. Fabric', 'Top Flap Width', fldTopFlapWidth.value],
                ['3. Fabric', 'Internal Baffles', fldInternalBaffles.value],
                ['3. Fabric', 'Baffles GSM', fldBafflesGSM.value],
                ['3. Fabric', 'Baffles Coating Type', fldBafflesCoatingType.value],
                ['3. Fabric', 'Baffles Position', fldBafflesPosition.value],
                ['4. Material / Liner', 'Liner Type', fldLinerType.value],
                ['4. Material / Liner', 'Liner Design', fldLinerDesign.value],
                ['4. Material / Liner', 'Liner Attachment', fldLinerAttachment.value],
                ['4. Material / Liner', 'Baffle Liner', fldBaffleLiner.value],
                ['4. Material / Liner', 'Liner Thickness (Micron)', fldLinerThickness.value],
                ['5. Loop Configuration', 'Loop Type', fldLoopType.value],
                ['5. Loop Configuration', 'Loop Grammage', fldLoopGrammage.value],
                ['5. Loop Configuration', 'Loop Attachment (SL)', fldLoopAttachmentSL.value],
                ['5. Loop Configuration', 'Loop Attachment (LL)', fldLoopAttachmentLL.value],
                ['5. Loop Configuration', 'Loop Dropdown Length', fldLoopDropdownLength.value],
                ['5. Loop Configuration', 'Loop Colour', fldLoopColour.value],
                ['5. Loop Configuration', 'Loop Cover', fldLoopCover.value],
                ['5. Loop Configuration', 'Loop Cover Colour', fldLoopCoverColour.value],
                ['6. Band Details', 'Band Requirement', fldBandRequirement.value],
                ['6. Band Details', 'Band Colour', fldBandColour.value],
                ['7. Bag Construction', 'Stitching Type', fldStitchingType.value],
                ['7. Bag Construction', 'Stitching Colour', fldStitchingColour.value],
                ['8. Accessories', 'Dustproof', fldDustproof.value],
                ['8. Accessories', 'Dustproof Single', fldDustproofSingle.value],
                ['8. Accessories', 'Dustproof Double', fldDustproofDouble.value],
                ['8. Accessories', 'Dustproof Triple', fldDustproofTriple.value],
                ['8. Accessories', 'Extra Accessories', fldExtraAccessories.value],
                ['8. Accessories', 'Patch Under Loop', fldPatchUnderLoop.value],
                ['8. Accessories', 'Multifilament Loop', fldMultifilamentLoop.value],
                ['8. Accessories', 'Extra Loop', fldExtraLoop.value],
                ['8. Accessories', 'Extra Loop Colour', fldExtraLoopColour.value],
                ['8. Accessories', 'Full Loop', fldFullLoop.value],
                ['8. Accessories', 'Full Loop Colour', fldFullLoopColour.value],
                ['8. Accessories', 'Printing Required', fldPrintingRequired.value],
                ['8. Accessories', 'Printing Side', fldPrintingSide.value],
                ['8. Accessories', 'Printing Colour', fldPrintingColour.value],
                ['8. Accessories', 'Customer Instructions / Comments', fldCustomerInstructions.value],
                ['8. Accessories', 'Document Pouch', fldDocumentPouch.value]
            ];

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += headers.map(h => `"${h}"`).join(",") + "\r\n";
            rows.forEach(r => {
                csvContent += r.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(",") + "\r\n";
            });

            // Anchor download trigger
            const encodedUri = encodeURI(csvContent);
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", encodedUri);
            downloadAnchor.setAttribute("download", `${dbList[idx].id}_Extracted_Spec_Sheet.csv`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);

            showToast(`CSV data exported successfully for ${dbList[idx].id}.`, 'success');
            updateDynamicUI(dbList[idx]);
        }
        });
    }

    // --- ACCORDION MUTUAL EXCLUSIVITY & SMOOTH ANIMATION ---
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        const summary = acc.querySelector('.accordion-summary');
        const content = acc.querySelector('.accordion-content');
        
        if (content) {
            content.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out';
            content.style.overflow = 'hidden';
            
            // Initial style setup based on open state
            if (!acc.hasAttribute('open')) {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            } else {
                content.style.maxHeight = '2000px';
                content.style.opacity = '1';
            }
            
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                const isOpen = acc.hasAttribute('open');
                
                if (isOpen) {
                    // Close this accordion smoothly
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                    setTimeout(() => acc.removeAttribute('open'), 300);
                } else {
                    // Close all other open accordions
                    accordions.forEach(other => {
                        if (other !== acc && other.hasAttribute('open')) {
                            const otherContent = other.querySelector('.accordion-content');
                            if (otherContent) {
                                otherContent.style.maxHeight = '0px';
                                otherContent.style.opacity = '0';
                                otherContent.style.paddingTop = '0';
                                otherContent.style.paddingBottom = '0';
                            }
                            setTimeout(() => other.removeAttribute('open'), 300);
                        }
                    });
                    
                    // Open this accordion smoothly
                    acc.setAttribute('open', '');
                    content.offsetHeight; // Force reflow to register 0px state before animating
                    requestAnimationFrame(() => {
                        content.style.maxHeight = '2000px';
                        content.style.opacity = '1';
                        content.style.paddingTop = '16px';
                        content.style.paddingBottom = '16px';
                    });
                }
            });
        }
    });
});
