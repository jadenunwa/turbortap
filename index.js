const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

function getRandomPosition(radius = 500) {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radius;
  const offsetX = Math.cos(angle) * distance;
  const offsetY = Math.sin(angle) * distance;
  return { x: centerX + offsetX, y: centerY + offsetY };
}

async function simulateMouseMovement(targetX, targetY, steps = 10) {
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  const deltaX = (targetX - startX) / steps;
  const deltaY = (targetY - startY) / steps;

  for (let i = 0; i <= steps; i++) {
    const moveEvent = new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: startX + deltaX * i,
      clientY: startY + deltaY * i,
    });
    document.dispatchEvent(moveEvent);
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 50 + 20)
    );
  }
}

function simulateClick(x, y) {
  const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    button: 0,
  });

  const elementAtPosition = document.elementFromPoint(x, y);

  if (elementAtPosition) {
    elementAtPosition.dispatchEvent(clickEvent);
    console.log(`Đã click vào vị trí: (${x}, ${y})`);
  } else {
    console.log(`Không tìm thấy phần tử tại vị trí: (${x}, ${y})`);
  }
}

async function simulateKeyboardInput() {
  const keys = [
    "a",
    "s",
    "d",
    "w",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const keyEvent = new KeyboardEvent("keydown", {
    key: randomKey,
    bubbles: true,
  });
  document.dispatchEvent(keyEvent);
  console.log(`Đã nhập phím: ${randomKey}`);
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50));
  const keyUpEvent = new KeyboardEvent("keyup", {
    key: randomKey,
    bubbles: true,
  });
  document.dispatchEvent(keyUpEvent);
}

async function startSimulating() {
  while (true) {
    const { x, y } = getRandomPosition();
    await simulateMouseMovement(x, y, Math.floor(Math.random() * 10 + 5));
    simulateClick(x, y);
    if (Math.random() < 0.3) {
      await simulateKeyboardInput();
    }
    const waitTime = Math.random() * 350 + 100;
    console.log(`Đợi ${waitTime.toFixed(0)}ms trước lần tiếp theo.`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}

startSimulating();
