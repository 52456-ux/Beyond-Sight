import { useEffect, useMemo, useState } from 'react';

export default function ResourceManager() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Phone and computer');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function loadItems(searchText = '') {
    setLoading(true);
    setError('');
    try {
      const url = searchText
        ? `/api/items?search=${encodeURIComponent(searchText)}`
        : '/api/items';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Could not load resources');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError('Load failed. Start the backend server and try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => loadItems(search), 250);
    return () => clearTimeout(timeoutId);
  }, [search]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Please enter a resource name and description.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, category, description }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not add resource');
      setTitle('');
      setDescription('');
      setMessage('Resource added successfully.');
      await loadItems(search);
    } catch (err) {
      setError(err.message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError('');
    setMessage('');
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not delete resource');
      setMessage('Resource deleted.');
      await loadItems(search);
    } catch (err) {
      setError(err.message || 'Delete failed. Please try again.');
    }
  }

  return (
    <div className="resource-manager">
      <form className="resource-form" onSubmit={handleSubmit}>
        <label>
          Resource name
          <input value={title} onChange={(event) => setTitle(event.target.value)}
            placeholder="For example, Screen Magnifier" />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Phone and computer</option>
            <option>Display</option>
            <option>Everyday tips</option>
          </select>
        </label>
        <label className="description-field">
          Description
          <input value={description} onChange={(event) => setDescription(event.target.value)}
            placeholder="What does this resource do?" />
        </label>
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Adding…' : 'Add resource'}
        </button>
      </form>

      <label className="search-label">
        Search resources
        <input type="search" value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, category or description" />
      </label>

      {error && <p className="api-message error" role="alert">{error}</p>}
      {message && <p className="api-message success" role="status">{message}</p>}
      {loading ? (
        <p className="loading-message">Loading resources…</p>
      ) : items.length === 0 ? (
        <p className="loading-message">No resources found. Try another search or add one.</p>
      ) : (
        <div className="resource-list">
          {items.map((item) => (
            <article className="resource-item" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p className="resource-category">{item.category}</p>
                <p>{item.description}</p>
              </div>
              <button className="btn btn-delete" type="button"
                onClick={() => handleDelete(item.id)}>Delete</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
