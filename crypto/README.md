# CryptoBuddy - AI Cryptocurrency Advisor

A rule-based chatbot that analyzes cryptocurrency data and provides investment advice based on profitability and sustainability.

## Features

- 🤖 Interactive chat interface (CLI and Web)
- 📊 Cryptocurrency data analysis
- 🌱 Sustainability scoring
- 📈 Price trend analysis
- 💡 Investment recommendations

## What You'll Learn

- Basics of AI-driven decision-making
- How to design conversational logic
- Simple data analysis for crypto trends

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

#### Command Line Interface (CLI)
```bash
python chatbot.py
```

#### Web Interface
```bash
python app.py
```
Then open your browser and visit `http://localhost:5000`

## How to Use

1. Start the application (CLI or Web)
2. Type your questions about cryptocurrencies
3. Get instant advice about:
   - Trending cryptocurrencies
   - Sustainable coin options
   - Long-term investment recommendations

## Sample Questions

- "Which crypto is trending up?"
- "What's the most sustainable coin?"
- "What should I invest in for long-term growth?"

## Project Structure

```
crypto/
├── app.py              # Flask web application
├── chatbot.py          # Main chatbot logic
├── crypto_data.py      # Cryptocurrency database
├── requirements.txt    # Python dependencies
└── templates/          # HTML templates
    └── index.html      # Web interface
```

## Disclaimer

⚠️ This is a demo project for educational purposes. Cryptocurrency investments are risky—always do your own research before making investment decisions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
