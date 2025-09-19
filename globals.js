// TrinsyCa Servoy Field Validation Functions

/**
 * Validates required fields in a foundset and shows errors if any are empty.
 * @param {Array<String>} requiredFields - Array of field names to validate.
 * @param {String} formName - Name of the form containing the elements.
 * @param {JSFoundSet} [customFoundset] - Optional custom foundset to validate (defaults to form's foundset).
 * @return {Boolean} - True if there are validation errors, false otherwise.
 * @properties={typeid:24,uuid:"99BCAD23-15DF-420D-80EE-DA492852BC94"}
 */
function validateFields(requiredFields, formName, customFoundset) {
    var form = forms[formName];
    var fs = customFoundset || form.foundset; // Use custom or default foundset
    var errorMessages = [];
    var hasError = false;
    
    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var value = fs[fieldName];
        var errorLabelName = fieldName + '_ErrorLabel';
        
        if (!value) {
            if (form.elements[errorLabelName]) {
                form.elements[errorLabelName].visible = true;
            }
            
            var labelText = form.elements[errorLabelName] ? form.elements[errorLabelName].text : "Fields are can not be empty";
            var message = labelText;
            errorMessages.push(message);
            hasError = true;
        } else {
            if (form.elements[errorLabelName]) {
                form.elements[errorLabelName].visible = false;
            }
        }
    }
    
    if (hasError) {
        var popupMessage = errorMessages.join('<br><br>');
        plugins.dialogs.showErrorDialog('Validation Error', popupMessage);
    }
    
    return hasError;
}

/**
 * Hides error labels for the required fields.
 * @param {Array<String>} requiredFields - Array of field names with error labels.
 * @param {String} formName - Name of the form containing the elements.
 * @properties={typeid:24,uuid:"45B2CA96-9888-436B-B9DC-0FDF2B6B2D8F"}
 */
function hideErrorLabels(requiredFields, formName) {
    var form = forms[formName];
    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var errorLabelName = fieldName + '_ErrorLabel';
        if (form.elements[errorLabelName]) {
            form.elements[errorLabelName].visible = false;
        }
    }
}

// TrinsyCa Servoy Field Validation Functions