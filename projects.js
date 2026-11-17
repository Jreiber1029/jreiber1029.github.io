const projects = {
  koma: {"title":"KOMA — Local AI Toolbox","images":[["koma-side-studio","Three-quarter side view of KOMA with brown fabric, leather trim and an aluminium handle against blue and amber lighting.","KOMA — side view"],["koma-front-studio","Front view of KOMA under blue and amber lighting, showing the camera and four tool pockets.","KOMA — front view"],["koma-front-white","Front view of KOMA against a white background.","KOMA — front view on white"],["koma-01","KOMA toolbox with brown fabric, tan leather edging, an aluminium handle and a printed electronics base.","Latest assembled prototype"],["koma-02","Early fabric mock-up with chalk markings for the pockets and camera position.","Planning the fabric body"],["koma-03","Rigid end panels and cream lining during construction.","Building the supporting structure"],["koma-04","Cream lining fitted around the aluminium handle and textured grip.","Fitting the lining and handle"],["koma-05","Jetson board, camera ribbon and power bank positioned in an early printed enclosure, beside a Jabra speaker.","Testing the electronics layout"],["koma-06","Brown pocketed fabric body fitted to the printed base, with the camera outside its housing position.","Bringing fabric and electronics together"],["koma-07","Underside mounting frame and fasteners connecting the fabric body to the electronics enclosure.","Joining the body to the base"],["koma-08","Camera fitted to the front of the toolbox, with clips holding the leather edging in place.","Positioning the camera and leather trim"],["koma-09","Assembled toolbox on the workbench during stitching and final fitting.","Stitching and finishing"],["koma-10","Opened toolbox showing the Jetson board, cooling fan and Jabra speaker in the removable base.","Inside the current prototype"]]},
  bioreactor: {
    title: 'Aerobic Bioreactor Simulator',
    images: [
      ['bioreactor-01', 'Front view of the bioreactor, with temperature and humidity display, exposed wiring and tubing.'],
      ['bioreactor-02', 'Side view of the bioreactor with its internal reservoirs and red and green lighting.'],
      ['bioreactor-03', 'Rear view of the glass enclosure, showing organic matter, tubing and a fan.'],
      ['bioreactor-04', 'Three-quarter view of the bioreactor and its connected tubes.'],
      ['bioreactor-05', 'Front detail of the bioreactor display and electronics.'],
      ['bioreactor-06', 'The bioreactor illuminated in green and magenta.'],
      ['bioreactor-07', 'The accompanying Manifesto for Responsible Digestion owner’s manual.'],
      ['bioreactor-08', 'Close view of the bioreactor display under blue, red and green lighting.'],
      ['bioreactor-09', 'Rear detail of the bioreactor illuminated in green.']
    ]
  },
  ppes: {
    title: 'PPES — Personal Protection and Exposure System',
    images: [
      ['ppes-01', 'PPES worn across the chest on a strap, with a camera positioned below the wearer’s face.']
    ]
  },
  tinyml: {
    title: 'Audio DEV C3 — TinyML Audio + Air Quality Recorder',
    images: [
      ['tinyml-01', 'Front view of the Audio DEV C3 recorder with illuminated sensor readings.'],
      ['tinyml-02', 'Rear view showing the recorder’s strap, sensor module and exposed sensor wiring.'],
      ['tinyml-03', 'Side view showing the two-tone enclosure, strap and metal toggle switch.'],
      ['tinyml-04', 'Landscape view of the Audio DEV C3 recorder with its screen, physical controls and sensor module.']
    ]
  }
};
const gallery = document.querySelector('#gallery');
const mainImage = document.querySelector('#gallery-image');
const thumbnails = document.querySelector('#thumbnails');
let selectedProject;
let imageIndex = 0;

function showImage(index) {
  imageIndex = (index + selectedProject.images.length) % selectedProject.images.length;
  const [file, alt, caption] = selectedProject.images[imageIndex];
  const captionElement = document.querySelector("#gallery-caption");
  captionElement.textContent = caption || "";
  captionElement.hidden = !caption;
  mainImage.src = `images/${file}.webp`;
  mainImage.alt = alt;
  document.querySelector('#gallery-count').textContent = `${imageIndex + 1} / ${selectedProject.images.length}`;
  const singleImage = selectedProject.images.length === 1;
  document.querySelector('#previous').hidden = singleImage;
  document.querySelector('#next').hidden = singleImage;
  thumbnails.hidden = singleImage;
  [...thumbnails.children].forEach((button, i) => button.setAttribute('aria-current', String(i === imageIndex)));
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    selectedProject = projects[button.dataset.project];
    document.querySelector('#gallery-title').textContent = selectedProject.title;
    thumbnails.replaceChildren(...selectedProject.images.map(([file], index) => {
      const thumb = document.createElement('button');
      thumb.className = 'thumbnail';
      thumb.setAttribute('aria-label', `View photograph ${index + 1}`);
      const image = document.createElement('img');
      image.src = `images/${file}-thumb.webp`;
      image.alt = '';
      thumb.append(image);
      thumb.addEventListener('click', () => showImage(index));
      return thumb;
    }));
    showImage(0);
    gallery.showModal();
  });
});
document.querySelector('#close-gallery').addEventListener('click', () => gallery.close());
document.querySelector('#previous').addEventListener('click', () => showImage(imageIndex - 1));
document.querySelector('#next').addEventListener('click', () => showImage(imageIndex + 1));
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(imageIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
