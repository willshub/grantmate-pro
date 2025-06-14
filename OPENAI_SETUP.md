# OpenAI Grant Finder Integration Setup

## Quick Setup

1. **Create Environment File**
   Create a `.env` file in the root directory with:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Add Your OpenAI API Key**
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Make sure to keep the `.env` file private and don't commit it to git

## Custom Grant Finder Configuration

✅ **Already Configured!** The integration now uses your custom grant finder prompt with:

- **Model**: `gpt-4.1-mini` (optimized for grant finding)
- **Custom System Prompt**: Your specialized grant finding expert prompt
- **Trusted Sources**: Grants.gov, SAM.gov, instrumentl.com, regional databases
- **Real Data Only**: Returns only current, open FOA/RFP opportunities
- **Professional Format**: Markdown formatting with structured grant information

## What the Integration Includes

Your custom prompt provides:
- Expert grant curation and search
- Focus on trusted government and regional sources
- Only active funding opportunities (no expired grants)
- Detailed grant information including:
  - Grant name and funding opportunity number
  - Category of funding and eligibility
  - Posted date and closing deadline
  - Total program funding and award amounts
  - Application links and details

## Testing Your Integration

1. **Start the development server**: `npm run dev`
2. **Navigate to the grant search**: Go to `/grants` in your browser
3. **Try searches like**:
   - "climate grants in Michigan"
   - "education funding for nonprofits"
   - "small business grants"
   - "environmental initiatives in Detroit"

The search will now use your specialized grant finder prompt to return real, current funding opportunities!

## Features

- **Smart Query Building**: Converts user searches into natural language queries
- **Markdown Parsing**: Extracts structured data from your custom response format
- **Professional UI**: Displays grants in clean, informative cards
- **Real Links**: Includes actual application links when available
- **Match Explanations**: Shows why each grant matches the search criteria

Your grant finder is now live and ready to help users discover real funding opportunities! 🎉 