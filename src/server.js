const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

function generateStory(genre) {
  const genreTemplates = {
    horror: 'In a dark and {adj} {place}, there was a {noun} that {action}. It was a {adj} night, and {character} was filled with {emotion}.',
    romcom: 'Once upon a time, in a {adj} {place}, there were two people named {character1} and {character2}. They {action} and fell in love. Their love story was filled with {emotion}.',
    thriller: 'In a {adj} {place}, there was a {noun} that {action}. Little did they know that {unexpected_event} would happen, leading to a {climax}.',
    historical: 'In the {era}, in a {adj} {place}, there lived {character}. {Event} changed the course of history, and {character} played a key role.',
    comedy: 'In a {adj} {place}, a {character} had a knack for {action}. Their humorous antics and {mishap} kept everyone laughing.'
  };

  if (!genreTemplates[genre]) {
    return 'Invalid genre. Please choose from horror, romcom, thriller, historical, or comedy.';
  }

  const template = genreTemplates[genre];

  const story = template.replace(/{(\w+)}/g, (_, key) => {
    const options = {
      adj: ['spooky', 'romantic', 'mysterious', 'ancient', 'hilarious'],
      place: ['forest', 'castle', 'city', 'village', 'mansion'],
      noun: ['creature', 'artifact', 'family', 'kingdom', 'adventure'],
      action: ['haunted the place', 'discovered a hidden treasure', 'fell in love', 'uncovered a mystery', 'made everyone laugh'],
      character: ['John', 'Alice', 'Lucy', 'Henry', 'Ella'],
      emotion: ['fear', 'joy', 'excitement', 'curiosity', 'happiness'],
      character1: ['Alice', 'Emma', 'Sophia', 'Oliver', 'Liam'],
      character2: ['Ethan', 'Mia', 'Ava', 'Noah', 'Lily'],
      unexpected_event: ['a sudden storm', 'a mysterious stranger', 'a secret message', 'a hidden trap', 'a shocking revelation'],
      climax: ['thrilling climax', 'dramatic turn of events', 'suspenseful finale', 'shocking twist', 'climactic showdown'],
      era: ['medieval', 'Victorian', 'ancient', 'Renaissance', '20th century'],
      Event: ['a great war', 'a scientific discovery', 'a cultural revolution', 'a legendary battle', 'an epic journey'],
      mishap: ['comic mishaps', 'absurd situations', 'hilarious misunderstandings', 'witty pranks', 'outrageous antics']
    };
    const randomOption = options[key];
    return randomOption[Math.floor(Math.random() * randomOption.length)];
  });

  return story;
}

app.post('/generate_story', (req, res) => {
  const { genre } = req.body;
  const generatedStory = generateStory(genre);
  res.json({ story: generatedStory });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
