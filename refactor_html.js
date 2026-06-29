const fs = require('fs');
const path = require('path');

const sections = [
    {
        title: '1. Core Inquiry Information',
        fields: [
            { id: 'fldCustomerName', label: 'Customer Name' },
            { id: 'fldInquiryRef', label: 'Inquiry Ref No.', disabled: true },
            { id: 'fldSwl', label: 'Safe Working Load (SWL)' },
            { id: 'fldSwlUnit', label: 'SWL Unit' },
            { id: 'fldSf', label: 'Safety Factor' },
            { id: 'fldQty', label: 'Quantity' },
            { id: 'fldBagType', label: 'Bag Type', disabled: true }
        ]
    },
    {
        title: '2. Bag Design',
        fields: [
            { id: 'fldUnType', label: 'UN Type' },
            { id: 'fldBagLength', label: 'Bag Length' },
            { id: 'fldBagWidth', label: 'Bag Width' },
            { id: 'fldBagHeight', label: 'Bag Height' },
            { id: 'fldDimensionType', label: 'Dimension Type' },
            { id: 'fldDimensionUnit', label: 'Dimension Unit' },
            { id: 'fldTopDesign', label: 'Top Design' },
            { id: 'fldSkirtRope', label: 'Skirt Rope' },
            { id: 'fldSkirtHemming', label: 'Skirt Hemming' },
            { id: 'fldTopSpoutDiameter', label: 'Top Spout Diameter' },
            { id: 'fldTopSpoutHeight', label: 'Top Spout Height' },
            { id: 'fldTopSpoutRope', label: 'Top Spout Rope' },
            { id: 'fldTopSecondaryClosure', label: 'Top Secondary Closure' },
            { id: 'fldTopSecondaryClosureRope', label: 'Top Sec. Closure Rope' },
            { id: 'fldBottomSpoutDiameter', label: 'Bottom Spout Diameter' },
            { id: 'fldBottomSpoutHeight', label: 'Bottom Spout Height' },
            { id: 'fldBottomSpoutRope', label: 'Bottom Spout Rope' },
            { id: 'fldBottomSpoutHemming', label: 'Bottom Spout Hemming' },
            { id: 'fldBottomSecondaryClosure', label: 'Bottom Secondary Closure' },
            { id: 'fldBottomSecondaryClosureRope', label: 'Bottom Sec. Closure Rope' },
            { id: 'fldHygieneLevel', label: 'Hygiene Level' }
        ]
    },
    {
        title: '3. Fabric',
        fields: [
            { id: 'fldFabricType', label: 'Fabric Type' },
            { id: 'fldBodyFabricGSM', label: 'Body Fabric GSM' },
            { id: 'fldBodyFabricCoatingGSM', label: 'Body Fabric Coating GSM' },
            { id: 'fldDoubleLayer', label: 'Double Layer' },
            { id: 'fldDoubleLayerGSM', label: 'Double Layer GSM' },
            { id: 'fldConicalBottom', label: 'Conical Bottom' },
            { id: 'fldBottomFlap', label: 'Bottom Flap' },
            { id: 'fldBottomFlapLength', label: 'Bottom Flap Length' },
            { id: 'fldBottomFlapWidth', label: 'Bottom Flap Width' },
            { id: 'fldConicalTop', label: 'Conical Top' },
            { id: 'fldTopFlap', label: 'Top Flap' },
            { id: 'fldTopFlapLength', label: 'Top Flap Length' },
            { id: 'fldTopFlapWidth', label: 'Top Flap Width' },
            { id: 'fldInternalBaffles', label: 'Internal Baffles' },
            { id: 'fldBafflesGSM', label: 'Baffles GSM' },
            { id: 'fldBafflesCoatingType', label: 'Baffles Coating Type' },
            { id: 'fldBafflesPosition', label: 'Baffles Position' }
        ]
    },
    {
        title: '4. Material / Liner',
        fields: [
            { id: 'fldLinerType', label: 'Liner Type' },
            { id: 'fldLinerDesign', label: 'Liner Design' },
            { id: 'fldLinerAttachment', label: 'Liner Attachment' },
            { id: 'fldBaffleLiner', label: 'Baffle Liner' },
            { id: 'fldLinerThickness', label: 'Liner Thickness (Micron)' }
        ]
    },
    {
        title: '5. Loop Configuration',
        fields: [
            { id: 'fldLoopType', label: 'Loop Type' },
            { id: 'fldLoopGrammage', label: 'Loop Grammage' },
            { id: 'fldLoopAttachmentSL', label: 'Loop Attachment (SL)' },
            { id: 'fldLoopAttachmentLL', label: 'Loop Attachment (LL)' },
            { id: 'fldLoopDropdownLength', label: 'Loop Dropdown Length' },
            { id: 'fldLoopColour', label: 'Loop Colour' },
            { id: 'fldLoopCover', label: 'Loop Cover' },
            { id: 'fldLoopCoverColour', label: 'Loop Cover Colour' }
        ]
    },
    {
        title: '6. Band Details',
        fields: [
            { id: 'fldBandRequirement', label: 'Band Requirement' },
            { id: 'fldBandColour', label: 'Band Colour' }
        ]
    },
    {
        title: '7. Bag Construction',
        fields: [
            { id: 'fldStitchingType', label: 'Stitching Type' },
            { id: 'fldStitchingColour', label: 'Stitching Colour' }
        ]
    },
    {
        title: '8. Accessories',
        fields: [
            { id: 'fldDustproof', label: 'Dustproof' },
            { id: 'fldDustproofSingle', label: 'Dustproof Single' },
            { id: 'fldDustproofDouble', label: 'Dustproof Double' },
            { id: 'fldDustproofTriple', label: 'Dustproof Triple' },
            { id: 'fldExtraAccessories', label: 'Extra Accessories' },
            { id: 'fldPatchUnderLoop', label: 'Patch Under Loop' },
            { id: 'fldMultifilamentLoop', label: 'Multifilament Loop' },
            { id: 'fldExtraLoop', label: 'Extra Loop' },
            { id: 'fldExtraLoopColour', label: 'Extra Loop Colour' },
            { id: 'fldFullLoop', label: 'Full Loop' },
            { id: 'fldFullLoopColour', label: 'Full Loop Colour' },
            { id: 'fldPrintingRequired', label: 'Printing Required' },
            { id: 'fldPrintingSide', label: 'Printing Side' },
            { id: 'fldPrintingColour', label: 'Printing Colour' },
            { id: 'fldCustomerInstructions', label: 'Customer Instructions / Comments', type: 'textarea' },
            { id: 'fldDocumentPouch', label: 'Document Pouch' }
        ]
    }
];

let htmlOut = '';

sections.forEach((sec, idx) => {
    htmlOut += `                        <!-- Accordion ${idx + 1}: ${sec.title.substring(3)} -->\n`;
    htmlOut += `                        <details class="accordion-item">\n`;
    htmlOut += `                            <summary class="accordion-summary">${sec.title} (${sec.fields.length})</summary>\n`;
    htmlOut += `                            <div class="accordion-content">\n`;
    
    sec.fields.forEach(f => {
        let disabledAttr = f.disabled ? ' disabled' : '';
        let fullRow = f.type === 'textarea' ? ' style="grid-column: 1 / -1; height: auto;"' : '';
        
        htmlOut += `                                <div class="floating-group"${fullRow}>\n`;
        if (f.type === 'textarea') {
            htmlOut += `                                    <textarea id="${f.id}" class="floating-input" placeholder=" " style="height: 60px; padding-top: 20px; resize: none;"${disabledAttr}></textarea>\n`;
            htmlOut += `                                    <label class="floating-label" style="top: 14px; transform: none;">${f.label}</label>\n`;
        } else {
            htmlOut += `                                    <input type="text" id="${f.id}" class="floating-input" placeholder=" "${disabledAttr}>\n`;
            htmlOut += `                                    <label class="floating-label">${f.label}</label>\n`;
        }
        htmlOut += `                                </div>\n`;
    });
    
    htmlOut += `                            </div>\n`;
    htmlOut += `                        </details>\n\n`;
});

// Write to details.html
const detailsPath = path.join(__dirname, 'details.html');
let detailsHtml = fs.readFileSync(detailsPath, 'utf8');

const startTag = '<!-- Accordion 1: Core Inquiry Information -->';
const endTag = '<!-- Footer Actions -->';

const startIndex = detailsHtml.indexOf(startTag);
const endIndex = detailsHtml.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
    const newHtml = detailsHtml.substring(0, startIndex) + htmlOut + '                    ' + detailsHtml.substring(endIndex);
    fs.writeFileSync(detailsPath, newHtml, 'utf8');
    console.log('Successfully updated details.html');
} else {
    console.log('Could not find injection markers in details.html');
}
