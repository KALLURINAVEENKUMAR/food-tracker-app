const API_BASE = process.env.REACT_APP_API_URL || 'https://food-tracker-app-mmas.onrender.com/api';

export const api = {
  async getMeals(date) {
    const params = date ? `?date=${date}` : '';
    const res = await fetch(`${API_BASE}/meals${params}`);
    if (!res.ok) throw new Error('Failed to fetch meals');
    return res.json();
  },

  async addMeal(formData) {
    const res = await fetch(`${API_BASE}/meals`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to add meal');
    }
    return res.json();
  },

  async updateMeal(id, formData) {
    const res = await fetch(`${API_BASE}/meals/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update meal');
    }
    return res.json();
  },

  async deleteMeal(id) {
    const res = await fetch(`${API_BASE}/meals/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete meal');
    return res.json();
  },
};
