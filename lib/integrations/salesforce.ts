import jsforce from 'jsforce';

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
});

export interface Lead {
  FirstName?: string;
  LastName: string;
  Email: string;
  Company: string;
  Status?: string;
}

export interface Opportunity {
  Name: string;
  StageName: string;
  CloseDate: string;
  Amount?: number;
}

export async function createLead(lead: Lead) {
  try {
    await conn.login(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!);
    const response = await conn.sobject('Lead').create(lead);
    return response;
  } catch (error) {
    throw new Error(`Failed to create lead: ${error}`);
  }
}

export async function createOpportunity(opportunity: Opportunity) {
  try {
    await conn.login(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!);
    const response = await conn.sobject('Opportunity').create(opportunity);
    return response;
  } catch (error) {
    throw new Error(`Failed to create opportunity: ${error}`);
  }
}