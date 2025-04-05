import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface Props {
  onAdd: (item: { id: number; text: string; date: string }) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-bottom:10px;
  padding: 10px;
  font-size: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`;

export default function NewsForm({ onAdd }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ id: Date.now(), text, date: new Date().toISOString() });
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="Введите новость"
      />
      <Button type="submit">Добавить</Button>
    </Form>
  );
}