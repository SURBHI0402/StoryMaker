import openai
from 	apikey import APIKEY

# Replace 'YOUR_API_KEY' with your actual GPT-3 API key
api_key = 'key'
openai.api_key = api_key

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What are some famous astronomical observatories?"}
  ]
)
# Define genres
genres = ['horror', 'thriller', 'comedy', 'romance']

# Collect user input
selected_genre = input(f"Select a genre ({', '.join(genres)}): ").lower()
user_prompt = input("Provide a short prompt (4 lines) for the story: ")

# Define temperature and max tokens for text generation
temperature = 0.7
max_tokens = 200  # Adjust as needed

# Generate a story based on genre and user prompt
response = openai.Completion.create(
    engine="text-davinci-002",
    prompt=f"{selected_genre.capitalize()} story: {user_prompt}",
    temperature=temperature,
    max_tokens=max_tokens
)

generated_story = response.choices[0].text.strip()

# Display the generated story
print("\nGenerated Story:")
print(generated_story)
