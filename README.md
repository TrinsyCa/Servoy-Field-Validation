# Servoy-Field-Validation

![Servoy Logo](https://img.shields.io/badge/Servoy-Validation-blue?style=flat-square&logo=servoy)  
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)  
[![Servoy Version](https://img.shields.io/badge/Servoy-2023%2B-orange?style=flat-square)](https://www.servoy.com/)

This repository provides a simple yet effective validation structure for Servoy projects. It includes helper functions to validate required fields on a form, display error labels for missing values, show error dialogs, and hide error labels when needed. The validation logic is designed to be placed in a Servoy scope (e.g., the `globals` scope) for easy reuse across forms. 🚀

## Features ✨
- ✅ Checks if specified fields in a foundset are empty.
- 🏷️ Displays custom error labels (e.g., `fieldName_ErrorLabel`) next to empty fields.
- ⚠️ Shows a popup dialog with aggregated error messages.
- ❌ Hides error labels on cancel or reset actions.
- 🔄 Supports custom foundsets for flexibility.

## Setup 🛠️
1. Create a new scope in your Servoy solution (e.g., `globals`) or use an existing one.
2. Copy the validation functions (`validateFields` and `hideErrorLabels`) into a JavaScript file in that scope (e.g., `validation.js`).
3. In your forms, ensure that for each required field (e.g., `customerid`), you have a corresponding error label element named `customerid_ErrorLabel` (hidden by default, with text like "This field is required").
4. Call the functions from your form events, passing the required fields array, form name, and optionally a custom foundset.

No additional dependencies are required, as this uses built-in Servoy APIs like `forms`, `databaseManager`, `plugins.dialogs`, and `application.output`. 📦

## Usage 📖
To use this validation in your Servoy forms, define an array of required field names at the top of your form's JavaScript file. Then, call `globals.validateFields` in save events to check for errors before saving data. Use `globals.hideErrorLabels` in cancel or reset events to clear the error indicators.

### Example 💡
Here's how to integrate it into a form like `order_edit.js`:

```js
// order_edit.js

// Define the required fields at the top for easy maintenance
var requiredFields = ['customerid', 'orderdate', 'shipcountry', 'shipcity', 'shipaddress', 'shippostalcode', 'shipregion', 'shipvia'];

/**
 * Save the order after validating required fields.
 * @param {JSEvent} event - The event triggering the save.
 */
function saveOrder(event) {
    // Validate fields using the globals function
    // Pass requiredFields, the current form name, and the foundset
    var hasError = globals.validateFields(requiredFields, controller.getName(), foundset);
    
    if (!hasError) {
        // Proceed with saving if no errors
        databaseManager.saveData(foundset);
        application.output('Main foundset is saved!');
    }
    // If errors, the function will handle showing labels and dialog
}

/**
 * Cancel the order and hide any error labels.
 * @param {JSEvent} event - The event triggering the cancel.
 */
function cancelOrder(event) {
    // Hide error labels using the globals function
    globals.hideErrorLabels(requiredFields, controller.getName());
}
```

### Detailed Explanation 🔍
- **requiredFields**: An array of dataprovider names (field names) that must not be empty. 📋
- **validateFields(requiredFields, formName, customFoundset)**:
  - Iterates through each required field.
  - Checks if the value in the foundset is empty (`!value`).
  - If empty, shows the corresponding `_ErrorLabel` element and collects error messages.
  - If errors are found, displays a dialog with all messages joined by line breaks.
  - Returns `true` if there are errors, `false` otherwise.
- **hideErrorLabels(requiredFields, formName)**:
  - Hides all `_ErrorLabel` elements for the required fields.
- **Customization** 🔧:
  - Error labels must exist on the form and be named consistently (e.g., `shipcountry_ErrorLabel`).
  - Default error message: "Fields are can not be empty" (customize via label text).
  - Use a custom foundset if validating a different record set.

## Validation Code 📄
Place the following code in your scope file (e.g., `scopes/globals.js`):

## Contributing 🤝
Feel free to fork this repo and submit pull requests for improvements, such as adding more validation types (e.g., regex checks) or better error handling. Your contributions are welcome! 🌟

## License 📝
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. (Create a LICENSE file in your repo if needed.)