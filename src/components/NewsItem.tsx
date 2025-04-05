import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  item: { id: number; text: string; date: string };
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

const Card = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
`;

const DateText = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.edit { background: #007bff; color: #fff; }
  &.delete { background: #ff4444; color: #fff; }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`;

export default function NewsItem({ item, onDelete, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [tempText, setTempText] = useState(item.text);

  const saveEdit = () => {
    onUpdate(item.id, tempText);
    setEditMode(false);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <Card>
      <DateText>{formatDate(item.date)}</DateText>
      {editMode ? (
        <Input
          value={tempText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempText(e.target.value)}
        />
      ) : (
        <p>{item.text}</p>
      )}
      <ButtonGroup>
        {editMode ? (
          <Button className="edit" onClick={saveEdit}>Сохранить</Button>
        ) : (
          <Button className="edit" onClick={() => setEditMode(true)}>Редактировать</Button>
        )}
        <Button className="delete" onClick={() => onDelete(item.id)}>Удалить</Button>
      </ButtonGroup>
    </Card>
  );
}