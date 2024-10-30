// src/components/TestComponents/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUser } from '../../context/UserContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Access only the college name from the user context
  const { user } = useUser();
  const collegeName = user?.college;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        setError("Error fetching leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: leaderboard.map(user => user.username),
    datasets: [
      {
        label: 'Cumulative Scores',
        data: leaderboard.map(user => user.cumulativeScore),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="my-4">
      <h4>{collegeName || "College information not available"}</h4>
      <h2 className="text-center mb-4">Overall Leaderboard</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="mb-4 shadow">
              <Card.Header className="bg-success text-white">
                Leaderboard
              </Card.Header>
              <ListGroup variant="flush">
                {leaderboard.map((user, index) => (
                  <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                    <span>
                      {index + 1}. {user.username}
                    </span>
                    <span className="badge bg-primary me-2">
                      Score: {user.cumulativeScore}
                    </span>
                    <span className="text-secondary">
                      Overall Rank: {user.overallRank}
                    </span>
                    <span className="text-warning">
                      College Rank: {user.collegeRank}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow">
              <Card.Header className="bg-info text-white">
                Score Visualization
              </Card.Header>
              <Card.Body>
                <Bar data={chartData} options={{ responsive: true }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Leaderboard;
