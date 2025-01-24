import { TiktokBanData } from '../data/tiktokBanData';

// Define our API schema
const banDataSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      country: { type: "string" },
      type: { type: "string", enum: ["complete", "partial"] },
      details: { type: "string" }
    },
    required: ["country", "type", "details"]
  }
};

export const fetchAppRestrictions = async (appName: string): Promise<TiktokBanData[]> => {
  const token = process.env.REACT_APP_PERPLEXITY_API_KEY?.trim();
  if (!token) {
    console.error('API key not found in environment variables');
    throw new Error('Unable to fetch data: Missing API key');
  }

  // Construct the API payload with improved prompt
  const payload = {
    model: "sonar",
    messages: [
      {
        role: "system",
        content: "You are a precise fact-checker, focused on government-level app restrictions and bans. Only include official, verifiable restrictions. No speculation or unofficial actions."
      },
      {
        role: "user",
        content: `List current official government-level restrictions and bans for ${appName}. Include:
1. Complete national bans
2. Government agency restrictions (e.g., on official devices)
3. Regulatory restrictions

Format as JSON with:
- country: Country name
- type: "complete" for nationwide bans, "partial" for limited restrictions
- details: Specific restriction details with dates when known

Focus on current, active restrictions only.`
      }
    ],
    response_format: {
      type: "json_schema", 
      json_schema: { schema: banDataSchema }
    }
  };

  try {
    console.log(`Fetching restrictions data for ${appName}...`);
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }
    
    const content = data.choices[0].message.content;
    
    // Extract JSON array from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON array found in response');
    }
    
    const banData = JSON.parse(jsonMatch[0]);
    console.log('Processed ban data:', banData);
    
    // Validate the data format
    if (!Array.isArray(banData) || !banData.every(item => 
      item.country && 
      (item.type === 'complete' || item.type === 'partial') && 
      item.details
    )) {
      throw new Error('Invalid data format in API response');
    }

    return banData;

  } catch (error) {
    console.error('Error fetching app restrictions:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};