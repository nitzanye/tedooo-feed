import React, { useEffect, useState } from "react";
import moment from "moment";
import './Card.css';
import totalLikesIcon from '../../images/totalLikesIcon.png';
import likeIcon from '../../images/likeIcon.svg';
import strokIcon from '../../images/stroke.svg';
import commentIcon from '../../images/commentIcon.png';
import ImageContainer from "../Image/Image";
import { CardData } from "../../types/CardData";

interface CardProps {
  card: CardData;
}

const Card = ({ card }: CardProps) => {
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(card.likes);

  const handleLike = () => {
    if (liked) {
      setTotalLikes(totalLikes - 1);
    } else {
      setTotalLikes(totalLikes + 1);
    }
    setLiked(!liked);
  }

  const date = card.date;
  const timeDiff = moment(date).fromNow();
 
  useEffect(() => {
    const sendImpression = async () => {
      try {
        await fetch(`https://www.tedooo.com/?itemId=${card.id}` , {
          mode: 'no-cors'
        });
        // console.log(`Sent impression for card ${card.id}`);
      } catch (error) {
        console.error(`Error sending impression for card ${card.id}: ${error}`);
      }
    };
    sendImpression();
  }, [card.id]);

  return (
    <div className="card">
      <div className="card__header">
        <img className="card__avatar" src={card.avatar} alt={card.username} />
        <div className="card-info">
          <h3 className="card__username">{card.username}</h3>
          <div className="shopname-wrapper">
            <p className="card__shopname">{card.shopName}</p>
            <p className="card__date"><span className="separator"></span>{timeDiff}</p>
          </div>
        </div>
      </div>
      <p className="card__text" >{card.text}</p>

      <ImageContainer images={card.images}  />
     
      <div className="card__total">
        <div className="total-wrapper">
          <img className='total__icon' src={totalLikesIcon} alt='Total Likes'/>
          <p className="total__text">{`${totalLikes} Likes`}</p>
        </div>
        <p className="total__text">{`${card.comments} Comments`}</p>
      </div>
      <div className="border"></div>

      <div className="card__features">
        <div onClick={handleLike} className="features-wrapper">
        <img
        src={liked ? strokIcon : likeIcon}
        alt="Like Icon"
        className='comment-icon'
        />
        <p className={`features__text ${liked ? 'like-text' : 'gray-color'}`}>Like</p>
        </div>

        <div className="features-wrapper">
          <img src={commentIcon} alt='Comment Icon' className='comment-icon'/>
          <p className='features__text' >Comment</p>
        </div>
      </div>
    </div>
  );
};

export default Card;