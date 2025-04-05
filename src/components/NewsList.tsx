import NewsItem from './NewsItem';

interface NewsItemType {
  id: number;
  text: string;
  date: string;
}

interface Props {
  news: NewsItemType[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

export default function NewsList({ news, onDelete, onUpdate }: Props) {
  return (
    <div>
      {news.map(item => (
        <NewsItem key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
