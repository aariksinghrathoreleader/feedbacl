// pages/index.js
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

export default function Home() {
  return (
    <div>
      <h1>Feedback Website</h1>
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}
