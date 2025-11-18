'use server';

/**
 * @fileOverview A flow to generate personalized product recommendations based on user gender and preferences.
 * Generates personalized product recommendations using user gender and product preferences, leveraging a product description tool to enhance recommendations.
 * - getPersonalizedRecommendations - A function that returns personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  gender: z
    .enum(['male', 'female', 'other'])
    .describe('The gender of the user (male, female, or other).'),
  preferences: z
    .string()
    .describe('A comma-separated list of the user\u2019s product preferences.'),
  browsingHistory: z.string().describe('A comma-separated list of the user\u2019s browsing history.')
});

export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A comma-separated list of product recommendations.'),
});

export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const productDescriber = ai.defineTool({
  name: 'productDescriber',
  description: 'Tool that generates a product description based on product name.',
  inputSchema: z.object({
    productName: z.string().describe('The name of the product.'),
  }),
  outputSchema: z.string(),
}, async input => {
  const {text} = await ai.generate({
    prompt: `Write a short description for the product: ${input.productName}`,
  });
  return text;
});

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  tools: [productDescriber],
  prompt: `You are an expert fashion consultant providing personalized product recommendations.\n
  Based on the user's gender ({{{gender}}}), preferences ({{{preferences}}}), and browsing history ({{{browsingHistory}}}), recommend a list of products.\n
  Ensure the product recommendations align with the user's specified gender and cater to their stated preferences. Use the productDescriber tool to get descriptions of the products you are recommending.
  Return a comma-separated list of product recommendations.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
