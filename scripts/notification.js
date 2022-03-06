function notify(message) {
  const container = document.createElement('div');

  container.className = 'message';
  container.innerHTML = message;

  document.body.appendChild(container);

  setTimeout(() => document.body.removeChild(container), 2000);
}
