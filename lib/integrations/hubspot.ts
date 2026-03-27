import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

export interface Contact {
  id?: string;
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
  };
}

export interface Deal {
  id?: string;
  properties: {
    dealname: string;
    amount?: string;
    dealstage?: string;
    pipeline?: string;
  };
}

export async function createContact(contact: Contact): Promise<Contact> {
  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
      properties: contact.properties
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to create contact: ${error}`);
  }
}

export async function createDeal(deal: Deal): Promise<Deal> {
  try {
    const response = await hubspotClient.crm.deals.basicApi.create({
      properties: deal.properties
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to create deal: ${error}`);
  }
}