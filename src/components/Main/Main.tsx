import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import './Main.css';
import { CardData } from "../../types/CardData";

interface CardProps {
  hasMore: boolean;
  data: CardData[];
  key: string;
}

const Main = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const url = 'https://dev.tedooo.com/hw/feed.json';

  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await fetch(`${url}?skip=${skip}`);
        const data: CardProps = await res.json();     
        const cardsList = data.data;
        setCards(prevCards => [...prevCards, ...cardsList]);
        setSkip(prevSkip => prevSkip + cardsList.length);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error(error);
      }
    };

    if (hasMore) {
      getCards();
    }
  }, [skip, hasMore]);

  // Handle scrolling to the page bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore) {
      setSkip(prevSkip => prevSkip + 6);
    }
  };
  
  // Add scroll event listener to window
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, handleScroll]);

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
