import { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await axios.get('/api/feedbacks');
      setFeedbacks(response.data);
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Feedbacks</h2>
      <ul>
        {feedbacks.map((item, index) => (
          <li key={index}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
