document.addEventListener('DOMContentLoaded', () => {
    const morphs = document.querySelectorAll('.morph');

    createMorphShapes('morph', 3); // Adjust the number of shapes as needed

    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, options);

    morphs.forEach((morphShape) => {
      observer.observe(morphShape);
    });

    function resizeMorphShapeWrappers() {
        document.querySelectorAll('.morph').forEach(container => {
            const wrapper = container.querySelector('.morph-shape-wrapper');
            if (wrapper) {
                const containerRect = container.getBoundingClientRect();
                wrapper.style.width = `${containerRect.width}px`; // Width is generally accurate
                wrapper.style.height = `${containerRect.height}px`; // More accurate height
            }
        });
    }
    

    // Call the resize function initially and on every window resize
    resizeMorphShapeWrappers();
    window.addEventListener('resize', resizeMorphShapeWrappers);

    function createMorphShapes(containerClass, numberOfShapes) {
      const morphs = document.querySelectorAll(`.${containerClass}`);
      if (!morphs) return;
      if (morphs.length === 0) return;

      morphs.forEach(container => {
        const wrapper = document.createElement('div');
        wrapper.className = 'morph-shape-wrapper';
        wrapper.style.position = 'relative';

        for (let i = 0; i < numberOfShapes; i++) {
          const shape = document.createElement('div');
          shape.className = 'morph-shape';
          shape.id = `${containerClass}-polygon${i + 1}`;
          shape.style.backgroundColor = getRandomColor();
          wrapper.appendChild(shape);
        }

        container.appendChild(wrapper);
      });
    }

    window.addEventListener('scroll', () => {
        document.querySelectorAll('.morph-shape').forEach((shape, index) => {
            // Generate and apply a dynamic clip-path
            shape.style.clipPath = generateDynamicClipPath(window.scrollY, index);
    
            // Dynamically adjust the z-index
            shape.style.zIndex = 100 - index;
    
            // Slowly change the color of each shape by shifting the HSL
            const hue = (window.scrollY + index * 100) % 360;
            shape.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
    
            // Calculate rotation based on scroll position
            // Alternate directions based on whether the index is odd or even
            const rotationDirection = index % 2 === 0 ? 1 : -1; // 1 for clockwise, -1 for counterclockwise
            const rotationAngle = rotationDirection * (window.scrollY / 20 % 360); // Adjust the divisor for speed
    
            // Apply rotation while maintaining any existing transformations like centering
            shape.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
        });
    });
    
  
  function createMorphShapes2(containerClass, numberOfShapes) {
  const morphs = document.querySelectorAll(`.${containerClass}`);
  if (!morphs) return;
  if (morphs.length === 0) return;

  morphs.forEach(container => {
    const wrapper = document.createElement('div');
    wrapper.className = 'morph-shape-wrapper';
    wrapper.style.position = 'relative';

    for (let i = 0; i < numberOfShapes; i++) {
      const shape = document.createElement('div');
      shape.className = 'morph-shape';
      shape.id = `${containerClass}-polygon${i + 1}`;
      shape.style.backgroundColor = getRandomColor();

      // Position shapes absolutely within the wrapper
      shape.style.position = 'absolute';
      shape.style.top = '50%'; // Center the shape or choose a strategy for overlap
      shape.style.left = '50%';
      shape.style.transform = 'translate(-50%, -50%)'; // Center the shape

      wrapper.appendChild(shape);
    }

    container.appendChild(wrapper);
  });
}

});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function generateDynamicClipPath(scrollY, index) {
    // Example: Create a dynamic polygon based on scroll position and index
    // This is a simplified example; adjust the logic to suit your design
    const size = 3 + (scrollY / 1000 + index) % 5; // Dynamic number of sides based on scroll
    let clipPath = 'polygon(';
    for (let i = 0; i < size; i++) {
      const angle = (2 * Math.PI / size) * i; // Angle in radians
      const x = 50 + 40 * Math.cos(angle); // Adjust the radius and center as needed
      const y = 50 + 40 * Math.sin(angle);
      clipPath += `${x}% ${y}%, `;
    }
    clipPath = clipPath.slice(0, -2) + ')'; // Remove the last comma and space, then close the parenthesis
    return clipPath;
  }
  

  function createMorphShapes(containerClass, numberOfShapes) {
    const morphs = document.querySelectorAll(`.${containerClass}`);
    if (!morphs) return;
    if (morphs.length === 0) return;
  
    morphs.forEach(container => {
      const wrapper = document.createElement('div');
      wrapper.className = 'morph-shape-wrapper';
      wrapper.style.position = 'relative';
  
      for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'morph-shape';
        shape.id = `${containerClass}-polygon${i + 1}`;
        shape.style.backgroundColor = getRandomColor();
  
        // Position shapes absolutely within the wrapper
        shape.style.position = 'absolute';
        shape.style.top = '50%'; // Center the shape or choose a strategy for overlap
        shape.style.left = '50%';
        shape.style.transform = 'translate(-50%, -50%)'; // Center the shape
  
        wrapper.appendChild(shape);
      }
  
      container.appendChild(wrapper);
    });
  }
  