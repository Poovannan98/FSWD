const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options
    };

    const response = await fetch(`http://localhost:5000${url}`, config);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  }
};

export default api;