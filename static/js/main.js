const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const resultTextarea = document.getElementById('resultTextarea');
const modelOutputTextarea = document.getElementById('modelOutputTextarea');
const modelOutputLabel = document.getElementById('modelOutputLabel');

fileInput.addEventListener('change', function() {
  const countDisplay = document.getElementById('imageCount');
  const files = this.files;
  const imageCount = files.length;
  countDisplay.textContent = imageCount + (imageCount === 1 ? ' image selected' : ' images selected');

  if (imageCount > 0) {
    uploadButton.removeAttribute('disabled');
  } else {
    uploadButton.setAttribute('disabled', 'disabled');
  }

  if (imageCount > 5) {
    modelOutputTextarea.style.display = 'none';
    modelOutputLabel.style.display = 'none';
  } else {
    modelOutputTextarea.style.display = 'block';
    modelOutputLabel.style.display = 'block';
  }
});



uploadButton.addEventListener('click', function() {
  const files = fileInput.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }


  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    resultTextarea.value = data.results.join('\n');
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
