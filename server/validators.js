function validateItem(body) {
  if (!body || typeof body.name !== 'string' || body.name.trim() === '') {
    return 'Resource name is required.';
  }
  return null;
}
module.exports = { validateItem };
