import React, { useState, useEffect, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddMealModal from './components/AddMealModal';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { api } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [error, setError] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const fetchMeals = useCallback(async () => {
    try {
      const data = await api.getMeals(todayStr);
      setMeals(data);
      setError(null);
    } catch (err) {
      setError('Could not load meals. Is the server running?');
    }
  }, [todayStr]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleAddMeal = async (formData) => {
    await api.addMeal(formData);
    await fetchMeals();
  };

  const handleUpdateMeal = async (formData, id) => {
    await api.updateMeal(id, formData);
    await fetchMeals();
  };

  const handleDeleteMeal = async (id) => {
    await api.deleteMeal(id);
    await fetchMeals();
  };

  const handleSubmit = async (formData, id) => {
    if (id) {
      await handleUpdateMeal(formData, id);
    } else {
      await handleAddMeal(formData);
    }
  };

  const openAddModal = () => {
    setEditingMeal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <FloatingHearts />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Error Banner */}
      {error && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 mt-2">
          <div className="glass-card p-4 text-center border-rose-300">
            <p className="text-rose-500 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <HomePage onAddMeal={openAddModal} mealCount={meals.length} />
        ) : (
          <DashboardPage
            meals={meals}
            onEdit={openEditModal}
            onDelete={handleDeleteMeal}
            onAddMeal={openAddModal}
          />
        )}
      </main>

      <Footer />

      {/* Add/Edit Meal Modal */}
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMeal(null);
        }}
        onSubmit={handleSubmit}
        editingMeal={editingMeal}
      />
    </div>
  );
}

export default App;
