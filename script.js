const apiKey = '8441a106-0536-4aed-9b57-e7ad241c0010';
const imagesToShow = 20;
const container = document.getElementById('images');

for (let i = 0; i < imagesToShow; i++) {
  const box = document.createElement('div');
  box.className = 'box';

  const title = document.createElement('h2');
  title.className = 'content-title';
  title.textContent = 'Loading...';

  const img = document.createElement('img');
  img.className = 'image';
  img.alt = `Art image ${i + 1}`;

  box.appendChild(title);
  box.appendChild(img);
  container.appendChild(box);
}

const images = document.querySelectorAll('.image');
const contentBoxes = document.querySelectorAll('.box');

const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=${imagesToShow}&hasimage=1`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (!data.records || data.records.length === 0) {
      throw new Error('No records found');
    }

    data.records.forEach((record, index) => {
      if (record.primaryimageurl && index < images.length) {
        images[index].src = record.primaryimageurl;
        const titleDiv = contentBoxes[index].querySelector('.content-title');
        titleDiv.textContent = record.title || 'Untitled';
      }
    });

    window.addEventListener('scroll', checkBoxes);
    checkBoxes();
  })
  .catch(error => {
    console.error('Error:', error);
    container.innerHTML = `<div class="error">Failed to load images.</div>`;
  });

function checkBoxes() {
  const triggeringBottom = window.innerHeight * 0.8;

  contentBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggeringBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
