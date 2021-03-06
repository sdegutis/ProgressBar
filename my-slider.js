class MySlider extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.innerHTML = /*html*/`
      <style id="style">
        #slider-container {
          height: 18px;

          background: #aaa;
          border-radius: 9px;

          position: relative;
        }

        #slider-bar {
          top: 0;
          bottom: 0;
          left: 0;

          position: absolute;

          background: #090;
          border-radius: 9px;
        }

        #slider-bar.animates {
          transition:
            width ease-out 400ms, 
            opacity ease-out 400ms;
        }

        #slider-reflection {
          content: '';

          background: #0c0;
          border-radius: 2px;

          position: absolute;

          top: 4px;
          height: 4px;
          left: 10px;
          right: 10px;
        }
      </style>

      <div id="slider-container">
        <div id="slider-bar">
          <div id="slider-reflection"></div>
        </div>
      </div>
    `;
  }

  get percent() {
    return parseInt(this.getAttribute('percent')) || 0;
  }

  set percent(val) {
    val = val || 0;
    val = Math.min(val, 100);
    val = Math.max(val, 0);
    this.setAttribute('percent', val);
  }

  static get observedAttributes() {
    return ['percent'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'percent': {
        const slider = this.shadow.getElementById('slider-bar');
        this.adjustWidth();
        slider.style.opacity = (this.percent === 0 ? 0 : 1);
        break;
      }
    }
  }

  adjustWidth() {
    const availableWidth = this.shadow.getElementById('slider-container').clientWidth;
    const slider = this.shadow.getElementById('slider-bar');
    slider.style.width = `${this.percent / 100 * (availableWidth - 18) + 18}px`;
  }

  connectedCallback() {
    this.adjustWidth();
    setTimeout(() => {
      this.shadow.getElementById('slider-bar').classList.add('animates');
    }, 0);
  }

  increase(amt) {
    this.percent += amt;
  }
}

customElements.define('my-slider', MySlider);
