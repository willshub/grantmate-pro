import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development - in production, use a backend
});

export interface GrantFinderQuery {
  searchTerm: string;
  organization?: string;
  focusArea?: string;
  fundingRange?: {
    min?: number;
    max?: number;
  };
  location?: string;
  eligibilityType?: string;
}

export interface FoundGrant {
  title: string;
  agency: string;
  opportunityNumber: string;
  deadline: string;
  maxAward: string;
  totalFunding: string;
  eligibility: string[];
  description: string;
  category: string[];
  applicationLink?: string;
  postedDate?: string;
  matchReason?: string; // Why this grant matches the search
  categoryOfFunding?: string;
  expectedAwards?: string;
  moreInfoUrl?: string;
}

export class GrantFinderService {
  /**
   * Search for grants using the custom OpenAI model
   */
  static async findGrants(query: GrantFinderQuery): Promise<FoundGrant[] | { needsClarification: true; message: string }> {
    try {
      const userPrompt = this.buildUserPrompt(query);
      console.log('=== Before invoking OpenAI ===' + userPrompt);
      // Using the user's exact OpenAI configuration
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "text": "You are an expert in searching and curating grants helping users find, select and prepare grant applications.\n\nThe user will type a freeform prompt such as:\n- \"What climate supportive grants and initiatives are available in the State of New York?\"\n- \"how do I apply for an educational scholarship?\"\n- \"where can I find a list of michigan, midwest or detroit grants available?\"\n- \"What grants are available for start ups in the fintech space?\"\n- \"What grants are available for artists?\"\n\nIf the user has not specified a specific area or speciality, your task is to ask a follow up question to find out what category of funding of grants is the user looking for. The options can be in Education, Climate, Public Service, Research, Economic Development, Health, Social Development, Innovation, Travel.\n\nFor finding grants, prioritize using trusted sources like Grants.gov, SAM.gov, instrumentl.com for US government grants. For finding regional grants look at local city and state websites websites (e.g: for Michigan, MI Funding Hub, GrantWatch, Michigan Health Endowment Fund – Grant Database, Michigan Department of Education (MDE) Grants Repository, City of Detroit – Office of Development and Grants, Detroit Legacy Business Fund, Sustainable Agriculture Research and Education (SARE) – North Central Region). Similarly, look for other local grants in other states.\n\nOnly return FOA (Funding opportunity assessment) / RFP (request for proposal) that are still taking in applications. Only return grants from the web results. Return your top 3 results. Say 'None found' if nothing matches.\n\nIf no grants are found based on the given criteria, say so instead of guessing or including grants that may be available later.\n\nYour task is to:\n1. Extract the intent: grant type, purpose, location, date, and budget.\n2. Search the web for **3–5 real FOA / RFP** in that grant type that match the user's criteria.\n3. Return **only real grants** with reliable, clickable links.\n\nFor each grant, include:\n- **Grant name**\n- **Funding Opportunity Number**\n- **Category of Funding**\n- **Posted Date**\n- **Closing Date for Applications**\n- **Total Program funding** \n- **Expected number of Awards**\n- **Eligibility information** (if available)\n- **Details** on the focus area of the grant\n\nFormatting instructions:\n- Use markdown formatting with numbered titles (1. Grant Name, 2. Grant Name, etc.)\n- Use bullet points with ** for field labels (- **Funding Opportunity Number:** value)\n- Be concise but informative\n- Do **not** hallucinate any details — if data is missing, say \"Not specified\"\n- Use engaging, natural language\n- Include clickable links when available: 🔗 [More Info](URL)\n\nExample output format:\n\n### 1. [Grant Name Here]\n- **Funding Opportunity Number:** [Number or \"Not specified\"]\n- **Category of Funding:** [Category]\n- **Posted Date:** [Date]\n- **Closing Date:** [Date]\n- **Total Program Funding:** [Amount]\n- **Expected Number of Awards:** [Number or \"Not specified\"]\n- **Eligibility:** [Requirements]\n- **Details:** [Description of focus area and requirements]\n- 🔗 [More Info](URL)\n\nIf the user asks for help with applying for a particular grant, create a step by step plan to help the user prepare for the application.\nIn each step of the process, follow the guidelines requested in the form, answer every question, use the same language, keywords as the funder. Use a similar ethos as that of the funder.",
                "type": "text"
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "text": userPrompt,
                "type": "text"
              }
            ]
          }
        ],
        response_format: {
          "type": "text"
        },
        temperature: 0.1,
        max_completion_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });

      const responseContent = response.choices[0]?.message?.content;
      if (!responseContent) {
        throw new Error('No response from OpenAI');
      }

      // DEBUG: Log the raw API response
      console.log('=== RAW API RESPONSE ===');
      console.log(responseContent);
      console.log('=== END RAW RESPONSE ===');

      // Parse the markdown response into structured grant data
      const parsedGrants = this.parseMarkdownResponse(responseContent);
      
      // DEBUG: Log the parsed results
      console.log('=== PARSED GRANTS ===');
      if ('needsClarification' in parsedGrants) {
        console.log('Clarification needed:', parsedGrants.message);
      } else {
        console.log('Number of grants found:', parsedGrants.length);
        console.log('Grants:', parsedGrants);
      }
      console.log('=== END PARSED GRANTS ===');
      
      return parsedGrants;
    } catch (error) {
      console.error('Error finding grants:', error);
      throw new Error('Failed to find grants. Please try again.');
    }
  }

  /**
   * Build the user prompt based on the query
   */
  private static buildUserPrompt(query: GrantFinderQuery): string {
    let prompt = `Can you help me find grants for ${query.searchTerm}`;
    
    if (query.location) {
      prompt += ` in ${query.location}`;
    }
    
    if (query.organization) {
      prompt += ` for ${query.organization}`;
    }
    
    if (query.focusArea) {
      prompt += ` focusing on ${query.focusArea}`;
    }
    
    if (query.fundingRange) {
      if (query.fundingRange.min && query.fundingRange.max) {
        prompt += ` with funding between $${query.fundingRange.min.toLocaleString()} and $${query.fundingRange.max.toLocaleString()}`;
      } else if (query.fundingRange.min) {
        prompt += ` with minimum funding of $${query.fundingRange.min.toLocaleString()}`;
      } else if (query.fundingRange.max) {
        prompt += ` with maximum funding of $${query.fundingRange.max.toLocaleString()}`;
      }
    }
    
    if (query.eligibilityType) {
      prompt += ` for ${query.eligibilityType}`;
    }
    
    prompt += '?';
    
    return prompt;
  }

  /**
   * Parse the markdown response into structured grant data
   */
  private static parseMarkdownResponse(response: string): FoundGrant[] | { needsClarification: true; message: string } {
    try {
      // Check if this is a clarification request
      const isClarificationRequest = response.includes('?') && 
        !/(?:- \*\*Funding Opportunity Number:\*\*|- \*\*Category of Funding:\*\*|- \*\*Category:\*\*|- \*\*Posted Date:\*\*|- \*\*Closing Date:\*\*|- \*\*Total Program Funding:\*\*|- \*\*Expected Number of Awards:\*\*|- \*\*Eligibility:\*\*|- \*\*Details:\*\*)/i.test(response);
      
      if (isClarificationRequest) {
        return {
          needsClarification: true,
          message: response
        };
      }

      const grants: FoundGrant[] = [];
      
      // Split response by grant sections (looking for numbered entries or **bold entries**)
      const grantSections = response.split(/(?=\d+\.\s|\*\*\s*\d+\.)/);
      
      // DEBUG: Log the sections found
      console.log('=== PARSING DEBUG ===');
      console.log('Total sections found:', grantSections.length);
      
      for (const section of grantSections) {
        const trimmedSection = section.trim();
        
        console.log('--- Processing section ---');
        console.log('Section length:', trimmedSection.length);
        console.log('First 100 chars:', trimmedSection.substring(0, 100));
        
        // Skip short sections
        if (trimmedSection.length < 50) {
          console.log('❌ Skipping: too short');
          continue;
        }
        
        // Skip introductory text - check if section contains actual grant markers
        const hasGrantMarkers = /(?:- \*\*Funding Opportunity Number:\*\*|- \*\*Category of Funding:\*\*|- \*\*Category:\*\*|- \*\*Posted Date:\*\*|- \*\*Closing Date:\*\*|- \*\*Total Program Funding:\*\*|- \*\*Expected Number of Awards:\*\*|- \*\*Eligibility:\*\*|- \*\*Details:\*\*)/i.test(trimmedSection);
        
        // Also skip if it looks like introductory text
        const isIntroText = /^(Certainly|Here are|I found|Based on)/i.test(trimmedSection);
        
        console.log('Has grant markers:', hasGrantMarkers);
        console.log('Is intro text:', isIntroText);
        
        // Only process sections that have grant markers and aren't intro text
        if (!hasGrantMarkers || isIntroText) {
          console.log('❌ Skipping: no grant markers or is intro text');
          continue;
        }
        
        console.log('✅ Processing this section');
        const grant = this.extractGrantFromSection(trimmedSection);
        if (grant) {
          console.log('✅ Grant extracted:', grant.title);
          grants.push(grant);
        } else {
          console.log('❌ Failed to extract grant from section');
        }
      }
      
      console.log('=== END PARSING DEBUG ===');
      return grants;
    } catch (error) {
      console.error('Error parsing markdown response:', error);
      // Return empty array rather than throwing to avoid breaking the UI
      return [];
    }
  }

  /**
   * Extract grant information from a markdown section
   */
  private static extractGrantFromSection(section: string): FoundGrant | null {
    try {
      // Extract title (looking for ### format like "### 1. Title" or numbered format like "1. Title")
      let titleMatch = section.match(/###\s*\d+\.\s*(.+?)(?:\n|$)/);
      if (!titleMatch) {
        // Try to match numbered format without ### (this is what we're actually getting)
        titleMatch = section.match(/^\s*\d+\.\s*(.+?)(?:\n|$)/);
      }
      if (!titleMatch) {
        // Fallback to bold text patterns with numbers like **1. Title**
        titleMatch = section.match(/\*\*\s*\d+\.\s*(.+?)\s*\*\*/);
      }
      if (!titleMatch) {
        // Fallback to any bold text
        titleMatch = section.match(/\*\*\s*(.+?)\s*\*\*/);
      }
      if (!titleMatch) {
        // Fallback to first line
        titleMatch = section.match(/^(.+?)(?:\n|$)/);
      }
      
      const title = titleMatch ? titleMatch[1].replace(/\*\*/g, '').trim() : 'Unknown Grant';
      
      // Skip if title still looks like intro text
      if (/^(Certainly|Here are|I found|Based on)/i.test(title)) {
        return null;
      }
      
      // Extract funding opportunity number (now in the bullet point format)
      const oppNumMatch = section.match(/- \*\*Funding Opportunity Number:\*\*\s*(.+?)(?:\n|$)/i);
      const opportunityNumber = oppNumMatch ? oppNumMatch[1].trim() : 'Not specified';
      
      // Extract Category of Funding
      const categoryOfFundingMatch = section.match(/- \*\*Category of Funding:\*\*\s*(.+?)(?:\n|$)/i);
      const categoryOfFunding = categoryOfFundingMatch ? categoryOfFundingMatch[1].trim() : 'Not specified';
      
      // Extract agency (look for "Category:" which indicates the type/agency info - keep for backwards compatibility)
      const categoryMatch = section.match(/- \*\*Category:\*\*\s*(.+?)(?:\n|$)/i);
      const agency = categoryMatch ? categoryMatch[1].trim() : 'Agency not specified';
      
      // Extract deadline (Closing Date)
      const deadlineMatch = section.match(/- \*\*Closing Date:\*\*\s*(.+?)(?:\n|$)/i);
      const deadline = deadlineMatch ? deadlineMatch[1].trim() : 'Not specified';
      
      // Extract funding amount (Total Program Funding)
      const fundingMatch = section.match(/- \*\*Total Program Funding:\*\*\s*(.+?)(?:\n|$)/i);
      const totalFunding = fundingMatch ? fundingMatch[1].trim() : 'Not specified';
      
      // Extract Expected Number of Awards
      const expectedAwardsMatch = section.match(/- \*\*Expected Number of Awards:\*\*\s*(.+?)(?:\n|$)/i);
      const expectedAwards = expectedAwardsMatch ? expectedAwardsMatch[1].trim() : 'Not specified';
      
      // Extract posted date
      const postedMatch = section.match(/- \*\*Posted Date:\*\*\s*(.+?)(?:\n|$)/i);
      const postedDate = postedMatch ? postedMatch[1].trim() : 'Not specified';
      
      // Extract eligibility
      const eligibilityMatch = section.match(/- \*\*Eligibility:\*\*\s*(.+?)(?:\n|$)/is);
      const eligibilityText = eligibilityMatch ? eligibilityMatch[1].trim() : '';
      const eligibility = eligibilityText ? [eligibilityText] : [];
      
      // Extract description/details (stop at More Info link)
      const detailsMatch = section.match(/- \*\*Details:\*\*\s*(.+?)(?:\s*-\s*🔗|\s*🔗|\n\n|$)/is);
      const description = detailsMatch ? detailsMatch[1].trim() : 'No description available';
      
      // Extract category from the category of funding field only (for tags)
      const category = categoryOfFunding !== 'Not specified' ? categoryOfFunding.split(/,\s*/).map(c => c.trim()) : [];
      
      // Extract More Info URL
      const moreInfoMatch = section.match(/🔗\s*\[More Info\]\s*\(([^)]+)\)/i);
      const moreInfoUrl = moreInfoMatch ? moreInfoMatch[1].trim() : '';
      
      // Extract application link (fallback to general link pattern)
      const linkMatch = section.match(/🔗\s*\[([^\]]+)\]\s*\(([^)]+)\)/);
      const applicationLink = linkMatch ? linkMatch[2].trim() : '';
      
      return {
        title,
        agency,
        opportunityNumber,
        deadline,
        maxAward: 'Not applicable', // Removed as requested
        totalFunding,
        eligibility,
        description,
        category,
        applicationLink,
        postedDate,
        matchReason: `Matches your search criteria for ${title.toLowerCase()}`,
        // Add new fields
        categoryOfFunding,
        expectedAwards,
        moreInfoUrl
      };
    } catch (error) {
      console.error('Error extracting grant from section:', error);
      return null;
    }
  }

  /**
   * Get grant suggestions based on organization profile
   */
  static async getGrantSuggestions(
    organizationName: string,
    _mission: string,
    focusAreas: string[]
  ): Promise<FoundGrant[] | { needsClarification: true; message: string }> {
    const query: GrantFinderQuery = {
      searchTerm: focusAreas.join(', '),
      organization: organizationName,
      focusArea: focusAreas.join(', ')
    };

    return this.findGrants(query);
  }
}

export default GrantFinderService; 