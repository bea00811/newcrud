import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsForm from './components/NewsForm';
import NewsList from './components/NewsList';
import GlobalStyles from './styles/GlobalStyles';

interface NewsItemType {
  id: number;
  text: string;
  date: string;
}

const AppWrapper = styled.div`
 
    margin: 0 auto;
    grid-auto-columns: center;
    display: block;
    max-width: 600px;
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    background-color: #f2f2f2;
`;

const Input = styled.input`
    margin: 10px 0;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
`;

const Select = styled.select`
   margin: 0 0 10px 0;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #ff4444;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function App() {
  const [news, setNews] = useState<NewsItemType[]>(() => {
    const stored = localStorage.getItem('news');
    const initial = stored ? JSON.parse(stored) : [];
    return initial;
  });
  
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');


  // Сохранение в localStorage при каждом изменении новостей
  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const clearAll = () => {
    setNews([]);
    localStorage.removeItem('news');
  };

  const addNews = (item: NewsItemType) => setNews([...news, item]);
  const deleteNews = (id: number) => setNews(news.filter(n => n.id !== id));
  const updateNews = (id: number, text: string) => setNews(news.map(n => n.id === id ? { ...n, text } : n));

  const filteredNews = news
    .filter(n => n.text.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <h1>Новости</h1>
          <Input
            type="text"
            placeholder="Поиск по новостям"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
          />
          <Select
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value as 'newest' | 'oldest')
            }
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </Select>
      
        <NewsForm onAdd={addNews} />
        <NewsList news={filteredNews} onDelete={deleteNews} onUpdate={updateNews} />
        <ClearButton onClick={clearAll}>Очистить все</ClearButton>
      </AppWrapper>
    </>
  );
}