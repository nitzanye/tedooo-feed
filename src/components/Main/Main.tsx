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

  const getCards = async () => {
    try {
      const res = await fetch(`${url}?skip=${skip}&limit=6`);
      const data: { hasMore: boolean; data: CardData[] } = await res.json();
      // const data: CardProps = await res.json();     

      if (hasMore && data.hasMore) {
        const cardsList = data.data;
        setCards(prevCards => [...prevCards, ...cardsList]);
        setSkip(prevSkip => prevSkip + cardsList.length);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (skip === 0) {
      getCards();
    }
  }, [skip, hasMore, getCards]);

  // Handle scrolling to the page bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && hasMore) {
      setSkip(prevSkip => prevSkip + 6);
      getCards(); // fetch the next 6 cards
    }
  };
  
  // Add scroll event listener to window
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, handleScroll]);

  
   // Send impression only once for each card 
  useEffect(() => {
    const sendImpression = async (cardId: string) => {
      try {
        await fetch(`https://www.tedooo.com/?itemId=${cardId}` , {
          mode: 'no-cors'
        });
      } catch (error) {
        console.error(`Error sending impression for card ${cardId}: ${error}`);
      }
    };

    cards.forEach((card) => {
      if (!card.impressionSent) {
        sendImpression(card.id);
        card.impressionSent = true;
      }
    });
  }, [cards]);
  
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
