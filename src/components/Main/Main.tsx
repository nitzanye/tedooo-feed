import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../Card/Card";
import './Main.css';
import { CardData } from "../../types/CardData";

// interface CardProps {
//   hasMore: boolean;
//   data: CardData[];
//   key: string;
// }

const Main = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const hasMoreRef = useRef(true);

  const url = 'https://dev.tedooo.com/hw/feed.json';

  const getCards = useCallback(async () => {
    try {
      const res = await fetch(`${url}?skip=${skip}&limit=6`);
      const data: { hasMore: boolean; data: CardData[] } = await res.json();

      const cardsList = data.data;
      setCards(prevCards => [...prevCards, ...cardsList]);
      hasMoreRef.current = data.hasMore;
    } catch (error) {
      console.error(error);
    }
  }, [skip]);

  useEffect(() => {
      getCards();
  }, [getCards]);

  // Handle scrolling to the page bottom
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMoreRef.current) {
      setSkip(prevSkip => prevSkip + 6);
    }
  }, []);
  
  // Add scroll event listener to window
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return (
    <main className="main">
      <ul className="cards__list">
        {cards.map((card, index) => (
          <Card key={`${card.id}-${index}`} card={card} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
