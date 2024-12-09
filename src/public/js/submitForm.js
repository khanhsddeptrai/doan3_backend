const submitForm = (formId) => {
    const form = document.getElementById(formId);
    if (form) {
        form.submit();
    } else {
        console.error("Form không tìm thấy.");
    }
}