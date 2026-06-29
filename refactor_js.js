const fs = require('fs');

const fields = [
    { id: 'fldCustomerName', dbKey: 'customerName', title: '1. Core Inquiry Information', label: 'Customer Name' },
    { id: 'fldInquiryRef', dbKey: 'id', title: '1. Core Inquiry Information', label: 'Inquiry Ref No.' },
    { id: 'fldSwl', dbKey: 'swl', title: '1. Core Inquiry Information', label: 'Safe Working Load (SWL)' },
    { id: 'fldSwlUnit', dbKey: 'swlUnit', title: '1. Core Inquiry Information', label: 'SWL Unit' },
    { id: 'fldSf', dbKey: 'sf', title: '1. Core Inquiry Information', label: 'Safety Factor' },
    { id: 'fldQty', dbKey: 'qty', title: '1. Core Inquiry Information', label: 'Quantity' },
    { id: 'fldBagType', dbKey: 'bagType', title: '1. Core Inquiry Information', label: 'Bag Type' },

    { id: 'fldUnType', dbKey: 'unType', title: '2. Bag Design', label: 'UN Type' },
    { id: 'fldBagLength', dbKey: 'bagLength', title: '2. Bag Design', label: 'Bag Length' },
    { id: 'fldBagWidth', dbKey: 'bagWidth', title: '2. Bag Design', label: 'Bag Width' },
    { id: 'fldBagHeight', dbKey: 'bagHeight', title: '2. Bag Design', label: 'Bag Height' },
    { id: 'fldDimensionType', dbKey: 'dimensionType', title: '2. Bag Design', label: 'Dimension Type' },
    { id: 'fldDimensionUnit', dbKey: 'dimensionUnit', title: '2. Bag Design', label: 'Dimension Unit' },
    { id: 'fldTopDesign', dbKey: 'topDesign', title: '2. Bag Design', label: 'Top Design' },
    { id: 'fldSkirtRope', dbKey: 'skirtRope', title: '2. Bag Design', label: 'Skirt Rope' },
    { id: 'fldSkirtHemming', dbKey: 'skirtHemming', title: '2. Bag Design', label: 'Skirt Hemming' },
    { id: 'fldTopSpoutDiameter', dbKey: 'topSpoutDiameter', title: '2. Bag Design', label: 'Top Spout Diameter' },
    { id: 'fldTopSpoutHeight', dbKey: 'topSpoutHeight', title: '2. Bag Design', label: 'Top Spout Height' },
    { id: 'fldTopSpoutRope', dbKey: 'topSpoutRope', title: '2. Bag Design', label: 'Top Spout Rope' },
    { id: 'fldTopSecondaryClosure', dbKey: 'topSecondaryClosure', title: '2. Bag Design', label: 'Top Secondary Closure' },
    { id: 'fldTopSecondaryClosureRope', dbKey: 'topSecondaryClosureRope', title: '2. Bag Design', label: 'Top Sec. Closure Rope' },
    { id: 'fldBottomSpoutDiameter', dbKey: 'bottomSpoutDiameter', title: '2. Bag Design', label: 'Bottom Spout Diameter' },
    { id: 'fldBottomSpoutHeight', dbKey: 'bottomSpoutHeight', title: '2. Bag Design', label: 'Bottom Spout Height' },
    { id: 'fldBottomSpoutRope', dbKey: 'bottomSpoutRope', title: '2. Bag Design', label: 'Bottom Spout Rope' },
    { id: 'fldBottomSpoutHemming', dbKey: 'bottomSpoutHemming', title: '2. Bag Design', label: 'Bottom Spout Hemming' },
    { id: 'fldBottomSecondaryClosure', dbKey: 'bottomSecondaryClosure', title: '2. Bag Design', label: 'Bottom Secondary Closure' },
    { id: 'fldBottomSecondaryClosureRope', dbKey: 'bottomSecondaryClosureRope', title: '2. Bag Design', label: 'Bottom Sec. Closure Rope' },
    { id: 'fldHygieneLevel', dbKey: 'hygieneLevel', title: '2. Bag Design', label: 'Hygiene Level' },

    { id: 'fldFabricType', dbKey: 'fabricType', title: '3. Fabric', label: 'Fabric Type' },
    { id: 'fldBodyFabricGSM', dbKey: 'bodyFabricGSM', title: '3. Fabric', label: 'Body Fabric GSM' },
    { id: 'fldBodyFabricCoatingGSM', dbKey: 'bodyFabricCoatingGSM', title: '3. Fabric', label: 'Body Fabric Coating GSM' },
    { id: 'fldDoubleLayer', dbKey: 'doubleLayer', title: '3. Fabric', label: 'Double Layer' },
    { id: 'fldDoubleLayerGSM', dbKey: 'doubleLayerGSM', title: '3. Fabric', label: 'Double Layer GSM' },
    { id: 'fldConicalBottom', dbKey: 'conicalBottom', title: '3. Fabric', label: 'Conical Bottom' },
    { id: 'fldBottomFlap', dbKey: 'bottomFlap', title: '3. Fabric', label: 'Bottom Flap' },
    { id: 'fldBottomFlapLength', dbKey: 'bottomFlapLength', title: '3. Fabric', label: 'Bottom Flap Length' },
    { id: 'fldBottomFlapWidth', dbKey: 'bottomFlapWidth', title: '3. Fabric', label: 'Bottom Flap Width' },
    { id: 'fldConicalTop', dbKey: 'conicalTop', title: '3. Fabric', label: 'Conical Top' },
    { id: 'fldTopFlap', dbKey: 'topFlap', title: '3. Fabric', label: 'Top Flap' },
    { id: 'fldTopFlapLength', dbKey: 'topFlapLength', title: '3. Fabric', label: 'Top Flap Length' },
    { id: 'fldTopFlapWidth', dbKey: 'topFlapWidth', title: '3. Fabric', label: 'Top Flap Width' },
    { id: 'fldInternalBaffles', dbKey: 'internalBaffles', title: '3. Fabric', label: 'Internal Baffles' },
    { id: 'fldBafflesGSM', dbKey: 'bafflesGSM', title: '3. Fabric', label: 'Baffles GSM' },
    { id: 'fldBafflesCoatingType', dbKey: 'bafflesCoatingType', title: '3. Fabric', label: 'Baffles Coating Type' },
    { id: 'fldBafflesPosition', dbKey: 'bafflesPosition', title: '3. Fabric', label: 'Baffles Position' },

    { id: 'fldLinerType', dbKey: 'linerType', title: '4. Material / Liner', label: 'Liner Type' },
    { id: 'fldLinerDesign', dbKey: 'linerDesign', title: '4. Material / Liner', label: 'Liner Design' },
    { id: 'fldLinerAttachment', dbKey: 'linerAttachment', title: '4. Material / Liner', label: 'Liner Attachment' },
    { id: 'fldBaffleLiner', dbKey: 'baffleLiner', title: '4. Material / Liner', label: 'Baffle Liner' },
    { id: 'fldLinerThickness', dbKey: 'linerThickness', title: '4. Material / Liner', label: 'Liner Thickness (Micron)' },

    { id: 'fldLoopType', dbKey: 'loopType', title: '5. Loop Configuration', label: 'Loop Type' },
    { id: 'fldLoopGrammage', dbKey: 'loopGrammage', title: '5. Loop Configuration', label: 'Loop Grammage' },
    { id: 'fldLoopAttachmentSL', dbKey: 'loopAttachmentSL', title: '5. Loop Configuration', label: 'Loop Attachment (SL)' },
    { id: 'fldLoopAttachmentLL', dbKey: 'loopAttachmentLL', title: '5. Loop Configuration', label: 'Loop Attachment (LL)' },
    { id: 'fldLoopDropdownLength', dbKey: 'loopDropdownLength', title: '5. Loop Configuration', label: 'Loop Dropdown Length' },
    { id: 'fldLoopColour', dbKey: 'loopColour', title: '5. Loop Configuration', label: 'Loop Colour' },
    { id: 'fldLoopCover', dbKey: 'loopCover', title: '5. Loop Configuration', label: 'Loop Cover' },
    { id: 'fldLoopCoverColour', dbKey: 'loopCoverColour', title: '5. Loop Configuration', label: 'Loop Cover Colour' },

    { id: 'fldBandRequirement', dbKey: 'bandRequirement', title: '6. Band Details', label: 'Band Requirement' },
    { id: 'fldBandColour', dbKey: 'bandColour', title: '6. Band Details', label: 'Band Colour' },

    { id: 'fldStitchingType', dbKey: 'stitchingType', title: '7. Bag Construction', label: 'Stitching Type' },
    { id: 'fldStitchingColour', dbKey: 'stitchingColour', title: '7. Bag Construction', label: 'Stitching Colour' },

    { id: 'fldDustproof', dbKey: 'dustproof', title: '8. Accessories', label: 'Dustproof' },
    { id: 'fldDustproofSingle', dbKey: 'dustproofSingle', title: '8. Accessories', label: 'Dustproof Single' },
    { id: 'fldDustproofDouble', dbKey: 'dustproofDouble', title: '8. Accessories', label: 'Dustproof Double' },
    { id: 'fldDustproofTriple', dbKey: 'dustproofTriple', title: '8. Accessories', label: 'Dustproof Triple' },
    { id: 'fldExtraAccessories', dbKey: 'extraAccessories', title: '8. Accessories', label: 'Extra Accessories' },
    { id: 'fldPatchUnderLoop', dbKey: 'patchUnderLoop', title: '8. Accessories', label: 'Patch Under Loop' },
    { id: 'fldMultifilamentLoop', dbKey: 'multifilamentLoop', title: '8. Accessories', label: 'Multifilament Loop' },
    { id: 'fldExtraLoop', dbKey: 'extraLoop', title: '8. Accessories', label: 'Extra Loop' },
    { id: 'fldExtraLoopColour', dbKey: 'extraLoopColour', title: '8. Accessories', label: 'Extra Loop Colour' },
    { id: 'fldFullLoop', dbKey: 'fullLoop', title: '8. Accessories', label: 'Full Loop' },
    { id: 'fldFullLoopColour', dbKey: 'fullLoopColour', title: '8. Accessories', label: 'Full Loop Colour' },
    { id: 'fldPrintingRequired', dbKey: 'printingRequired', title: '8. Accessories', label: 'Printing Required' },
    { id: 'fldPrintingSide', dbKey: 'printingSide', title: '8. Accessories', label: 'Printing Side' },
    { id: 'fldPrintingColour', dbKey: 'printingColour', title: '8. Accessories', label: 'Printing Colour' },
    { id: 'fldCustomerInstructions', dbKey: 'customerInstructions', title: '8. Accessories', label: 'Customer Instructions / Comments' },
    { id: 'fldDocumentPouch', dbKey: 'documentPouch', title: '8. Accessories', label: 'Document Pouch' }
];

let jsStr = fs.readFileSync('details-page.js', 'utf8');

// 1. Variable Declarations
let varStr = "";
fields.forEach(f => {
    varStr += `    const ${f.id} = document.getElementById('${f.id}');\n`;
});
const startVar = "// Category 1: Core";
const endVar = "// Buttons";
jsStr = jsStr.substring(0, jsStr.indexOf(startVar)) + varStr + "    " + jsStr.substring(jsStr.indexOf(endVar));

// 2. renderDetailsFields
let renderStr = "";
fields.forEach(f => {
    renderStr += `        setFieldValue(${f.id}, inq.${f.dbKey});\n`;
});
const startRender = "function renderDetailsFields(inq) {\n";
const endRender = "    function setFieldValue";
let preRender = jsStr.substring(0, jsStr.indexOf(startRender) + startRender.length);
let postRender = jsStr.substring(jsStr.indexOf(endRender));
jsStr = preRender + renderStr + "    }\n\n" + postRender;

// 3. btnDetailsSave
let saveStr = "";
fields.forEach(f => {
    saveStr += `            dbList[idx].${f.dbKey} = ${f.id}.value.trim() || '-';\n`;
});
const startSave = "// Update db specifications\n";
const endSave = "            // Update extraction & validation indicators\n";
let preSave = jsStr.substring(0, jsStr.indexOf(startSave) + startSave.length);
let postSave = jsStr.substring(jsStr.indexOf(endSave));
jsStr = preSave + saveStr + "\n" + postSave;

// 4. Export CSV
let exportStr = `                ['1. Core Inquiry Information', 'Uploaded On', dbList[idx].uploadedOn],\n                ['1. Core Inquiry Information', 'Exported On', dbList[idx].exportedOn],\n`;
fields.forEach(f => {
    exportStr += `                ['${f.title}', '${f.label}', ${f.id}.value],\n`;
});
// Remove last comma and newline
exportStr = exportStr.slice(0, -2) + "\n";
const startExport = "const rows = [\n";
const endExport = "            ];\n\n            let csvContent";
let preExport = jsStr.substring(0, jsStr.indexOf(startExport) + startExport.length);
let postExport = jsStr.substring(jsStr.indexOf(endExport));
jsStr = preExport + exportStr + postExport;

// 5. Remove fldExportedOn usages
jsStr = jsStr.replace("            fldExportedOn.value = formattedDate;\n", "");
jsStr = jsStr.replace("            fldExportedOn.classList.remove('missing-field');\n\n", "\n");

fs.writeFileSync('details-page.js', jsStr, 'utf8');
console.log('details-page.js refactored successfully.');
