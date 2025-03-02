tinymce.init({
  selector: 'textarea',
  plugins: "image media code",
  toolbar: 'undo redo | link image | code',
  file_picker_callback: (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('thumbnail', file);
      
      try {
        const response = await fetch(`/admin/products-category/upload-image`, {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (data.location) {
          cb(data.location, { title: file.name }); // Chèn ảnh vào TinyMCE
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

    input.click();
  }
});