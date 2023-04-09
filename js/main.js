// html to pdf
var printBtn = document.getElementById("print-btn");
var content = document.getElementById("content");
var cache_width = content.width;
const marginBottomValue = '12px'

function headerPortfolio() {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'row';
  container.style.gap = marginBottomValue;
  container.style.marginBottom = marginBottomValue;

  const avatar = document.createElement('img')
  avatar.src = './assets/me.png'
  avatar.style.width = '200px'
  avatar.style.height = '200px'

  const contactBody = document.getElementById('contact').childNodes[3]
  const content = document.createElement('div');
  content.className = 'content__section_body'
  content.innerHTML = `
    <p class="content__normal_text" style="margin-bottom: 6px;">
      <i class="ri-file-user-fill"></i>
      Pham Xuan Bach
    </p>
  `

  contactBody.childNodes.forEach(node => {
    if (node.className === 'content__normal_text') {
      const c = node.cloneNode(true)
      c.style.marginBottom = '6px'
      content.appendChild(c)
    }
  });

  container.appendChild(avatar);
  container.appendChild(content);
  return container;
}

function reStyleCss(elm) {
  const clone = elm.cloneNode(true);
  let isFirst = 0
  clone.childNodes.forEach(node => {
    if (node.className === "content__section") {
      // remove node "Welcome to..."
      if (isFirst === 0) {
        clone.removeChild(node);
        isFirst = 1;
        return;   // continue forEach
      }

      // style
      node.style.marginBottom = '24px';
      node.childNodes[1].style.fontSize = '22px';
      node.childNodes[1].style.marginBottom = marginBottomValue;
      if (node.childNodes[3].childNodes[1].className.includes('content__normal_text')) {
        node.childNodes[3].childNodes[1].className = 'content__normal_text'
      } else if (node.childNodes[3].childNodes[1].className.includes('title__space_between')) {
        node.childNodes[3].childNodes[1].childNodes[1].style.fontSize = '18px';
        if (node.childNodes[3].childNodes[1].childNodes.length > 3) {
          node.childNodes[3].childNodes[1].childNodes[3].style.fontSize = '18px';
        }
      }

      // styling Projects
      if (node.childNodes[1].textContent.includes("Projects")) {
        node.childNodes.forEach(cNode => {
          if (cNode.className === "content__section_body") {
            cNode.childNodes.forEach(n => {
              if (n.className === "content__normal_text") {
                n.style.marginBottom = '6px'
              }
            })
          }
        })
      }

      // remove Contact
      if (node.childNodes[1].textContent.includes("Contact")) {
        clone.removeChild(node);
      }
      
    }
  });
  const header = headerPortfolio();
  clone.insertBefore(header, clone.childNodes[0])
  return clone
}

function createPDF() {
  var opt = {
    margin: 0.5,
    filename: "pxuanbach_cv.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pagebreak: { mode: ['legacy'] },
  };

  const contentReStyle = reStyleCss(content)

  html2pdf().set(opt).from(contentReStyle).save();
}

printBtn.addEventListener("click", function (e) {
  e.preventDefault();
  content.scrollTop = 0;
  createPDF();
});
